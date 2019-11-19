import React from 'react';

const TextField = ({...props}) => {

  return(
    <div class="icon-text-field">
      
      <img
        className="field-icon"
        src={props.icon}
        alt="Text field icon"
      />

      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.handleChange(e.target.value)}
      />
      
    </div>
  )
}

export default TextField;