import React, { Component } from 'react';
import { Paper, TextField, Button} from '@material-ui/core';
import Navbar from '../navbar/Navbar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Storage from '../storage'
import './Profile.css'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

const styles = {
  paper:{
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '0 12% 0 12%',
    fontSize: '12px',
    fontStyle: 'italic',
    fontWeight: 'lighter',
    color: 'grey'
  },
  textfield:{
    height: '100%',
    width: '75%',
  }
};

class Profile extends Component {
  state = {
    disabled: true
  }

  buttonEnabled() {
    console.log(this.props.value)
    let words = this.props.value.split(' ')
    if (words.length >= 500) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }

  componentDidMount() {
    let promptsFetch, entriesFetch
    if (process.env.NODE_ENV === 'development') {
       promptsFetch = fetch('http://localhost:4001/api/prompts')
       entriesFetch = fetch('http://localhost:4001/verify/entry',
      {
         method: 'GET',
         headers: {
           'Content-type' : 'application/json',
           'Authorization': `bearer ${Storage.getToken()}`
         }
       })
    } else {
       promptsFetch = fetch('/api/prompts');
       entriesFetch = fetch('/verify/entry',
      {
        method: 'GET',
        headers: {
          'Content-type' : 'application/json',
          'Authorization': `bearer ${Storage.getToken()}`
          }
      })
    }
    Promise.all([promptsFetch, entriesFetch])
      .then((results) => {
        const promptsBlob = results[0].json()
        const entriesBlob = results[1].json()
        Promise.all([promptsBlob, entriesBlob])
          .then((results) => {
            this.props.fetched(results)
            this.props.getRandomPrompt()
          })
      })
      .catch((err) => console.log(err))
  }

  handleSubmit() {
    if (Storage.getToken()) {
      let input = {
        body: this.props.value,
        title: this.props.prompt
      }
      let pathname = '/verify/entry'
      if (process.env.NODE_ENV === 'development') {
        pathname=`http://localhost:4001${pathname}`
      }
      fetch( pathname, {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json',
          'Authorization': `bearer ${Storage.getToken()}`
        },
        body: JSON.stringify(input),
      })
      .then(res => res.json())
      .then(data =>
        this.props.clear(),
        console.log('heeeeeeeeeeey'))
    }
  }

  render() {
    let words = this.props.value.split(' ')
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar path={this.props.location.pathname} theme={theme} position="sticky"/>
        <h3>{this.props.prompt}</h3>
        <Paper style={styles.paper}>
          <TextField
            fullWidth={false}
            onChange={(e) => {this.props.inputValue(e);
                              this.buttonEnabled()}}
            value={this.props.value}
            id="filled-full-width"
            multiline={true}
            rowsMax={30}
            style={styles.textfield}
            placeholder="Put your words in me..."
            margin="normal"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          Word Count: {words.length - 1} of 500
        </Paper>
        <Button
          className='submit'
          onClick={(e) => this.handleSubmit(e)}
          disabled={this.state.disabled}
          >
          Submit
        </Button>
      </MuiThemeProvider>
    )
  }
}

export default Profile
