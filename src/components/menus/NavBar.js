import React, { useState } from 'react';

import NavFolderLink from '../buttons/NavFolderLink';

const NavBar = ({ currentFolder, loadFolder, moveFile }) => {

  const MAX_PARENTS_TO_SHOW = 2

  const renderNavFolderLinks = () => {
    if (currentFolder.parent_folders.length > 0) {
      return renderMultipleNavFolderLinks();
    } else {
      return renderCurrentFolder();
    }
  }

  const renderMultipleNavFolderLinks = () => {
    const fileTree = getVisibleFileTree();
    const navLinks = getNavLinksFromFileTree(fileTree);
    navLinks.unshift(renderCurrentFolder());
    return navLinks.reverse();
  }

  const getVisibleFileTree = () => {
    const fileTree = currentFolder.parent_folders;
    if (fileTree.length > MAX_PARENTS_TO_SHOW) {
      const visibleFileTree = collapseFolders(fileTree);
      return visibleFileTree;
    } else {
      return fileTree;
    }
  }

  const collapseFolders = fileTree => {
    return [ 
      ...fileTree.slice(0, MAX_PARENTS_TO_SHOW - 1),
      { collapsedFolders: fileTree.slice(MAX_PARENTS_TO_SHOW - 1, fileTree.length - 1) },
      fileTree[fileTree.length - 1]
    ];
  }

  const getNavLinksFromFileTree = fileTree => {
    return fileTree.map((element, index) => {
      return(
        <NavFolderLink
          key={element.id ? element.id : "collapsed"}
          content={element}
          hasArrow={index < fileTree.length}
          loadFolder={element.id ? loadFolder : null}
          currentFolder={currentFolder}
          moveFile={moveFile}
        />
      )
    });
  }

  const renderCurrentFolder = () => {
    return <NavFolderLink key={currentFolder.id} content={currentFolder} currentFolder={currentFolder}/>
  }

  return (
    <div className="nav-bar">
      { renderNavFolderLinks() }
    </div>
  );
}

export default NavBar;
