import React, { Component } from 'react';
import { Paper, TextField, Button} from '@material-ui/core';
import Navbar from '../navbar/Navbar';
import Weather from '../weather/Weather';
import Time from '../time/Time';
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
    margin: '0 12% 0 12%'
  },
  textfield:{
    height: '100%',
    width: '75%'
  }
};

class Profile extends Component {

  state = {
    prompts: [],
    value: '',
    entry: '',
    prompt: '',
    entries: []
  }

  componentDidMount() {
    let promptsFetch, entriesFetch
    if (process.env.NODE_ENV === 'development') {
       promptsFetch = fetch('https://dry-cove-74246.herokuapp.com/api/prompts')
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
    Promise.all([promptsFetch , entriesFetch])
      .then((results) => {
        console.log(results[0])
        const promptsBlob = results[0].json()
        const entriesBlob = results[1].json()
        Promise.all([promptsBlob, entriesBlob])
          .then((results) => {
            this.setState({
              prompts: results[0],
              entries: results[1]
            })
          })
      })
      .catch((err) => console.log(err))
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.prompts.length) {
      return false
    } else
      return true
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  getRandomPrompt() {
    const {prompts} = this.state
    if (!prompts.length) return "loading"
    const randomIndex = Math.floor(Math.random() * prompts.length)
    const randomName = prompts[randomIndex].body
    this.setState({
      prompt: randomName
    })
    return prompts[randomIndex].body
  }

  handleSubmit() {
    if (Storage.getToken()) {
      const input = {
        body: this.state.value,
        title: this.state.prompt
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
        title: JSON.stringify(input)
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  }

  getEntries() {
    if (Storage.getToken()) {
      let pathname = '/verify/entry'
      if (process.env.NODE_ENV === 'development') {
        pathname=`http://localhost:4001${pathname}`
      }
      fetch( pathname, {
        method: 'GET',
        headers: {
          'Content-type' : 'application/json',
          'Authorization': `bearer ${Storage.getToken()}`
        },
      })
      .then(res => res.json())
      .then(data => this.setState({
        entries: data
      })
    )
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar entries={this.state.entries} theme={theme} position="sticky"/>
        <Time />
        <Weather />
        <h3>{this.getRandomPrompt()}</h3>
        <Paper style={styles.paper}>
          <TextField
            fullWidth={false}
            onChange={(e) => this.handleChange(e)}
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
        </Paper>
        <Button
          className='submit'
          onClick={(e) => this.handleSubmit(e)}
          disabled={false}
          >
          Submit
        </Button>
      </MuiThemeProvider>
    )
  }
}

export default Profile
