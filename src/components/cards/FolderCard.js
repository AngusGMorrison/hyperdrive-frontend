import React from 'react';
import { ICONS } from '../../constants';

const FolderCard = props => {

  const handleDoubleClick = event => {
    event.stopPropagation();
    props.changeFolder(props.folder);
  }

  return(
    <div className="folder-card card no-select" onDoubleClick={handleDoubleClick}>
      <img className="folder-icon" src={ICONS.FOLDER.WHITE} alt="Folder icon" />
      <p className="card-filename">{props.folder.name}</p>
    </div>
  )

};

export default FolderCard;