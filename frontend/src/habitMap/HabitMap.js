import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Storage from '../storage'
import styles from './HabitMap-styles'


class HabitMap extends Component {
  state = {
    distance: 0
  }

  habitFetch() {
    let routeUrl = '/verify/habit'
    if (process.env.NODE_ENV === 'development') {
      routeUrl = 'http://localhost:4001/verify/habit'
    }
    fetch( routeUrl,
      {
        method: 'GET',
        headers: {
          'Content-type' : 'application/json',
          'Authorization': `bearer ${Storage.getToken()}`
        }
      })
      .then((results) => results.json())
      .then((results) => {
        this.props.fetchedHabits(results)
      })
      .catch((err) => console.log(err))
  }

  componentDidMount() {
    this.habitFetch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldRefetch !== prevProps.shouldRefetch) {
      this.habitFetch()
    }
  }

upReps(e) {
  if (Storage.getToken()) {
    let pathname = `/verify/habit/${e.target.id}`
    if (process.env.NODE_ENV === 'development') {
      pathname=`http://localhost:4001${pathname}`
    }
    fetch( pathname, {
      method: 'PUT',
      headers: {
        'Content-type' : 'application/json',
        'Authorization': `bearer ${Storage.getToken()}`
      }
    })
    .then(data => data.json())
    .then(res => {
      this.props.refetchHabitTrigger()
      this.props.addReps(res)
    })
  }
}


createBoxes(habit) {
  let reps = [...Array(41).keys()]
  let elements = []
  for (var i = 0; i < reps.length; i++) {
    if (habit.checked.indexOf(reps[i]) > -1) {
      elements.push(<div key={i-1}
                         style={styles.boxesYes}>
                    </div>)
    } else {
      elements.push(<div key={i-1}
                         style={styles.boxes}>
                    </div>)
    }
  }
  return elements
}

removeHabit(e) {
  if (Storage.getToken()) {
    let pathname = `/verify/habit/${e.target.id}`
    if (process.env.NODE_ENV === 'development') {
      pathname=`http://localhost:4001${pathname}`
    }
    fetch( pathname, {
      method: 'DELETE',
      headers: {
        'Content-type' : 'application/json',
        'Authorization': `bearer ${Storage.getToken()}`
      }
    })
    .then(data => console.log(this.props))
    .then(res => this.props.refetchHabitTrigger())
  }
}

  render() {
    return (
      <div>
        {this.props.habits.map(habit =>
          <Card key={habit._id}
                className="row habit"
                style={habit.difference >= 41 ? styles.habitCardComplete : styles.habitCard}>
            <CardContent className="four columns" transition="slide">
              <Typography className='habitTitle'
                          style={styles.habitTitle} >
                          {habit.title}
              </Typography>
              <Typography className='dayCount' style={styles.dayCount} >day {!habit.difference ? 1 : habit.difference}</Typography>
              {this.createBoxes(habit)}
              <Typography className='habitReps' style={styles.habitReps} >{habit.checked.length} out of 42 days completed</Typography>
              <div style={styles.progressBar}>
                <div className="bar"
                     style={{ backgroundColor: 'green',
                              maxWidth: '100%',
                              width: (!habit.checked.length ? '0%' : habit.checked.length/habit.difference * 100 + '%'),
                              height: '100%',
                              borderRadius: '13px'}}>
                </div>
              </div>
              <div className="lower" style={styles.lower}>
                <Button className='plus'
                        style={styles.plus}
                        varient='fab'
                        color='primary'
                        aria-label='Add'
                        id="progress">
                   <AddIcon id={habit._id} onClick={e => this.upReps(e)}/>
                </Button>
                <button
                  onClick={this.removeHabit.bind(this)}
                  id={habit._id}
                  >
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
}



export default withStyles(styles)(HabitMap);
