import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/login'
import Profile from './profile/Profile'
import Storage from './storage'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      value: '',
      entry: '',
      title: ''
    }
  }

  onDataLoad(data) {
    this.setState({data})
  }


  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit() {
    if (Storage.getToken()) {
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/profile" render={() => {
            return <Profile onDataLoad={this.onDataLoad.bind(this)}
                            submitEntry={this.handleSubmit.bind(this)}
                            data={this.state.data}
                            entryContent={this.handleChange.bind(this)}
                            randomPrompt={this.getRandomPrompt.bind(this)}/>
          }} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
