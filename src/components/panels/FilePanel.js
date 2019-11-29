import React from 'react';
import driveAPI from '../../adapters/driveAPI';
import { BANNER_TYPES, ICONS } from '../../constants';
import ERROR_HANDLERS from '../../errors/errorHandlers';
import ERROR_DETAILS from '../../errors/errorDetails';
import './panels.css';

import Banner from '../banners/Banner';
import FileCard from '../cards/FileCard';
import ContextMenu from '../menus/ContextMenu';

const FilePanel = props => {

  const renderFiles = () => {
    return props.files.map(file => {
      return(
        <FileCard
          key={file.id}
          file={file}
          openContextMenu={props.openContextMenu}
          setSelectedFile={props.setSelectedFile}
        />
      );
    });
  }

  const downloadFile = file => {
    driveAPI.downloadFile(file)
      .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleFileError));
  }

  const deleteFile = file => {
    const confirmation = window.confirm("Delete this file? This can't be undone.")
    if (!confirmation) return;
    driveAPI.deleteFile(file)
      .then(data => props.removeFileAndUpdateUser(file, data.user))
      .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleFileError));
  }

  const handleFileError = error => {
    switch (error.code) {
      case 403:
        props.forbidAccess();
        break;
      case 404:
        props.setServerError(ERROR_DETAILS.FILE_NOT_FOUND);
        break;
      default:
        props.setServerError(ERROR_DETAILS.GENERIC)
        break;
    }
  }

  const contextActions = [
    {
      label: "Download",
      onClick: downloadFile
    },
    {
      label: "Delete",
      onClick: deleteFile,
    },
  ]

  return(
    <div className="file-panel-container" >
      { 
        props.serverError &&
        <Banner
          type={BANNER_TYPES.ERROR}
          icon={ICONS.CLOUD_OFF.DARK}
          content={props.serverError}
        />
      }
      <FolderPanel 
        folders={props.files.folders}
        contextMenu={props.contextMenu}
      />
      <DocumentPanel
        documents={props.files.documents}
        contextMenu={props.contextMenu}
      />
      <div className="file-panel" >
        { renderFiles() }
        { 
          props.contextMenu.isOpen &&
          <ContextMenu
            attributes={props.contextMenu}
            // Move to document panel
            actions={contextActions}
          />
        }
      </div>
    </div>
  )
}

export default FilePanel;