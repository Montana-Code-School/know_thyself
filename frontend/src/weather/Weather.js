import React, {Component} from 'react';
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

class Weather extends Component {
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
    getLocation().then(result => {
      let loc = result.data.city + ', ' + result.data.country;
      getWeather(loc).then(result => {
        this.setState({
          location: loc,
          weather: result.data.weather[0],
          temp: result.data.main.temp
        })
      });
    })
    .catch(
      this.setState({
        location: 'Cannot get location.',
        temp: null
      })
    );
  }

  render() {
    return (
      <p className="weather">{this.state.location} - {this.state.weather.main} - {(this.state.temp * (9/5) + 32).toFixed(0)} &#176;</p>
    );
  }
}

export default Weather
