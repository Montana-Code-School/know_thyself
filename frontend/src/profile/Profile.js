import React, { Component } from 'react';
import { Button, Card, CardContent, Typography  } from '@material-ui/core';
import Create from '@material-ui/icons/Create'
import Navbar from '../navbar/Navbar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Storage from '../storage';
import TextEditor from '../editor/Editor';
import styles from './Profile-styles'

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
    let promptsFetch, tipsFetch
    if (process.env.NODE_ENV === 'development') {
      promptsFetch = fetch('http://localhost:4001/api/prompts')
      tipsFetch = fetch('http://localhost:4001/api/tips')
    } else {
      promptsFetch = fetch('/api/prompts');
      tipsFetch = fetch('/api/tips')
    }
    Promise.all([promptsFetch, tipsFetch])
      .then((results) => {
        const promptsBlob = results[0].json()
        const tipsBlob = results[1].json()
        Promise.all([promptsBlob, tipsBlob])
          .then((results) => {
            this.props.fetchedPrompts(results)
            this.props.fetchedTips(results)
            this.props.getRandomPrompt()
            this.props.getRandomTip()
          })
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
        method: 'post',
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
        <Card style={styles.editorCard}>
          <Card style={styles.promptCard}>
            <CardContent>
              <Typography style={{fontSize: 18}}>
                {this.props.prompt}
              </Typography>
            </CardContent>
          </Card>
          <TextEditor handleChange={this.props.handleChange}
                      value={this.props.value}
                      words={this.props.words}
                      editorReference={this.props.editorReference}
          />
        </Card>
        <Card style={styles.tipCard}>
          <Card style={styles.innerCard}>
            <CardContent>
              <Create/>
              <Typography style={styles.advice}>
                Advice:
              </Typography>
              <Typography style={{fontSize: 18}}>
                {this.props.tip}
              </Typography>
            </CardContent>
          </Card>
        </Card>

        <Button
          style={styles.submit}
          variant="contained"
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
