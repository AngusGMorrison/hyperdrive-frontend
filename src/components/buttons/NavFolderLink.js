import React from 'react';
import { ICONS } from '../../constants';

const NavFolderLink = props => {

  const MAX_NAME_LENGTH = 20

  const handleFolderClick = () => {
    props.loadFolder(props.content);
  }

  const formatFolderName = () => {
    const name = props.content.name;
    if (name.length > MAX_NAME_LENGTH) {
      return name.slice(0, MAX_NAME_LENGTH) + '...';
    } else {
      return name;
    }
  }

  return (
    <div className="nav-folder-link-container">
      <div className="nav-folder-link">
        {
          props.content.collapsedFolders ?
            <button className="nav-folder-button">...</button> :
            <button
              className="nav-folder-button"
              onClick={props.loadFolder ? handleFolderClick : null }
            >
              { formatFolderName() }
            </button>
        }
        {
          props.hasArrow &&
          <img className="nav-folder-arrow" src={ICONS.ARROW_RIGHT.DARK} alt="Arrow icon showing how parent and child folders connect" />
        }
      </div>
    </div>
  );
}

export default NavFolderLink;
