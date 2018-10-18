import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './login/login'
import Profile from './profile/Profile'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: []
    }
  }

  onDataLoad(data) {
    console.log("on Data Load")
    this.setState({data})
  }


  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/profile" render={() => {
            return <Profile onDataLoad={this.onDataLoad.bind(this)} data={this.state.data} />

          }} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
