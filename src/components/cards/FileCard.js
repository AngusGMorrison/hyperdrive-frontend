import React from 'react';
import { ICONS, REGEX } from '../../constants';
import './cards.css';

const FileCard = ({ file, openContextMenu }) => {

  const MAX_NAME_LENGTH = 14

  const get_icon_src = () => {
    if (file.content_type.match(REGEX.CONTENT_TYPE_TEXT)) {
      return ICONS.TEXT.WHITE;
    } else if (file.content_type.match(REGEX.CONTENT_TYPE_IMAGE)) {
      return ICONS.IMAGE.WHITE;
    }
  }

  const format_filename = () => {
    const name = file.filename.match(REGEX.FILENAME_PARTS)[1]
    if (name.length > MAX_NAME_LENGTH) {
      const formatted_name = name.slice(0, MAX_NAME_LENGTH);
      return formatted_name + '..' + file.extension
    } else {
      return file.filename;
    }
  }

  const handleRightClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const mouseCoords = {
      x: event.pageX,
      y: event.pageY
    }
    openContextMenu(file, mouseCoords);
  }

  return(
    <div className="file-card" onContextMenu={handleRightClick}>
      <div className="file-icon-container">
        <img className="file-icon" src={get_icon_src()} alt="File icon" />
      </div>
      <div>
        <p className="file-card-filename">{format_filename()}</p>
      </div>
    </div>
  )
}

export default FileCard;