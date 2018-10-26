import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {Typography, Card, Grid , CardContent, CardActions } from '@material-ui/core';
import config from '../config.json';
import Storage from '../storage';
// import Navbar from '../navbar/Navbar'
import './Login.css'
import gridBackgroundImage from '../images/background.jpg';

const styles = {
  grid: {
    backgroundImage: `url(${gridBackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'bottom'
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      checkingToken: true,
      isAuthenticated: false,
      user: null,
      token: ''
     };
  }
  logout = () => {
    Storage.logOut()
    this.setState({isAuthenticated: false, token: '', user: null})
  }

  onFailure = (error) => {
    alert(error);
  }
  googleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    }
    fetch('http://localhost:4001/api/v1/auth/google', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          Storage.logIn(token)
          this.setState({isAuthenticated: true, user, token})
        }
      });
    })
  }

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <Redirect to="/profile" />
      ) : (
        <div>
          <Grid
            container
              direction="row"
              justify="space-around"
              alignItems="flex-end"
              className="grid"
              style={styles.grid}>
            <Card style={{width: '50%', height: 350, margin: 60}}>
            </Card>
            <Card style={{minWidth: '25%', height: 350, margin: 60}}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Welome to Know Thyself
              </Typography>
              <Typography variant="h6" component="h2">
              </Typography>
              <Typography color="textSecondary">
              </Typography>
              <Typography >
              </Typography>
            </CardContent>
            <CardActions>
              <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                variant="outlined"
                buttonText="Sign in with Google"
                onSuccess={this.googleResponse}
                onFailure={this.onFailure}
                className="login"
                style={{borderRadius:7}}
              />
            </CardActions>
          </Card>
        </Grid>
      </div>
    );
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default Login
