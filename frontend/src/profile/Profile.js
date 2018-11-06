import React, { Component } from 'react';
import { Button, Card, CardContent, Typography  } from '@material-ui/core';
import Create from '@material-ui/icons/Create'
import Navbar from '../navbar/Navbar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Storage from '../storage'
import './Profile.css'
import TextEditor from '../editor/Editor'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

const styles = {
  tipCard: {
    width: '20%',
    height: 300,
    display: 'inline-block',
    float: 'right',
    margin: '2% 3% 0 3%',
    padding: 0
  },
  editorCard: {
    width: '66%',
    margin: '2% 0 0 6%',
    float: 'left',
    display: 'inline-block'
  },
  promptCard: {
    width: '66%',
    height: '5%',
    margin: '1% 0 0 2%',
    padding: 0,
    border: 'solid 1px #373737'
  },
  innerCard: {
    width: '95%',
    height: '96%',
    display: 'inline-block',
    margin: '2% 2% 2% 2%',
    border: 'solid 1px #373737',
    padding: 0
  },
  submit: {
    marginLeft: '6%',
    marginRight: '40%',
    display: 'inline-block'
  },
  advice: {
    display: 'inline-block',
    fontSize: 14,
    margin: '0 0 6% 10%'
  }
}


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
            this.props.getRandomPromptAndTip()
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
      .then(data => console.log(data))
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
              <Typography>
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
              <Typography>
                {this.props.tip}
              </Typography>
            </CardContent>
          </Card>
        </Card>
        <Button
          style={styles.submit}
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
