import React, { useState } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from "./constants";
import './App.css';

import Homepage from './components/pages/Homepage';
import Drive from './containers/Drive';
import PageNotFound from './components/pages/PageNotFound'

const App = withRouter(({ history }) => {

  const [loggedIn, setLoggedIn] = useState(localStorage.hasOwnProperty(LOCAL_STORAGE_KEYS.TOKEN));

  const logIn = token => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
    setLoggedIn(true);
  }
  
  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    setLoggedIn(false);
    setServerError(null);
    history.push('/');
  }

  const [serverError, setServerError] = useState(null);

  return (
    <Switch>
      <Route
        exact path='/'
        render={() => (
          <Homepage
            logIn={logIn}
            loggedIn={loggedIn}
            serverError={serverError}
            setServerError={setServerError}
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
      <Route render={() => <PageNotFound />} />
    </Switch>
  );
});

export default App;
