import React from 'react';
import './Weather.css'
import axios from 'axios'

function getLocation() {
  return axios.get("https://ipapi.co/json/");
}

function getWeather(location) {

  let units = "&units=metric";
  let appid = "&APPID=e8656d00ae56fd09428db5cae581be02";

  return axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + location + units + appid);
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 'C',
      location: '',
      weather: '',
      temp: 0
    };
  }

  componentDidMount() {
    let _this = this;

    getLocation().then(function(result) {
        let loc = result.data.city + ', ' + result.data.country;

        getWeather(loc).then(function(result) {

          _this.setState({
            location: loc,
            weather: result.data.weather[0],
            temp: result.data.main.temp
          })

        });
    }).catch(

      _this.setState({
        location: 'Cannot get location.',
        temp: null
      })

    );
  }


  render() {
<<<<<<< HEAD

    return (
          <p className='weather'>{this.state.location} - {this.state.weather.main} - {(this.state.temp * (9/5) + 32).toFixed(0)} &#176;</p>
=======
    // let hr = new Date().getHours()
    // let tod = (hr >= 17) ? 'night' : 'day';

    return (
          <p className="weather">{this.state.location} - {this.state.weather.main} - {(this.state.temp * (9/5) + 32).toFixed(0)} &#176;</p>
>>>>>>> 07cd3c53a4f4faad8e2312bb62a40069cea3b34d
    );
  }
}

export default Weather
<<<<<<< HEAD
=======

// class SwitchFormat extends React.Component {
//
//   handleChange(e) {
//     this.props.changeFormat(e.target.value);
//   }
//
//   render() {
//     return <button value={this.props.format} onClick={this.handleChange.bind(this)}>Change format</button>;
//   }
// }
>>>>>>> 07cd3c53a4f4faad8e2312bb62a40069cea3b34d
