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
    console.log(this.state.value)
  }

  handleSubmit() {
    if (Storage.getToken()) {
      fetch('http://localhost:4001/cheese/burger', {
        method: 'GET',
        headers: {
          'Content-type' : 'application/x-www-form-urlencoded',
          'Authorization': `bearer ${Storage.getToken()}`
        }
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
