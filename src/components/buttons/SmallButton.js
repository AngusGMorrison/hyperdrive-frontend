import React from 'react';

const SmallButton = props => {
  return (
    <button
      className={`button small-button ${props.theme}`}
      onClick={props.action}
    >
      {props.children}
    </button>
  );
}

export default SmallButton;
