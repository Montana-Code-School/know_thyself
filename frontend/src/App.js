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
      prompt: '',
      entries: [],
      tips: [],
      tip: '',
      habits: [],
      value: '',
      words: '',
      disabled: true,
      title: '',
      reps: '',
      initial: 0,
      complete: 0,
      finished: false
    }
    // reference created and passed to react-quill. used to save text formatting
    // upon entry saving
    this.textInput = React.createRef()
  }

  // sets prompts state from componentsDidMount in Profile.js
  fetchedPrompts(results) {
    this.setState({
      prompts: results[0]
    })
  }
  // sets tips state from componentDidMount in Profile.js and Habits.js
  fetchedTips(results) {
    this.setState({
      tips: results[1]
    })
  }
  // sets entries state from componentDidMount in Entries.js
  fetchedEntries(results) {
    const entries = results.reverse()
    this.setState({
      entries: entries
    })
  }
  // sets tips state from componentDidMount in Habits.js
  fetchedHabits(results) {
    const habits = results[0].reverse()
    this.setState({
      habits: habits,
    })
  }
  // Passed down to Editor.js through Profile.js. stores value in text editor
  // counts words (words are passed as props down to Editor.js)
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
  // clears text from text editor field upon submitting entry.
  clear() {
    this.setState({
      value: '',
      words: ''
    })
  }
  // chooses a random index from prompts state upon profile render.
  getRandomPrompt() {
    const { prompts } = this.state
    if (!prompts.length) {
      this.setState({
        prompt: 'loading'
      })
    } else {
    const randomPrompt = Math.floor(Math.random() * prompts.length)
    const randomPromptName = prompts[randomPrompt].body
    this.setState({
      prompt: randomPromptName
      })
    }
  }
  // chooses a random index from habits state upon profile and habits render.
  getRandomTip() {
    const {tips} = this.state
    if (!tips.length) {
      this.setState({
        tip: 'loading'
      })
    } else {
    const randomTip = Math.floor(Math.random() * tips.length)
    const randomTipName = tips[randomTip].body
    this.setState({
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
      reps: 1,
      complete: 1,
      finished: true
    })
  }

  // removeHabit () {
  //   this.props.habits.$remove(habit);
  //   console.log(this.props.habits);
  // }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <PrivateRoute path="/profile"
                        component={Profile}
                        // methods and handlers
                        fetchedPrompts={this.fetchedPrompts.bind(this)}
                        fetchedTips={this.fetchedTips.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        getRandomPrompt={this.getRandomPrompt.bind(this)}
                        getRandomTip={this.getRandomTip.bind(this)}
                        clear={this.clear.bind(this)}
                        // state
                        prompt={this.state.prompt}
                        tip={this.state.tip}
                        value={this.state.value}
                        disabled={this.state.disabled}
                        words={this.state.words}
                        // refs
                        editorReference={this.textInput}
                        />
          <PrivateRoute path='/entries'
                        component={Entries}
                        // methods and handlers
                        fetchedEntries={this.fetchedEntries.bind(this)}
                        // state
                        entries={this.state.entries}
                        />
          <PrivateRoute path='/habits'
                        component={Habits}
                        // methods and handlers
                        handleHabitTitle={this.handleHabitTitle.bind(this)}
                        handleHabitReps={this.handleHabitReps.bind(this)}
                        fetchedHabits={this.fetchedHabits.bind(this)}
                        fetchedTips={this.fetchedTips.bind(this)}
                        getRandomTip={this.getRandomTip.bind(this)}
                        completeReps={this.completeReps.bind(this)}
                        // state
                        tip={this.state.tip}
                        habits={this.state.habits}
                        title={this.state.title}
                        reps={this.state.reps}
                        // addHabit={this.addHabit.bind(this)}
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
