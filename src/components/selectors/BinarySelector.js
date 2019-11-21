import React from 'react';
import './selectors.css'

import SelectorButton from './SelectorButton'
import { POSITIONS } from '../../constants'

const BinarySelector = props => {
  return(
    <div className="binary-selector">

      <div className="selector-header">
        <div className="selector-header-icon">
          <img src={props.icon} alt="Heading icon" />
        </div>
        <h2 className="selector-header-heading">{props.heading}</h2>
      </div>
      
      <div className="selector-button-container">
        <SelectorButton
          position={POSITIONS.LEFT}
          buttonOption={props.option1}
          selectedOption={props.selectedOption}
          handleClick={props.handleClick}
        />
        <SelectorButton
          position={POSITIONS.RIGHT}
          buttonOption={props.option2}
          selectedOption={props.selectedOption}
          handleClick={props.handleClick}
        />
      </div>

    </div>
  );
}

export default BinarySelector;
