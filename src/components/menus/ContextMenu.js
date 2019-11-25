import React from 'react';

import './menus.css';

const ContextMenu = ({ attributes, hideContextMenu }) => {
  console.log("Aware that context menu has changed")
  return(
    <div className="context-menu" style={attributes.position} >
      <ul>
        <li>Download</li>
        <li>Delete</li>
      </ul>
    </div>
  );
}

export default ContextMenu;