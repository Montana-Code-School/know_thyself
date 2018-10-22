import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Navbar from '../navbar/Navbar';
import Weather from '../weather/Weather';
import Time from '../time/Time';

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
// gets list of prompts from backend
  // componentDidMount() {
  //     fetch('http://localhost:4001/api/prompts')
  //     .then(blob => blob.json())
  //     .then(data => this.props.onDataLoad(data))
  // }
  //
  // shouldComponentUpdate(nextProps) {
  //   console.log("should component update")
  //   if (this.props.data.length) {
  //     return false
  //   } else
  //     return true
  // }
  //
  // getRandomPrompt() {
  //   console.log("get random prompt", this.props.data)
  //   const {data} = this.props
  //   if (!data.length) return "loading"
  //   const randomIndex = Math.floor(Math.random() * data.length)
  //   const randomName = data[randomIndex].body
  //   const randomId = data[randomIndex]._id;
  //   console.log(randomName)
  //   return data[randomIndex].body
  // }

  // handleSubmit() {
  //   console.log(this.randomName)
  //   if (Storage.getToken()) {
  //     console.log(this.props.data)
  //     const input = {
  //       body: this.props.value,
  //       title: this.props.data.body
  //     }
  //     fetch('http://localhost:4001/verify/entry', {
  //       method: 'POST',
  //       headers: {
  //         'Content-type' : 'application/json',
  //         'Authorization': `bearer ${Storage.getToken()}`
  //       },
  //       body: JSON.stringify(input),
  //       title: JSON.stringify(input)
  //     })
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //   }
  // }



  // shouldComponentUpdate(nextProps) {
  //   if (this.props.data.length) {
  //     return false
  //   } else
  //     return true
  // }

  // returns a random prompt in <paper> label on page load
  // getRandomPrompt() {
  //   const {data} = this.props
  //   if (!data.length) return "loading"
  //   const randomIndex = Math.floor(Math.random() * data.length)
  //   return data[randomIndex].body
  // }


  render() {
    return (
      <div>
        <Navbar position="sticky"/>
        <Time />
        <Weather />
        <h3>{this.props.prompt()}</h3>
        <Paper style={styles.paper}>
          <TextField
            onChange={(e) => this.props.entryContent(e)}
            id="filled-full-width"
            multiline={true}
            rowsMax={30}
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
        <Button
          onClick={(e) => this.props.submitEntry(e)}
          disabled={false}
          color="primary">
          Submit
        </Button>
      </div>
    )
  }
}

export default Profile
