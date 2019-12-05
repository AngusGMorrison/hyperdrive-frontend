import React, { useState } from 'react';
import { ICONS } from '../../constants';

import useDropFile from '../../hooks/useDropFile';
import useDragFile from '../../hooks/useDragFile';

const FolderCard = props => {

  const contextActions = [
    {
      label: "Delete",
      onClick: props.deleteFile,
    }
  ]

  const handleDoubleClick = event => {
    event.stopPropagation();
    props.loadFolder(props.folder);
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

  const { isDraggedOver, handleDragOver, handleDragLeave, handleDrop }
    = useDropFile(props.folder, props.moveFile);

  const { isDragged, handleDragStart, handleDragEnd }
    = useDragFile(props.folder);

  return(
    <div
      className={`folder-card card no-select ${isDraggedOver && 'dragged-over'} ${isDragged && 'dragged'}`}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img className="folder-icon" src={ICONS.FOLDER.WHITE} alt="Folder icon" draggable={false} />
      <p className="card-filename break">{props.folder.name}</p>
    </div>
  )

};

export default FolderCard;