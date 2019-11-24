import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from "./constants";
import './App.css';

import Homepage from './components/Homepage';
import Drive from './containers/Drive';

const App = () => {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [serverError, setServerError] = useState(null);

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    setLoggedIn(false);
  }

  return (
    <Router>
      <div className="router-div">
        <Route exact path='/' render={() => <Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/drive" render={routerProps => <Drive {...routerProps} setLoggedIn={setLoggedIn} serverError={serverError} setServerError={setServerError} logout={logout} />} />
      </div>
    </Router>
  );
}

export default App;
