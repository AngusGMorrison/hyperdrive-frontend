import React from 'react';
import { ICONS, REGEX } from '../../constants';

const FileCard = ({ file }) => {

  const MAX_NAME_LENGTH = 13

  const get_icon_src = () => {
    if (file.content_type.match(REGEX.CONTENT_TYPE_TEXT)) {
      return ICONS.TEXT.WHITE;
    } else if (file.content_type.match(REGEX.CONTENT_TYPE_IMAGE)) {
      return ICONS.IMAGE.WHITE;
    }
  }

  const format_filename = () => {
    const name = file.filename.match(REGEX.FILENAME_PARTS)[1]
    console.log(name);
    if (name.length > MAX_NAME_LENGTH) {
      const formatted_name = name.slice(0, MAX_NAME_LENGTH);
      return formatted_name + '..' + file.extension
    } else {
      return file.filename;
    }
    
  }

  return(
    <div className="file-card">
      <div>
        <img className="file-icon" src={get_icon_src()} alt="File icon" />
      </div>
      <div>
        <p>{format_filename()}</p>
      </div>
    </div>
  )
}

export default FileCard;