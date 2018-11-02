import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './login/Login';
import Profile from './profile/Profile';
import Entries from './entries/Entries';
import Habits from './habits/Habits';
import Todo from './todo/Todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompts: [],
      entries: [],
      value: '',
      prompt: '',
      disabled: true,
      words: ''
    }
    this.textInput = React.createRef()
  }


  fetchedPrompts(results) {
    this.setState({
      prompts: results
    })
  }

  fetchedEntries(results) {
    const entries = results.reverse()
    this.setState({
      entries: entries
    })
  }

  handleChange(editorState) {
    this.setState({
      value: editorState
    })
    if (this.textInput.current) {
      let field = this.textInput.current.getEditor().getText().split(/\s+/)
      this.setState({
        words: field
      })
    }
    if (this.state.words.length - 1 >= 500) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
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

  clear() {
    this.setState({
      value: '',
      words: ''
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <PrivateRoute path="/profile"
                        component={Profile}
                        fetchedPrompts={this.fetchedPrompts.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        getRandomPrompt={this.getRandomPrompt.bind(this)}
                        prompt={this.state.prompt}
                        value={this.state.value}
                        clear={this.clear.bind(this)}
                        disabled={this.state.disabled}
                        words={this.state.words}
                        editorReference={this.textInput}
                        />

          <PrivateRoute path='/entries'
                        component={Entries}
                        entries={this.state.entries}
                        fetchedEntries={this.fetchedEntries.bind(this)}
                        />
          <PrivateRoute path='/habits' component={Habits} />
          <PrivateRoute path='/todo' component={Todo} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
