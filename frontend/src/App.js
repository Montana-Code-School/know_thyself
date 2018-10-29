import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './login/Login';
import Profile from './profile/Profile';
import Entries from './entries/Entries';
import Habits from './habits/Habits';
import Todo from './todo/Todo';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path='/entries' component={Entries} />
          <PrivateRoute path='/habits' component={Habits} />
          <PrivateRoute path='/todo' component={Todo} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
