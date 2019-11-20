import React from 'react';

import './banners.css'

const Banner = props => {
  return(
    <div className={`banner ${props.type}`}>
      <div className="banner-content-container">
        <div className="banner-icon-container">
          <img className="field-icon" src={props.icon} alt="Error icon" />
        </div>
        <div className="error-details">
          <p className="big-body">{props.content.heading}</p>
          <p className="body">{props.content.body}</p>
        </div>
      </div>
    </div>
  )
}

export default Banner;