import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Navbar from '../navbar/Navbar'
import Weather from '../weather/Weather'
import Time from '../time/time'


const styles = {

  paper:{
    height: '100%',
    // width: 100,
    // margin: 5,
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  textfield:{
    height: '100%',
    width: '75%'
  }
};

class Profile extends Component {

  componentDidMount() {
      fetch('http://localhost:4001/api/prompts')
      .then(blob => blob.json())
      .then(data => this.props.onDataLoad(data))
  }

  getRandomPrompt() {
    const {data} = this.props
    if (!data.length) return "loading"
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex].body
  }

  render(){
    console.log("profile props", this.props)
    return (
      <div>
        <Navbar />
          <Time />
          <Weather />
            <Paper style={styles.paper}>
              <TextField
                id="filled-full-width"
                multiline={true}
                rowsMax={30}
                label={this.getRandomPrompt()}
                style={styles.textfield}
                placeholder="Put your words in me..."
                fullWidth
                margin="normal"
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Paper>
      </div>
    )
  }
}

export default Profile
