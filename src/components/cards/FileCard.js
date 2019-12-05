import React, { useState } from 'react';
import { ICONS, REGEX } from '../../constants';
import './cards.css';

import useDragFile from '../../hooks/useDragFile';

const FileCard = ({ file, openContextMenu, setSelectedFile, downloadFile, deleteFile }) => {

  const MAX_NAME_LENGTH = 14

  const contextActions = [
    {
      label: "Download",
      onClick: downloadFile,
    },
    {
      label: "Delete",
      onClick: deleteFile,
    }
  ]

  const get_icon_src = () => {
    if (file.content_type.match(REGEX.CONTENT_TYPE_TEXT)) {
      return ICONS.TEXT.WHITE;
    } else if (file.content_type.match(REGEX.CONTENT_TYPE_IMAGE)) {
      return ICONS.IMAGE.WHITE;
    }
  }

  const format_filename = () => {
    const name = file.name.match(REGEX.FILENAME_PARTS)[1]
    if (name.length > MAX_NAME_LENGTH) {
      const formatted_name = name.slice(0, MAX_NAME_LENGTH);
      return formatted_name + '..' + file.extension
    } else {
      return file.name;
    }
  }

  const handleClick = () => {
    setSelectedFile(file);
  }

  const handleContextMenu = event => {
    event.preventDefault();
    event.stopPropagation();
    const mouseCoords = {
      x: event.pageX,
      y: event.pageY
    }
    openContextMenu(file, mouseCoords, contextActions);
  }

  const { isDragged, handleDragStart, handleDragEnd } = useDragFile(file);

  return(
    <div
      className={`file-card card no-select ${isDragged ? 'dragged' : null}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="file-icon-container">
        <img className="file-icon" src={get_icon_src()} alt="File icon" draggable={false} />
      </div>
      <div>
        <p className="card-filename">{format_filename()}</p>
      </div>
    </div>
  )
}

export default FileCard;