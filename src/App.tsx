import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LoginForm, RegisterForm } from './components/Auth/';
import { Container } from 'reactstrap';

import './App.css';

const App = () => (
  <Router>
    <ToastContainer />
    <Container>
      <Switch>
        <Route exact path='/login' component={LoginForm} />
        <Route exact path='/register' component={RegisterForm} />
      </Switch>
    </Container>
  </Router>
);

export default App;
