import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Homepage from './components/Homepage'

const App = () => {



  return (
    <Router>
      <div className="router-div">
        <Route exact path='/' render={() => <Homepage />} />
      </div>
    </Router>
  );
}

export default App;
