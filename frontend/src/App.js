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
      entry: ''
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
        body: this.state.value  
      }
      fetch('http://localhost:4001/verify/entry', {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json',
          'Authorization': `bearer ${Storage.getToken()}`
        },
        body: JSON.stringify(input)
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
            return <Profile onDataLoad={this.onDataLoad.bind(this)}
                            submitEntry={this.handleSubmit.bind(this)}
                            data={this.state.data}
                            entryContent={this.handleChange.bind(this)}/>
          }} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
