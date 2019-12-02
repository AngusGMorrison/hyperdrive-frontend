import React from 'react';
import { ICONS } from '../../constants';

const FolderCard = props => {

  const contextActions = [
    {
      label: "Delete",
      onClick: props.deleteFile,
    }
  ]

  const handleDoubleClick = event => {
    event.stopPropagation();
    props.changeFolder(props.folder);
  }

  const handleContextMenu = event => {
    event.preventDefault();
    event.stopPropagation();
    const mouseCoords = {
      x: event.pageX,
      y: event.pageY
    }
    props.openContextMenu(props.folder, mouseCoords, contextActions);
  }

  return(
    <div className="folder-card card no-select" onDoubleClick={handleDoubleClick} onContextMenu={handleContextMenu}>
      <img className="folder-icon" src={ICONS.FOLDER.WHITE} alt="Folder icon" />
      <p className="card-filename">{props.folder.name}</p>
    </div>
  )

};

export default FolderCard;