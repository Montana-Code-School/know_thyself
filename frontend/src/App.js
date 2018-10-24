import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/Login'
import Profile from './profile/Profile'
import Storage from './storage'


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      value: '',
      entry: '',
      prompt: ''
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

  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/profile" render={() => {
            return <Profile
                      onDataLoad={this.onDataLoad.bind(this)}
                      submitEntry={this.handleSubmit.bind(this)}
                      data={this.state.data}
                      entryContent={this.handleChange.bind(this)}
                      prompt={this.getRandomPrompt.bind(this)}/>
          }} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
