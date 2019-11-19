import React from 'react';
import { Redirect } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {

  const redirectIfLoggedIn = () => {
    if (localStorage.getItem('token')) {
      return <Redirect to='/drive' />
    }
  }

  return(
    <div className="homepage-grid">
      <div className="content-container" >
        {redirectIfLoggedIn()}
        <img className="hero-logo" src="/hyperdrive-logo-150px.jpg" />
        {/* <HomepageFormContainer /> */}
      </div>
    </div>
  )

}

export default Homepage;