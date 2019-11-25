import React, { useState } from 'react';
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from "./constants";
import './App.css';

import Homepage from './components/Homepage';
import Drive from './containers/Drive';

const App = withRouter(({ history }) => {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [serverError, setServerError] = useState(null);

  // const logIn = token => {
  //   localStorage.setItem(LOCAL_STORAGE_KEYS.token, token);
  //   setLoggedIn(true);
  // }
  
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    setLoggedIn(false);
  }

  return (
    <Switch>
      <Route exact path='/' render={() => <Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} logout={logout} serverError={serverError} />} />
      <Route path="/drive" render={routerProps => <Drive {...routerProps} serverError={serverError} setServerError={setServerError} logout={logout} />} />
    </Switch>
  );
});

export default App;
