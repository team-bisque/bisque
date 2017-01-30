import React, {Component} from 'react';
import { connect } from 'react-redux';

import {setWorkDuration, setBreakDuration} from '../reducers/time';

import store from '../store';



class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: '',
      minutes: '',
      seconds: '',
      invalidHours: false,
      invalidMinutes: false,
      invalidSeconds: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleSecondsChange = this.handleSecondsChange.bind(this);
  }

  componentWillMount() {

  }

  handleSubmit(event) {
    event.preventDefault();
    const {hours, minutes, seconds} = this.state;
    console.log(`hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}`);
  }

  handleHoursChange(event) {
    let hours = +event.target.value;
    const invalidHours = isNaN(hours);
    console.log(invalidHours);
    if (invalidHours) hours = '';
    this.setState({hours, invalidHours});
  }

  handleMinutesChange(event) {
    let minutes = +event.target.value;
    const invalidMinutes = isNaN(minutes);
    console.log(invalidMinutes);
    if (invalidMinutes) minutes = '';
    this.setState({minutes, invalidMinutes});
  }

  handleSecondsChange(event) {
    let seconds = +event.target.value;
    const invalidSeconds = isNaN(seconds);
    console.log(invalidSeconds);
    if (invalidSeconds) seconds = '';
    this.setState({seconds, invalidSeconds});
  }

  render() {
    const {
      hours,
      minutes,
      seconds,
      invalidHours,
      invalidMinutes,
      invalidSeconds
    } = this.state;
    console.log(minutes);
    return (
      <div className="row">
        <div className="row">
          <h3 className="col-xs-6">Work Time Duration</h3>
        </div>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <label className="col-xs-1">Hours</label>
            <div className="input-group col-xs-5">
              <input
                type="text"
                value={hours}
                className="form-control"
                id="hours"
                onChange={this.handleHoursChange}
              />
            </div>
            <label className="col-xs-1">Minutes</label>
            <div className="input-group col-xs-5">
              <input
                type="text"
                value={minutes}
                className="form-control"
                id="minutes"
                onChange={this.handleMinutesChange}
              />
            </div>
            <label className="col-xs-1">Seconds</label>
            <div className="input-group col-xs-5">
              <input
                type="text"
                value={seconds}
                className="form-control"
                id="seconds"
                onChange={this.handleSecondsChange}
              />
            </div>
            <div className="row input-group">
              <button type="submit" className="btn btn-primary col-xs-12">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

/*



*/

const mapState = ({time}) => ({time});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Settings);
