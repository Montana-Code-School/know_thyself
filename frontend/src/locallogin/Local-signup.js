import React, { Component } from 'react';
import Storage from '../storage';
import { Redirect } from 'react-router-dom';
import {Button, Input, Modal } from '@material-ui/core';
import SecretModal from '../modal/Secret-question';
import PasswordModal from '../modal/Password-reset';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      errors: {},
      classes: {},
      user:{
        email: '',
        password: '',
        secret: '',
        newpassword: '',
      },
      isAuthenticated: false,
      error: '',
      secretModal: false,
      passwordModal: false
     };
  this.processSignup = this.processSignup.bind(this);
  this.processLogin = this.processLogin.bind(this);
  }

  processLogin(e) {
    e.preventDefault();
    const { user } = this.state
    fetch( 'http://localhost:4001/auth/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
        body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        Storage.logIn(data.token)
        this.setState({
          isAuthenticated: true
        })
      } else {
        this.setState({
          error: 'Email or password are incorrect. Forget your password?'
        })
      }
    })
  }

  processSignup(event){
    event.preventDefault();
    const { user } = this.state
    console.log(user)
    fetch( 'http://localhost:4001/auth/signup', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.token) {
        Storage.logIn(data.token)
        this.setState({
          isAuthenticated: true
        })
      } else {
        this.setState({
          error: 'Please use a valid email address, and include a password 8 characters or more.'
        })
      }
    })
  }

  changePassword(event){
    event.preventDefault();
    fetch( 'http://localhost:4001/api/passwordreset', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state.user),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.token) {
        Storage.logIn(data.token)
        this.setState({
          isAuthenticated: true
        })
      } else {
        this.setState({
          error: 'Please use a valid email address, and secret answer.'
        })
      }
    })
  }

  triggerSecretModal(event){
    event.preventDefault();
    this.setState({
      secretModal: true
    })
  }

  triggerPasswordModal(event){
    event.preventDefault();
    this.setState({
      passwordModal: true
    })
  }


  handleChange = (event) => {
    const { name, value } = event.target
    const { user } = this.state
    user[name] = value
    console.log(value)
    this.setState({
      user
    })
  }

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <Redirect to='/profile' />
      ) : (
            <form>
              <Input
                className="form-item"
                placeholder="Username"
                name="email"
                type="email"
                onChange={event => this.handleChange(event)}
              />
              {this.state.error}
              <Input
                className="form-item"
                placeholder="Password"
                name="password"
                type="password"
                onChange={event => this.handleChange(event)}
              />
              <Button
                className="form-submit"
                value="SUBMIT"
                type="submit"
                onClick={this.triggerSecretModal.bind(this)}
                style={{height: '40px', width: '33%', font:'K2D', backgroundColor:'grey', color: 'white', marginBottom: '10px', fontSize: '12px'}}
              >Sign Up</Button>
              <Button
                className="form-login"
                value="Login"
                type="login"
                onClick={this.processLogin}
                style={{height: '40px', width: '80px', marginLeft: '10%', font:'K2D', backgroundColor:'grey', color:'white', marginBottom: '10px', fontSize: '12px'}}
              >Login</Button>
              <Button
                onClick={this.triggerPasswordModal.bind(this)}
              >
              Forgot Your Password?
            </Button>
              <SecretModal open={this.state.secretModal} change={event => this.handleChange(event)} signup={event => this.processSignup(event)}/>
              <PasswordModal open={this.state.passwordModal} change={event => this.handleChange(event)} changepassword={event => this.changePassword(event)}/>
            </form>
    );
    return (
      <div className='App'>
        {content}
      </div>
    )
  }
}

export default SignUp
