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
      tips: [],
      tip: '',
      disabled: true,
      words: '',
      habits: [],
      title: '',
      reps: '',
      initial: 0,
      complete: 0,
      finished: false
    }
    this.textInput = React.createRef()
  }


  fetchedPrompts(results) {
    this.setState({
      prompts: results[0],
      tips: results[1]
    })
  }

  fetchedEntries(results) {
  const entries = results.reverse()
  this.setState({
    entries: entries
  })
}

  fetchedHabits(results) {
    const habits = results.reverse()
    this.setState({
      habits: habits
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

  getRandomPromptAndTip() {
    const {prompts} = this.state
    const {tips} = this.state
    if (!prompts.length && !tips.length) {
      this.setState({
        prompt: 'loading',
        tip: 'loading'
      })
    } else {
    const randomPrompt = Math.floor(Math.random() * prompts.length)
    const randomTip = Math.floor(Math.random() * tips.length)
    const randomPromptName = prompts[randomPrompt].body
    const randomTipName = tips[randomTip].body
    this.setState({
      prompt: randomPromptName,
      tip: randomTipName
      })
    }
  }
    handleHabitTitle(e) {
      this.setState({
        title: e.target.value
      })
    }
    handleHabitReps(e) {
      this.setState({
        reps: e.target.value
      })
    }

  completeReps () {
    this.setState({
      reps: 1
    });
    this.setState({
      complete: 1
    });
    this.setState({
      finished: true
    });
  }

  // removeHabit () {
  //   this.props.habits.$remove(habit);
  //   console.log(this.props.habits);
  // }

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
                        getRandomPromptAndTip={this.getRandomPromptAndTip.bind(this)}
                        prompt={this.state.prompt}
                        tip={this.state.tip}
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
          <PrivateRoute path='/habits'
                        component={Habits}
                        handleHabitTitle={this.handleHabitTitle.bind(this)}
                        fetchedHabits={this.fetchedHabits.bind(this)}
                        handleHabitReps={this.handleHabitReps.bind(this)}
                        habits={this.state.habits}
                        title={this.state.title}
                        reps={this.state.reps}
                        // addHabit={this.addHabit.bind(this)}
                        completeReps={this.completeReps.bind(this)}
                        // removeHabit={this.removeHabit.bind(this)}

                        />
          <PrivateRoute path='/todo' component={Todo} />
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
