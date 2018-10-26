import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import Storage from './storage'

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(Storage.isAuthenticated())
return (
  <Route {...rest} render={(props) => (
    Storage.isAuthenticated()
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)}

export default PrivateRoute;
