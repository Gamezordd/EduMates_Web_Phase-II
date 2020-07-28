import React from 'react';
import './App.css';

import { Route,  Switch, BrowserRouter as Router } from 'react-router-dom';
import { HomeContainer } from './Components/Home';
function App() {
  return (
    <div>
      <Router>
      <Switch>
        <Route exact path='/Home' component={HomeContainer} />
        
      </Switch>
  </Router>
    </div>
  );
}

export default App;
