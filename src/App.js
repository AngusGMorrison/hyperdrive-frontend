import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Homepage from './components/Homepage'

const App = () => {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="router-div">
        <Route exact path='/' render={() => <Homepage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
      </div>
    </Router>
  );
}

export default App;
