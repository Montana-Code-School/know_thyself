import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {Typography, Card, Grid , CardContent, CardActions } from '@material-ui/core';
import {List, ListItem, ListItemText} from '@material-ui/core';
import config from '../config.json';
import Storage from '../storage';
import SignUp from '../locallogin/Local-signup';
import styles from './Login-styles';
import './Login.css'

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
    const tokenBlob =
      new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)],
      {type : 'application/json'});
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
        console.log(user.token)
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
            className='grid'
            style={styles.grid}
            container
            direction='row'
            justify='space-around'
            alignItems='flex-end'
            >
            <Card className='card1' style={styles.card1}>
              <CardContent className='cc1' style={styles.cc1}>
                <Card className='card6' style={styles.card6}>
                <Typography className='ct1' style={styles.ct1}>
                  Know Thyself
                </Typography>
                <Typography className='ct9' style={styles.ct9}>
                  "Simple Journaling - Hard Prompts"
                </Typography>
                </Card>
                <br></br>
                <br></br>
                <Typography className='ct8' style={styles.ct8}>
                  Take a little bit of time each day to reflect on yourself,
                  your choices, and how you can improve you life with our
                  online Journal, and thoughtful Prompts.
                <br></br>
                <br></br>
                  Hold yourself accountable and track your progress with our
                  Habit Tracker.
                <br></br>
                <br></br>
                  We'll help you get started with Writing and Habit Tracking Tips.
                </Typography>
                <br></br>
                <br></br>
                <Typography style={styles.ct2} className='ct2'>
                  'Knowing yourself is the beginning of all wisdom.' -Aristotle
                </Typography>
              </CardContent>
            </Card>
            <Card className='card2' style={styles.card2}>
              <CardContent>
                <Typography
                  color='textSecondary'
                  className='ct3'
                  style={styles.ct3}
                  gutterBottom
                  >
                  Sign-up or Login
                </Typography>
                <br></br>
                <SignUp />
                <Typography className='ct4' style={styles.ct4}>- or -</Typography>
                <CardActions>
                  <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    variant='outlined'
                    buttonText='Sign-up/Login with Gmail'
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                    className='login'
                    style={styles.login}
                  />
                </CardActions>
              </CardContent>
            </Card>
        </Grid>
        <Card className="card3" style={styles.card3}>
          <CardContent>
            <Typography
              color='textSecondary'
              className='ct5'
              style={styles.ct5}
              gutterBottom
              >
              "In the short term, writing about personal values makes people
              feel more powerful, in control, proud, and strong. It also makes
              them feel more loving, connected, and empathetic toward others.
              It increases pain tolerance, enhances self-control, and reduces
              unhelpful rumination after a stressful experience.
              In the long term, writing about values has been shown to boost
              GPAs, reduce doctor visits, improve mental health, and help with
              everything from weight loss to quitting smoking and reducing
              drinking."
              - Kelly McGonigal (Psychologist, Author of 'The Upside of Stress')
            </Typography>
          </CardContent>
        </Card>
        <Card className="card4" style={styles.card4}>
        <CardContent>
          <Typography
            color='textSecondary'
            className='ct6'
            style={styles.ct6}
            gutterBottom
            >
            "Something about the process of checking off a habit each day and
             keeping a log of my progress really improves my motivation and
             ability to complete that habit each day."
             - Belle Beth Cooper, Lifehacker.com
          </Typography>
        </CardContent>
        </Card>
        <Card className="card5" style={styles.card5}>
          <CardContent>
            <Typography
              color='textSecondary'
              className='ct7'
              style={styles.ct7}
              gutterBottom
              >
              "A safe place to learn about myself." -E.Maize
            </Typography>
          </CardContent>
        </Card>
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
