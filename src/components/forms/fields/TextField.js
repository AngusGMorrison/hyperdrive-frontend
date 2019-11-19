import React from 'react';
import './fields.css';

const TextField = ({...props}) => {

  return(
    <div className={`icon-text-field ${props.theme}`}>
      
      <img
        className="field-icon"
        src={props.icon}
        alt="Text field icon"
      />

      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.handleChange(e.target.value)}
      />

    </div>
  )
}

export default TextField;