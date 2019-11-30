import React from 'react';
import { ICONS } from '../../constants';

const FolderCard = props => {

  return(
    <div className="folder-card card" >
      <img className="folder-icon" src={ICONS.FOLDER.WHITE} alt="Folder icon" />
      <p className="card-filename">{props.folder.name}</p>
    </div>
  )

};

export default FolderCard;