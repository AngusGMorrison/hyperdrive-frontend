import React from 'react';

const SelectorButton = props => {

  const buttonOption = props.buttonOption;

  const getClassName = () => {
    if (props.selectedOption === buttonOption) {
      return `selector-button selected ${props.position}`;
    } else {
      return `selector-button ${props.position}`;
    }
  }

  return(
    <button
      className={getClassName()}
      value={buttonOption}
      onClick={() => props.handleClick(buttonOption)}
    >
      {buttonOption}
    </button>
  )
}

export default SelectorButton;