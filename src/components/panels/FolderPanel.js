import React from 'react';

import FolderCard from '../cards/FolderCard';

const FolderPanel = props => {

  const renderFolders = () => {
    return props.folders.map(folder => {
      return(
        <FolderCard
          key={folder.id}
          folder={folder}
          openContextMenu={props.openContextMenu}
          setSelectedFile={props.setSelectedFile}
        />
      )
    })
  }

  return (
    <div className="folder-panel">
      <h2 className="file-panel-heading">Folders</h2>
      <div className="folder-grid">
        { renderFolders() }
      </div>
    </div>
  );
}

export default FolderPanel;
