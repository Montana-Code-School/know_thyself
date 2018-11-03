import React, { Component } from 'react';
import Storage from '../storage';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
    console.log(user, "here")
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
          error: 'Email or password are incorrect.'
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
          error: 'Please use a valid email address, and include a password 8 characters or more.'
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
              <input
                className="form-item"
                placeholder="Username goes here..."
                name="email"
                type="text"
                onChange={event => this.handleChange(event)}
              />
              <br></br>
              {this.state.error}
              <br></br>
              <input
                className="form-item"
                placeholder="Password goes here..."
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
                style={{height: '40px', width: '33%', font:'K2D', backgroundColor:'grey', color: 'white', marginBottom: '10px'}}
              >Sign-up</Button>

              <Button
                className="form-login"
                value="Login"
                type="login"
                onClick={this.processLogin}
                style={{height: '40px', width: '80px', marginLeft: '10%', font:'K2D', backgroundColor:'grey', color:'white', marginBottom: '10px'}}
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
