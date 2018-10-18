import React, { Component }  from 'react';
import Clock from 'react-live-clock';
import './time.css'


class Time extends Component {
  render() {
    return (
      <div>
          <Clock className="time" format={"dddd, MMMM Do YYYY, h:mm a"} ticking={true} timezone={'US/Mountain'} />
      </div>
    );
  }
}

export default Time;
