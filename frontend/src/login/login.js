import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import config from '../config.json';
import Profile from '../profile/Profile';
import { Redirect } from 'react-router-dom';
import Storage from '../storage';


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
    console.log(response)
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
  // componentDidMount(){
  //   const token = Storage.getToken()
  // }


  render() {
    // if (this.state.checkingToken) return <div>loading</div>
    let content = !!this.state.isAuthenticated ?
      (
        <Redirect to="/profile" />
      ) :
      (
        <div>
          <GoogleLogin
            clientId={config.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.onFailure}
            />
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
