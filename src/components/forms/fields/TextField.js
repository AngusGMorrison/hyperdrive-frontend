import React from 'react';
import './fields.css';

const TextField = (props) => {
  return(
    <div className="text-field-container">
      <div className={`text-field ${props.errors ? `error` : ``}`}>
        
        <img
          className="field-icon"
          src={props.errors ? props.icon.MAGENTA : props.icon.BLUE }
          alt="Text field icon"
        />

        <input
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.validate}
        />

      </div>
      {
        props.errors &&
        <p className="text-field-error">{props.errors}</p>
      }     
    </div>
  )
}

export default TextField;