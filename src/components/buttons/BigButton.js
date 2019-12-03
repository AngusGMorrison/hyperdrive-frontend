import React from 'react';
import './buttons.css';

const BigButton = props => {
  return(
    <button
      className={`button big-button ${props.theme}`}
      onClick={props.action ? props.action : null}
    >
      <img className="field-icon" src={props.icon} alt="Button icon" />
      <div className="button-text">{props.text}</div>
    </button>
  )
}

export default BigButton;