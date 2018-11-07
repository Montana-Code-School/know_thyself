import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography, Input  } from '@material-ui/core';
import { Create } from '@material-ui/icons';
import Navbar from '../navbar/Navbar';
import Storage from '../storage';
import HabitMap from '../habitMap/HabitMap';
import styles from './Habit-styles';

class Habits extends Component {
  state = {
    shouldRefetch: false
  }
  componentDidMount() {
    let routeUrl = '/api/tips'
    if (process.env.NODE_ENV === 'development') {
      routeUrl = 'http://localhost:4001/api/tips'
    }
    fetch(routeUrl)
      .then((results) => results.json())
      .then((results) => {
        this.props.fetchedTips(results)
        this.props.getRandomTip()
      })
      .catch((err) => console.log(err))
  }

  addHabit() {
    if (Storage.getToken()) {
      let input = {
        title: this.props.title,
        reps: this.props.reps,
        initial: 0,
        finished: false
      }
      let pathname = '/verify/habit'
      if (process.env.NODE_ENV === 'development') {
        pathname=`http://localhost:4001${pathname}`
      }
      fetch( pathname, {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json',
          'Authorization': `bearer ${Storage.getToken()}`
        },
        body: JSON.stringify(input),
      })
      .then(res => {
        this.refetchHabitTrigger()
        this.props.clearHabitForm()
      })
    }
  }

  refetchHabitTrigger() {
    this.setState({
      shouldRefetch: !this.state.shouldRefetch
    })
  }

  render() {
    return (
      <div>
        <Navbar path={this.props.location.pathname} fetchedHabits={this.props.fetchedHabits}/>
        <div className="container">
          <div id="app">
            <Card style={styles.tipCard}>
              <Card style={styles.innerCard}>
                <CardContent>
                  <Create/>
                  <Typography style={styles.advice}>
                    Advice:
                  </Typography>
                  <Typography>
                    {this.props.tip}
                  </Typography>
                </CardContent>
              </Card>
            </Card>
            <Card style={styles.addCard}>
              <Typography style={styles.head}>Habit Tracker</Typography>
              <CardContent>
                <Input onChange={this.props.handleHabitTitle}
                       type="text"
                       id='habitTitle'
                       placeholder="Habit"
                       value={this.props.title}
                       style={styles.inputs} />
                <Input onChange={this.props.handleHabitReps}
                       type="number"
                       placeholder="Repetitions"
                       value={this.props.reps}
                       style={styles.inputs} />
                <Button id="creator"
                        onClick={(e) => this.addHabit(e)}
                        style={styles.addButton}>Add
                </Button>
              </CardContent>
            </Card>
            <HabitMap fetchedHabits={this.props.fetchedHabits}
                      habits={this.props.habits}
                      title={this.props.title}
                      reps={this.props.reps}
                      initial={this.props.initial}
                      shouldRefetch={this.state.shouldRefetch}
                      addReps={this.props.addReps}
                      refetchHabitTrigger={this.refetchHabitTrigger.bind(this)}
                      />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Habits);
