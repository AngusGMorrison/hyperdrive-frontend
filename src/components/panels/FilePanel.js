import React, { useState } from 'react';
import driveAPI from '../../adapters/driveAPI';
import './panels.css';

import FileCard from '../cards/FileCard';
import ContextMenu from '../menus/ContextMenu';

const FilePanel = props => {

  const renderFiles = () => {
    return props.files.map(file => {
      return <FileCard key={file.id} file={file} openContextMenu={props.openContextMenu} />
    });
  }

  const downloadFile = () => {}

  const deleteFile = fileId => {
    const confirmation = window.confirm("Delete this file? This can't be undone.")
    if (!confirmation) return;
    driveAPI.deleteFile(fileId)
      .then(() => props.removeDeletedFile(fileId))
      .catch(console.error);
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
      <div className="file-panel" >
        { renderFiles() }
        { 
          props.contextMenu.isOpen &&
          <ContextMenu
            attributes={props.contextMenu}
            actions={contextActions}
          />
        }
      </div>
    </div>
  )
}

export default FilePanel;