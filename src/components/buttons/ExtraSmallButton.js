import React from 'react';
import './buttons.css';

const ExtraSmallButton = props => {
  return (
    <button className={`button extra-small-button ${props.theme}`} onClick={props.action}>
      {props.children}
    </button>
  );
}

export default ExtraSmallButton;
