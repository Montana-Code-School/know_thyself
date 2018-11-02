import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {Typography, Card, Grid , CardContent, CardActions } from '@material-ui/core';
import config from '../config.json';
import Storage from '../storage';
import SignUp from '../locallogin/Local-signup'
import './Login.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



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
    let pathname = '/api/v1/auth/google'
    if (process.env.NODE_ENV === 'development') {
      pathname=`http://localhost:4001${pathname}`
    }
    fetch(pathname, options).then(r => {
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
        <Redirect to='/profile' />
      ) : (
        <div>
          <Grid
            container
              direction='row'
              justify='space-around'
              alignItems='flex-end'
              className='grid'>
            <Card className='card' style={{width: '50%', height: 'auto', margin: 60, backgroundColor: '#F3ECE7', opacity: .81}}>
              <CardContent style={{textAlign: 'center', color: '#214365'}}>
                <Typography style={{fontFamily: 'Satisfy, cursive', color: '#214365', fontSize: 75}} className='logo1' gutterBottom>
                  Know Thyself
                </Typography>
                <List style={{fontFamily:'K2D', display: 'inline-block'}}>
                  {['Writing Prompts', 'Habit Tracker', 'Track your progress'].map(value => (
                    <ListItem key={value}>
                      <ListItemText primary={value} />
                    </ListItem>
                  ))}
                </List>
                <List style={{display: 'inline-block', fontFamily:'K2D'}}>
                  {['Some other feature', 'more stuff', 'you guessed it. things.'].map(value => (
                    <ListItem key={value}>
                      <ListItemText primary={value} />
                    </ListItem>
                  ))}
                </List>
                <Typography style={{fontFamily: 'Satisfy, cursive', color: '#214365', fontSize: 23}} className='logo2'>
                  'Knowing yourself is the beginning of all wisdom.' -Aristotle
                </Typography>
              </CardContent>
            </Card>
            <Card className='signUp' style={{width: '30%', height: 'auto', margin: 60, textAlign: 'center'}}>
              <CardContent>

                <Typography color='textSecondary' className='login2' style={{color:'#214365', fontFamily:'K2D', fontSize:35}} gutterBottom>
                  Sign-up or Login
                </Typography>
                <SignUp />
                <Typography style={{color: '#214365', fontSize: 20}}>- Or -</Typography>
                <CardActions>
                  <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    variant='outlined'
                    buttonText='Sign-up/Login with Gmail'
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                    className='login'
                    style={{fontSize: 16, margin: 'auto', height: '5%', width: '180px', borderRadius:7, fontFamily:'K2D'}}
                  />
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
