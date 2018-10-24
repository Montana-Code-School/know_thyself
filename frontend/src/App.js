import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
<<<<<<< HEAD
import Login from './login/login'
=======
import { createMuiTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'
import Login from './login/Login'
>>>>>>> 07cd3c53a4f4faad8e2312bb62a40069cea3b34d
import Profile from './profile/Profile'
import Storage from './storage'

const theme = createMuiTheme ({
  palette: {
    primary: pink,
  }
})

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      value: '',
      entry: '',
<<<<<<< HEAD
      title: ''
=======
      prompt: ''
>>>>>>> 07cd3c53a4f4faad8e2312bb62a40069cea3b34d
    }
  }

  onDataLoad(data) {
    this.setState({data})
  }

  componentDidMount() {
      fetch('http://localhost:4001/api/prompts')
      .then(blob => blob.json())
      .then(data => this.setState({
        data: data}))
  }

  shouldComponentUpdate(nextProps) {
    if (this.state.data.length) {
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
    const {data} = this.state
    if (!data.length) return "loading"
    const randomIndex = Math.floor(Math.random() * data.length)
    const randomName = data[randomIndex].body
    this.setState({
      prompt: randomName
    })
    return data[randomIndex].body
  }

  handleSubmit() {
    console.log(this.state.prompt)
    if (Storage.getToken()) {
      console.log(this.state.data)
      const input = {
        body: this.state.value,
        title: this.state.prompt
      }
      fetch('http://localhost:4001/verify/entry', {
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


    componentDidMount() {
        fetch('http://localhost:4001/api/prompts')
        .then(blob => blob.json())
        .then(data => this.onDataLoad(data))
    }

    shouldComponentUpdate(nextProps) {
      if (this.state.data.length) {
        return false
      } else
        return true
    }

  getRandomPrompt() {
    const data = this.state.data
    if (!data.length) return "loading"
    const randomIndex = Math.floor(Math.random() * data.length)
    let ranP = data[randomIndex].body
    this.setState({
      prompt: ranP
    })
    return data[randomIndex].body

  }

  render() {
    return (
      <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/profile" render={() => {
<<<<<<< HEAD
            return <Profile onDataLoad={this.onDataLoad.bind(this)}
                            submitEntry={this.handleSubmit.bind(this)}
                            data={this.state.data}
                            entryContent={this.handleChange.bind(this)}
                            randomPrompt={this.getRandomPrompt.bind(this)}/>
=======
            return <Profile
                      onDataLoad={this.onDataLoad.bind(this)}
                      submitEntry={this.handleSubmit.bind(this)}
                      data={this.state.data}
                      entryContent={this.handleChange.bind(this)}
                      prompt={this.getRandomPrompt.bind(this)}/>
>>>>>>> 07cd3c53a4f4faad8e2312bb62a40069cea3b34d
          }} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
