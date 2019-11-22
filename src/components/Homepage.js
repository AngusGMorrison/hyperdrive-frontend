import React from 'react';
import { Redirect } from 'react-router-dom';
import './Homepage.css';

import HomepageFormContainer from "../containers/HomepageFormContainer";

const Homepage = props => {

  return(
    <div className="homepage-grid">
      <div className="content-container" >
        { props.loggedIn && <Redirect to='/drive' /> }
        <img className="hero-logo" src="/logos/hyperdrive-logo-150px.jpg" alt="Hyperdrive logo" />
        <HomepageFormContainer loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
      </div>
    </div>
  );

}

export default Homepage;