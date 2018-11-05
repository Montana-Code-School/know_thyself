import React, { Component } from 'react';
import Storage from '../storage';
import { Redirect } from 'react-router-dom';
import {Button, Input } from '@material-ui/core';

class SignUp extends Component {
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

  processSignup(e) {
    e.preventDefault();
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
      if (data.token) {
        Storage.logIn(data.token)
        this.setState({
          isAuthenticated: true
        })
      } else {
        this.setState({
          error: 'Please use a valid email address, and include a password 8 characters or more. Forget your password?'
        })
      }
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    const { user } = this.state
    user[name] = value
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
              <br></br>
              {this.state.error}
              <br></br>
              <Input
                className="form-item"
                placeholder="Password"
                name="password"
                type="password"
                onChange={event => this.handleChange(event)}
              />
              <br></br>
              <Button
                className="form-submit"
                value="SUBMIT"
                type="submit"
                onClick={this.processSignup}
                style={{height: '40px', width: '33%', font:'K2D', backgroundColor:'grey', color: 'white', marginBottom: '10px', fontSize: '12px'}}
              >Sign Up</Button>

              <Button
                className="form-login"
                value="Login"
                type="login"
                onClick={this.processLogin}
                style={{height: '40px', width: '80px', marginLeft: '10%', font:'K2D', backgroundColor:'grey', color:'white', marginBottom: '10px', fontSize: '12px'}}
              >Login</Button>
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
