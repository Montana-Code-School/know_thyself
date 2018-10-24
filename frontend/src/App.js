import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Login from './login/Login';
import Profile from './profile/Profile';
import Storage from './storage';
import PrivateRoute from './PrivateRoute';

class App extends Component {




  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>);
    }
  }

export default App;
