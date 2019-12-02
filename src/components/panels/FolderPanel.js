import React from 'react';

import FolderCard from '../cards/FolderCard';

const FolderPanel = props => {

  const renderFolders = () => {
    return props.folders.map(folder => {
      return(
        <FolderCard
          key={folder.id}
          folder={folder}
          changeFolder={props.changeFolder}
          openContextMenu={props.openContextMenu}
          setSelectedFile={props.setSelectedFile}
          deleteFile={props.deleteFile}
        />
      )
    })
  }

  return (
    <div className="folder-panel file-panel">
      <h2 className="file-panel-heading">Folders</h2>
      <div className="file-grid">
        { renderFolders() }
      </div>
    </div>
  );
}

export default FolderPanel;
