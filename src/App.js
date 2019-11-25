import React, { useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from "./constants";
import './App.css';

import Homepage from './components/Homepage';
import Drive from './containers/Drive';

const App = withRouter(({ history }) => {

  const [loggedIn, setLoggedIn] = useState(localStorage.hasOwnProperty(LOCAL_STORAGE_KEYS.TOKEN));
  const [serverError, setServerError] = useState(null);

  const logIn = token => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
    setLoggedIn(true);
  }
  
  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <Switch>
      <Route
        exact path='/'
        render={() => (
          <Homepage
            logIn={logIn}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            logOut={logOut}
            serverError={serverError}
          />
        )}
      />
      <Route
        path="/drive"
        render={routerProps => (
          <Drive
            {...routerProps}
            serverError={serverError}
            setServerError={setServerError}
            logOut={logOut}
          />
        )}
      />
    </Switch>
  );
});

export default App;
