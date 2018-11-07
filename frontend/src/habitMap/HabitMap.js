import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Storage from '../storage'



const styles = {
  head: {
    fontSize: 24,
    marginLeft: '4%'
  },
  inputs: {
    marginRight: '2%'
  },
  addButton: {
    height: '1%'
  },
  addCard: {
    margin: '1% 0 2% 3%',
    width: '33%'
  },
  habitCard: {
    margin: '1% 0 2% 3%',
    width: '25%',
    display: 'inline-block'
  },
  habitTitle: {
    fontSize: '20pt'
  },
  progressBar: {
    border: 'solid 1px black',
    borderRadius: '15px',
    margin: '13px 0 0 0',
    height: '18px',
    // padding: '0 14px',
    cursor: 'pointer'
  },
  tipCard: {
    width: '20%',
    height: 300,
    display: 'inline-block',
    float: 'right',
    margin: '2% 3% 0 3%',
    padding: 0
  },
  innerCard: {
    width: '95%',
    height: '96%',
    display: 'inline-block',
    margin: '2% 2% 2% 2%',
    border: 'solid 1px #373737',
    padding: 0
  },
  advice: {
    display: 'inline-block',
    fontSize: 14,
    margin: '0 0 6% 10%'
  },
  bar: {
    color: 'green',
  },
  lower: {
    marginTop: '5%'
  },
  plus: {
    marginRight: '30%'
  }
}

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
