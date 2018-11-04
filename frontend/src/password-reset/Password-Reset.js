import React, { Component } from 'react';
import Storage from '../storage';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class PasswordReset extends Component{
  constructor() {
    super();
    this.state = {
      message: '',
      errors: {},
      classes: {},
      user:{
        email: '',
        password: ''
      },
      isAuthenticated: false,
      error: ''
     };
  this.processSignup = this.processSignup.bind(this);
  this.processLogin = this.processLogin.bind(this);

  }

}
render(){
  console.log(this.props)
  return(

  )
}
