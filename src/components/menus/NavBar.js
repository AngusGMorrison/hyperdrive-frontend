import React, { useState } from 'react';

import NavFolderLink from '../buttons/NavFolderLink';

const NavBar = ({ currentFolder }) => {

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
    const navLinks =  fileTree.map((element, index) => {
      if (element.id) {
        return <NavFolderLink key={element.id} content={element} hasArrow={index < fileTree.length} />
      } else if (element.collapsedFolders) {
        return <NavFolderLink key={"collapsed"} content={element} hasArrow={index < fileTree.length} />
      }  
    });
    navLinks.unshift(renderCurrentFolder());
    navLinks.reverse();
    return navLinks;
  }

  const getVisibleFileTree = () => {
    const parents = currentFolder.parent_folders;
    if (parents.length > MAX_PARENTS_TO_SHOW) {
      const visibleFileTree = [
        ...parents.slice(0, MAX_PARENTS_TO_SHOW - 1),
        { collapsedFolders: parents.slice(MAX_PARENTS_TO_SHOW - 1, parents.length - 1) },
        parents[parents.length - 1]
      ];
      return visibleFileTree;
    } else {
      return parents;
    }
  }

  const renderCurrentFolder = () => {
    return <NavFolderLink key={currentFolder.id} content={currentFolder} />
  }

  const hasArrow = (index, length) => {
    return index < length
  }

  return (
    <div className="nav-bar">
      { renderNavFolderLinks() }
    </div>
  );
}

export default NavBar;
