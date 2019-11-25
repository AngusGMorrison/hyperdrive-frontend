import React, { useState } from 'react';
import './panels.css';

import FileCard from '../cards/FileCard';
import ContextMenu from '../menus/ContextMenu';

const FilePanel = props => {

  // const initialContextMenu = {
  //   show: false,
  //   fileId: null,
  //   position: {
  //     top: 0,
  //     left: 0
  //   }
  // }

  // const [contextMenu, setContextMenu] = useState(initialContextMenu);

  // const showContextMenu = (fileId, mouseCoords) => {
  //   setContextMenu({
  //     show: true,
  //     fileId: fileId,
  //     position: {
  //       top: mouseCoords.y - 10,
  //       left: mouseCoords.x - 10
  //     }
  //   });
  // }
  
  // const hideContextMenu = () => {
  //   setContextMenu(initialContextMenu);
  // }

  const renderFiles = () => {
    return props.files.map(file => {
      return <FileCard key={file.id} file={file} openContextMenu={props.openContextMenu} />
    });
  }

  return(
    <div className="file-panel-container" >
      <div className="file-panel" >
        { renderFiles() }
        { 
          props.contextMenu.isOpen &&
          <ContextMenu
            attributes={props.contextMenu}
            closeContextMenu={props.closeContextMenu}
          />
        }
      </div>
    </div>
  )
}

export default FilePanel;