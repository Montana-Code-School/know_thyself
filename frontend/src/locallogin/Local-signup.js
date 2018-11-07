import React, { Component } from 'react';
import Storage from '../storage';
import { Redirect } from 'react-router-dom';
import {Button, Input} from '@material-ui/core';
import SecretModal from '../modal/Secret-question';
import PasswordModal from '../modal/Password-reset';
import styles from './Local-styles'

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
      method: 'put',
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

  handleClose = (event) => {
    this.setState({ secretModal: false });
    this.setState({ passwordModal: false});
  };

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <Redirect to='/profile' />
      ) : (
        <form>
          <Input
            className="formItem"
            placeholder="Email"
            name="email"
            type="email"
            onChange={event => this.handleChange(event)}
            style={styles.formItem}
          />
          <h4 className='error' style={styles.error}>{this.state.error}</h4>
          <Input
            className="formItem"
            placeholder="Password"
            name="password"
            type="password"
            onChange={event => this.handleChange(event)}
            style={styles.formItem}
          />
          <br></br>
          <Button
            className="formSubmit"
            value="SUBMIT"
            type="submit"
            onClick={this.triggerSecretModal.bind(this)}
            style={styles.formSubmit}
          >Sign Up</Button>
          <Button
            className="formLogin"
            value="Login"
            type="login"
            onClick={this.processLogin}
            style={styles.formLogin}
          >Login</Button>
          <Button
            onClick={this.triggerPasswordModal.bind(this)}
            style={styles.forgotPassword}
            className="forgotPassword"
          >
          Forgot Your Password?
        </Button>
          <SecretModal open={this.state.secretModal}
            change={event => this.handleChange(event)}
            signup={event => this.processSignup(event)}
            close={event => this.handleClose(event)}/>
          <PasswordModal open={this.state.passwordModal}
            change={event => this.handleChange(event)}
            changepassword={event => this.changePassword(event)}
            close={event => this.handleClose(event)}/>
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
