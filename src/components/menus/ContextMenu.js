import React from 'react';

import './menus.css';

const ContextMenu = ({ attributes, actions }) => {

  const renderActions = () => {
    return actions.map(action => {
      return <li key={action.label} onClick={() => action.onClick(attributes.file)}>{action.label}</li>
    })
  }

  return(
    <div className="context-menu" style={attributes.position} >
      <ul>
        {renderActions()}
      </ul>
    </div>
  );
}

export default ContextMenu;