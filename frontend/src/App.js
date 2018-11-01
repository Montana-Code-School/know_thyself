import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './login/Login';
import Profile from './profile/Profile';
import Entries from './entries/Entries';
import Habits from './habits/Habits';
import Todo from './todo/Todo';

class App extends Component {
  state = {
    prompts: [],
    entries: [],
    value: '',
    prompt: ''
  }

  clearInput(){
    this.setState({
      value: ''
    })
  }

  fetchedPromptsAndEntries(results) {
    const entries = results[1].reverse()
    this.setState({
      prompts: results[0],
      entries: entries
    })
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  getRandomPrompt() {
    const {prompts} = this.state
    if (!prompts.length) {
      this.setState({
        prompt: 'loading'
      })
    } else {
    const randomIndex = Math.floor(Math.random() * prompts.length)
    const randomName = prompts[randomIndex].body
    this.setState({
      prompt: randomName
    })
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <PrivateRoute path="/profile"
                        component={Profile}
                        fetched={this.fetchedPromptsAndEntries.bind(this)}
                        inputValue={this.handleChange.bind(this)}
                        getRandomPrompt={this.getRandomPrompt.bind(this)}
                        prompt={this.state.prompt}
                        value={this.state.value}
                        clear={this.clearInput.bind(this)}
                         />

          <PrivateRoute path='/entries'
                        component={Entries}
                        entries={this.state.entries} />
          <PrivateRoute path='/habits' component={Habits} />
          <PrivateRoute path='/todo' component={Todo} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
