import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './Habits.css'
import Navbar from '../navbar/Navbar'
import Storage from '../storage'



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Habits extends Component {

  // componentDidMount() {
  //   let habitsFetch
  //   if (process.env.NODE_ENV === 'development') {
  //     habitsFetch = fetch('http://localhost:4001/api/habits')
  //   }else {
  //     habitsFetch = fetch('/api/habits')
  //   }
  //   Promise.all([habitsFetch])
  //     .then((results) => {
  //       const habitsBlob = results[0].json()
  //       Promise.all([habitsBlob])
  //         .then((results) => {
  //           this.props.habitsFetch(results)
  //         })
  //     })
  //     .catch((err) => console.log(err))
  // }



  addHabit() {
    if (Storage.getToken()) {
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
      .then(res => res.json())
      .then(data => console.log(data))
    }
  }


  render() {
    console.log(this.props.habits)
    return (
      <div>
        <Navbar path={this.props.location.pathname} fetchedHabits={this.props.fetchedHabits}/>
        <div className="container">
          <div id="app">
            <h1>Habit Tracker</h1>
            <div>
              <input onChange={this.props.handleHabitTitle} type="text" id='habitTitle' placeholder="Habit Title" value={this.props.title} /><br />
              <input onChange={this.props.handleHabitReps} type="number" placeholder="Repetitions" value={this.props.reps} /><br />
              <button id="creator" onClick={(e) => this.addHabit(e)}>Add</button>
            </div>
            {this.props.habits.map(habit =>
              <div key={habit._id} className="row habit" >
                <div className="four columns" transition="slide" style={{borderBottom: '5px solid'}}>
                  <h4>{habit.title}</h4>
                  <div className="shell">
                    <div className="bar" style={{ width: 100 - habit.complete * (100 / habit.initial) + '%' }}></div>
                  </div>
                  {/* <div className="lower">
                    <span onClick={this.removeHabit(this.props.habit)}>
                      <i class="fa fa-times"></i>
                    </span>
                    <button id="progress"
                            onClick={this.completeReps(habit)}
                            v-show="!habit.finished"
                            style="{ background: habit.random }"
                     >
                      <i className="fa fa-plus"></i>
                    </button>
                    <div v-show="!habit.finished">{{ habit.complete }}/{{ habit.initial }} times</div>
                    <div v-show="habit.finished" transition="slide">Complete!</div>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>





      // <div>
      //   <Navbar path={this.props.location.pathname}/>
      // <div className={classes.root}>
      //   <List>
      //     {[0, 1, 2, 3].map(value => (
      //       <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
      //         <Checkbox
      //           checked={this.state.checked.indexOf(value) !== -1}
      //           tabIndex={-1}
      //           disableRipple
      //         />
      //         <ListItemText primary={`Line item ${value + 1}`} />
      //         <ListItemSecondaryAction>
      //           <IconButton aria-label="Comments">
      //             <CommentIcon />
      //           </IconButton>
      //         </ListItemSecondaryAction>
      //       </ListItem>
      //     ))}
      //   </List>
      //   </div>
      // </div>
    );
  }
}



export default withStyles(styles)(Habits);
