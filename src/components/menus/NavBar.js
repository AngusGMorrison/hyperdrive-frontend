import React, { useState } from 'react';

const NavBar = ({ currentFolder }) => {

  const [ fileTree, setFileTree ] = useState([]);

  const renderNavFolderLinks = () => {
    if (currentFolder.parentFolders) {
      const descFileTree = currentFolder.parentFolders.reverse();
      return descFileTree.map(folder => {
        return <NavFolderLink folder={folder} />
      })
    } else {
      return <NavFolderLink folder={currentFolder} />
    
  }

  return (
    <div className="navbar">
      { renderNavFolderLinks() }
    </div>
  );
}

export default NavBar;
