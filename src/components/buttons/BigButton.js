import React from 'react';

const BigButton = props => {
  return(
    <button
      className={`button big-button ${props.theme}`}
    >
      <img className="field-icon" src={props.icon} alt="Button icon" />
      <div className="button-text">{props.text}</div>
    </button>
  )
}

export default BigButton;