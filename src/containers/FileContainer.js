import React from 'react';
import driveAPI from '../adapters/driveAPI';
import { BANNER_TYPES, ICONS } from '../constants';
import ERROR_HANDLERS from '../errors/errorHandlers';
import ERROR_DETAILS from '../errors/errorDetails';
import '../components/panels/panels.css';

import Banner from '../components/banners/Banner';
import NavBar from '../components/menus/NavBar';
import FolderPanel from '../components/panels/FolderPanel';
import DocumentPanel from '../components/panels/DocumentPanel';
import ContextMenu from '../components/menus/ContextMenu';

const FileContainer = props => {

  // const downloadFile = file => {
  //   driveAPI.downloadFile(file)
  //     .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleFileError));
  // }

  // const deleteFile = file => {
  //   const confirmation = window.confirm("Delete this file? This can't be undone.")
  //   if (!confirmation) return;
  //   driveAPI.deleteFile(file)
  //     .then(data => props.removeFileAndUpdateUser(file, data.user))
  //     .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleFileError));
  // }

  // const handleFileError = error => {
  //   switch (error.code) {
  //     case 403:
  //       props.forbidAccess();
  //       break;
  //     case 404:
  //       props.setServerError(ERROR_DETAILS.FILE_NOT_FOUND);
  //       break;
  //     default:
  //       props.setServerError(ERROR_DETAILS.GENERIC)
  //       break;
  //   }
  // }

  const contextActions = [
    {
      label: "Download",
      onClick: props.downloadFile,
    },
    {
      label: "Delete",
      onClick: props.deleteFile,
    },
  ]

  return(
    <div className="file-container" >
      { 
        props.serverError &&
        <Banner
          type={BANNER_TYPES.ERROR}
          icon={ICONS.CLOUD_OFF.DARK}
          content={props.serverError}
        />
      }
      <NavBar
        currentFolder={props.currentFolder}
        changeFolder={props.changeFolder}
      />
      {
        props.files.folders.length > 0 &&
        <FolderPanel 
          folders={props.files.folders}
          changeFolder={props.changeFolder}
          contextMenu={props.contextMenu}
          openContextMenu={props.openContextMenu}
          setSelectedFile={props.setSelectedFile}
        />
      }
      {
        props.files.documents.length > 0 &&
        <DocumentPanel
          documents={props.files.documents}
          contextMenu={props.contextMenu}
          openContextMenu={props.openContextMenu}
          setSelectedFile={props.setSelectedFile}
        />
      }
      
      { 
        props.contextMenu.isOpen &&
        <ContextMenu
          attributes={props.contextMenu}
          actions={contextActions}
        />
      }
    </div>
  )
}

export default FileContainer;