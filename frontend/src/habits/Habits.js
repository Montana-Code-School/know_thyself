import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography, Input  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './Habits.css'
import Navbar from '../navbar/Navbar'
import Storage from '../storage'
import Create from '@material-ui/icons/Create'




// const theme = theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
// });


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

class Habits extends Component {

  componentDidMount() {
    let habitsFetch, tipsFetch
    if (process.env.NODE_ENV === 'development') {
       habitsFetch = fetch('http://localhost:4001/verify/habit',
       {
         method: 'GET',
         headers: {
           'Content-type' : 'application/json',
           'Authorization': `bearer ${Storage.getToken()}`
         }
       })
       tipsFetch = fetch('http://localhost:4001/api/tips')
    } else {
      habitsFetch = fetch('http://localhost:4001/verify/habit',
      {
        method: 'GET',
        headers: {
          'Content-type' : 'application/json',
          'Authorization': `bearer ${Storage.getToken()}`
        }
      })
      tipsFetch = fetch('/api/tips')
    }
    Promise.all([habitsFetch, tipsFetch])
      .then((results) => {
        const habitsBlob = results[0].json()
        const tipsBlob = results[1].json()
        Promise.all([habitsBlob, tipsBlob])
          .then((results) => {
            this.props.fetchedHabits(results)
            this.props.fetchedTips(results)
            this.props.getRandomTip()
          })
      })
      .catch((err) => console.log(err))
  }

addHabit() {
  if (Storage.getToken()) {
    console.log('addHabit')
    let input = {
      title: this.props.title,
      reps: this.props.reps,
      initial: this.props.reps,
      complete: 0,
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
      console.log('near the end')
      res.json()})
    .then(data => console.log(data))
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
  }
  console.log('made it though removeHabit in habits.')
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
            {this.props.habits.map(habit =>
              <Card key={habit._id} className="row habit" style={styles.habitCard}>
                <CardContent className="four columns" transition="slide">
                  <Typography className='habitTitle' style={styles.habitTitle} >{habit.title}</Typography>
                  <Typography className='habitReps' style={styles.habitReps} >{habit.reps} till complete</Typography>
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
                       <AddIcon />
                    </Button>
                    <button
                      onClick={this.removeHabit.bind(habit._id)}
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
        </div>
      </div>
    );
  }
}



export default withStyles(styles)(Habits);
