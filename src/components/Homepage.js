import React from 'react';
import { Redirect } from 'react-router-dom';
import { BANNER_TYPES, ICONS } from '../constants.js';
import './Homepage.css';

import HomepageFormContainer from "../containers/HomepageFormContainer";
import Banner from "../components/banners/Banner";

const Homepage = props => {

  return(
    <div className="homepage-grid">
      { props.loggedIn && <Redirect to='/drive' /> }

      <div className="content-container" >
        { props.serverError && <Banner type={BANNER_TYPES.ERROR} icon={ICONS.CLOUD_OFF.DARK} content={props.serverError} />}
        <img className="hero-logo" src="/logos/hyperdrive-logo-150px.jpg" alt="Hyperdrive logo" />
        <HomepageFormContainer logIn={props.logIn} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} logOut={props.logOut} />
      </div>

    </div>
  );

}

export default Homepage;