import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import {Typography, Card, Grid , CardContent, CardActions, Button} from '@material-ui/core';
import config from '../config.json';
import Storage from '../storage';
import Navbar from '../navbar/Navbar'
import './Login.css'
import gridBackgroundImage from '../images/background.jpg'

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
                this.setState({isAuthenticated: true, user, token})
                Storage.saveToken(token)
            }
        });
    })
  }

  render() {
    // if (this.state.checkingToken) return <div>loading</div>
    let content = !!this.state.isAuthenticated ?
      (
        <Redirect to="/profile" />
      ) :
      (
        <div>
          <Navbar className='Navbar'/>

            {/* <img className="img1" src={require('../images/person2.jpeg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img2" src={require('../images/person3.jpeg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img3" src={require('../images/person4.jpg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img2" src={require('../images/person5.jpg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img3" src={require('../images/person9.jpg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img1" src={require('../images/person12.jpg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img2" src={require('../images/person7.jpeg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img1" src={require('../images/person13.jpeg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img1" src={require('../images/person14.jpeg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img2" src={require('../images/person15.jpeg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img1" src={require('../images/person16.jpeg')} style={{width: 300, height: 200, padding: 5}} />
            <img className="img3" src={require('../images/person17.jpeg')} style={{width: 300, height: 200, padding: 5}} /> */}
            {/* <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              variant="outlined"
              buttonText="Sign in with Google"
              onSuccess={this.googleResponse}
              onFailure={this.onFailure}
              className="login"
              /> */}

              <Grid
                container
                  direction="row"
                  justify="space-around"
                  alignItems="flex-end"
                  className="grid"
                  style={styles.grid}>
                {/* <img class="logo" src={require('../images/Logo4.png')}  /> */}
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
                  <Button><GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    variant="outlined"
                    buttonText="Sign in with Google"
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                    className="login"
                    style={{borderRadius:7}}
                    /></Button>
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
