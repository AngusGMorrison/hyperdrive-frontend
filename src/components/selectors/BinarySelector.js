import React from 'react';
import './selectors.css'

const BinarySelector = props => {

  const getClassName = option => {
    if (props.selectedOption === option) {
      return "selector-button selected";
    } else {
      return "selector-button";
    }
  }
  
  const handleClick = event => {

  }

  return(
    <div>

      <div className="selector-header">
        <div className="selector-header-icon">
          <img src={props.icon} alt="Heading icon" />
        </div>
        <h2 className="selector-header-heading">{props.heading}</h2>
      </div>
      
      <div className="selector-button-container">
        <button className={getClassName(props.option1) + " left"} value={props.option1} onClick={() => props.handleClick(props.option1)}>{props.option1}</button>
        <button className={getClassName(props.option2) + " right"} value={props.option2} onClick={() => props.handleClick(props.option2)}>{props.option2}</button>
      </div>

    </div>
  );
}

export default BinarySelector;
