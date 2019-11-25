import React from 'react';
import { Redirect } from 'react-router-dom';
import './Homepage.css';

import HomepageFormContainer from "../containers/HomepageFormContainer";

const Homepage = props => {

  return(
    <div className="homepage-grid">
      { props.loggedIn && <Redirect to='/drive' /> }

      <div className="content-container" >
        <img className="hero-logo" src="/logos/hyperdrive-logo-150px.jpg" alt="Hyperdrive logo" />
        <HomepageFormContainer
          logIn={props.logIn}
          serverError={props.serverError}
          setServerError={props.setServerError}
        />
      </div>

    </div>
  );

}

export default Homepage;