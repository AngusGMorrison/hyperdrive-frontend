import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import SkeletonPage from "./components/skeletons/SkeletonPage"

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" render={() => <SkeletonPage />} />
      </div>
    </Router>
  );
}

export default App;
