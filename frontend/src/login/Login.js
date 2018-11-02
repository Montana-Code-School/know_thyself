import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {Typography, Card, Grid , CardContent, CardActions } from '@material-ui/core';
import config from '../config.json';
import Storage from '../storage';
import SignUp from '../locallogin/Local-signup'
import './Login.css';


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
  //we get a response from google based i-frame login that contains the
  //profile object, and googleID, and accessToken
  //id token and tokenID contains info from profile object
  //Blob is a mess of json
  //pathname goes to index.js
  googleResponse = (response) => {
    console.log(response)
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    }
    let pathname = '/api/v1/auth/google'
    if (process.env.NODE_ENV === 'development') {
      pathname=`http://localhost:4001${pathname}`
    }
    fetch(pathname, options).then(r => {
      const token = r.headers.get('x-auth-token');
    //the token has been created sent up to here from index.js,
    //the token is then sent to token-verification to be decoded, which
    //then once decoded is used to find the requested user in the db, then the
    //user is returned. we are now allowed to move profile.js a private route.
      r.json().then(user => {
        console.log(user)
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
        <Redirect to='/profile' />
      ) : (
        <div>
          <Grid
            container
              direction='row'
              justify='space-around'
              alignItems='flex-end'
              className='grid'>
            <Card className='card' style={{width: '50%', height: 350, margin: 60, backgroundColor: '#F3ECE7', opacity: .81}}>
              <CardContent>
                <Typography style={{fontFamily: 'Satisfy, cursive', color: '#214365', fontSize: 80}} className='logo1' gutterBottom>
                  Know Thyself
                </Typography>
                <Typography style={{fontFamily: 'Satisfy, cursive', color: '#214365', fontSize: 35}} className='logo2'>
                  'Knowing yourself is the beginning of all wisdom.' -Aristotle
                </Typography>
              </CardContent>
            </Card>
            <Card className='signUp' style={{minWidth: '25%', height: 350, margin: 60}}>
              <CardContent>
                <Typography color='textSecondary' className='login2' style={{color:'#214365', fontFamily:'K2D', fontSize:35}} gutterBottom>
                  Sign-up or Login
                </Typography>
                <CardActions>
                <GoogleLogin
                  clientId={config.GOOGLE_CLIENT_ID}
                  variant='outlined'
                  buttonText='Sign-up or Login with Google'
                  onSuccess={this.googleResponse}
                  onFailure={this.onFailure}
                  className='login'
                  style={{height: '100px', width: '100px', borderRadius:7, marginLeft:'10%', marginRight:'10%', fontFamily:'K2D'}}
                />
                <SignUp />
              </CardActions>
            </CardContent>
          </Card>
          <Card className="card" style={{minWidth: '70%', height: 200, margin: 60, backgroundColor:'#F3ECE7', opacity: .81}}>
            <CardContent>
              <Typography color='textSecondary' className='login2' style={{color:'#214365', fontFamily:'K2D', fontSize:20}} gutterBottom>
                "A place to write, to think, and learn about yourself" -A.Morgan
              </Typography>
            </CardContent>
            <CardContent>
              <Typography color='textSecondary' className='login2' style={{color:'#214365', fontFamily:'K2D', fontSize:20}} gutterBottom>
                "I sleep better at night when I take the time to let my thoughts out first." -F.Flynn
              </Typography>
            </CardContent>
            <CardContent>
              <Typography color='textSecondary' className='login2' style={{color:'#214365', fontFamily:'K2D', fontSize:20}} gutterBottom>
                "A safe place to learn about myself." -E.Maize
              </Typography>
            </CardContent>
        </Card>
        </Grid>
      </div>
    );
    return (
      <div className='App'>
        {content}
      </div>
    );
  }
}

export default Login
