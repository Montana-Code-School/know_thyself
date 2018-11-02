import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Navbar from '../navbar/Navbar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Storage from '../storage'
import './Profile.css'
import TextEditor from '../editor/Editor'
import styles from './styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

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
  //here we send our token back to token-verification to be decoded and if verified,
  //have access to prompts and entries associated with that user.
  componentDidMount() {
    let routeUrl;
    if (process.env.NODE_ENV === 'development') {
      routeUrl = 'http://localhost:4001/api/prompts'
    } else {
      routeUrl = '/api/prompts'
    }
     fetch(routeUrl)
       .then((results) => results.json())
       .then(data => {
         this.props.fetchedPrompts(data)
         this.props.getRandomPrompt()
       })
       .catch((err) => console.log(err))
  }

  handleSubmit() {
    if (Storage.getToken()) {
      let formatted = this.props.value.replace(/(<br>)/g, '')
      formatted = formatted.replace(/(>\s)/g, '>&nbsp;&nbsp;&nbsp;&nbsp;')
      let input = {
        body: formatted,
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
      .then(data => this.props.clear())
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar path={this.props.location.pathname}
                theme={theme}
                position="sticky"/>
        <h3>{this.props.prompt}</h3>
        <TextEditor handleChange={this.props.handleChange}
                    value={this.props.value}
                    style={styles.paper}
                    words={this.props.words}
                    editorReference={this.props.editorReference}
                    />
        <Button
          className='submit'
          onClick={(e) => this.handleSubmit(e)}
          disabled={this.props.disabled}
          >
          Submit
        </Button>
      </MuiThemeProvider>
    )
  }
}

export default Profile
