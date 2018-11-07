import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Storage from '../storage'
import styles from './HabitMap-styles'

class HabitMap extends Component {

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
      .then((res) => res.json())
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
      this.props.addReps(res)
      this.props.refetchHabitTrigger()
    })
  }
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

              <Card key={habit._id} className="row habit" style={styles.habitCard}>
                <CardContent className="four columns" transition="slide">
                  <Typography className='habitTitle' style={styles.habitTitle} >{habit.title}</Typography>
                  <Typography className='habitReps' style={styles.habitReps} >{habit.initial} complete</Typography>
                  <div style={styles.progressBar}>
                    <div className="bar" style={{ backgroundColor: 'green', width: '100%', height: '100%', borderRadius: '15px'}}></div>
                  </div>
                  <div className="lower" style={styles.lower}>
                    <Button className='plus'
                            style={styles.plus}
                            varient='fab'
                            color='primary'
                            aria-label='Add'
                            id="progress"
                            // onClick={this.completeReps(habit)}
                            v-show="!habit.finished"
                            // style="{ background: habit.random }"
                     >
                       <AddIcon id={habit._id} onClick={e => this.upReps(e)}/>
                    </Button>
                    <button
                      onClick={this.removeHabit.bind(this)}
                      id={habit._id}
                      >
                      Delete
                    </button>

                    {/* <div v-show="!habit.finished">{{ habit.complete }}/{{ habit.initial }} times</div>
                    <div v-show="habit.finished" transition="slide">Complete!</div> */}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
    );
  }
}



export default withStyles(styles)(HabitMap);
