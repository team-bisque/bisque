<<<<<<< HEAD
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import TimeInputForm from './TimeInputForm';
import store from '../store';
import {convertMillisecondsToHM, convertHMToMilliseconds} from '../utils';
import {
  setWorkDuration,
  setBreakDuration,
  setLunchDuration,
  setStartTime
} from '../action-creators/time';



class Settings extends Component {
  constructor(props) {
    super(props);
    const {
      workDuration,
      breakDuration,
      lunchDuration
    } = props.time;
    const workTimeObject = convertMillisecondsToHM(workDuration);
    const workHours = workTimeObject.hours;
    const workMinutes = workTimeObject.minutes;
    const breakTimeObject = convertMillisecondsToHM(breakDuration);
    const breakHours = breakTimeObject.hours;
    const breakMinutes = breakTimeObject.minutes;
    const lunchTimeObject = convertMillisecondsToHM(lunchDuration);
    const lunchHours = lunchTimeObject.hours;
    const lunchMinutes = lunchTimeObject.minutes;
    this.state = {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes,
      invalidTimeDataType: false
    };
    this.lunchHandleSubmit = this.lunchHandleSubmit.bind(this);
    this.workHoursHandleChange = this.workHoursHandleChange.bind(this);
    this.workMinutesHandleChange = this.workMinutesHandleChange.bind(this);
    this.breakHoursHandleChange = this.breakHoursHandleChange.bind(this);
    this.breakMinutesHandleChange = this.breakMinutesHandleChange.bind(this);
    this.lunchHoursHandleChange = this.lunchHoursHandleChange.bind(this);
    this.lunchMinutesHandleChange = this.lunchMinutesHandleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes
    } = this.state;
    const workMilliseconds = convertHMToMilliseconds(workHours, workMinutes);
    const breakMilliseconds = convertHMToMilliseconds(breakHours, breakMinutes);
    const lunchMilliseconds = convertHMToMilliseconds(lunchHours, lunchMinutes);
    store.dispatch(setWorkDuration(workMilliseconds));
    store.dispatch(setBreakDuration(breakMilliseconds));
    store.dispatch(setLunchDuration(lunchMilliseconds));
  }

  workHoursHandleChange(event) {
    let workHours = +event.target.value;
    const notNumberWarning = isNaN(workHours);
    if (notNumberWarning) workHours = this.state.workHours;
    this.setState({workHours, notNumberWarning});
  }

  workMinutesHandleChange(event) {
    let workMinutes = +event.target.value;
    const notNumberWarning = isNaN(workMinutes);
    if (notNumberWarning) workMinutes = this.state.workMinutes;
    this.setState({workMinutes, notNumberWarning});
  }

  breakHoursHandleChange(event) {
    let breakHours = +event.target.value;
    const notNumberWarning = isNaN(breakHours);
    if (notNumberWarning) breakHours = this.state.breakHours;
    this.setState({breakHours, notNumberWarning});
  }

  breakMinutesHandleChange(event) {
    let breakMinutes = +event.target.value;
    const notNumberWarning = isNaN(breakMinutes);
    if (notNumberWarning) breakMinutes = this.state.breakMinutes;
    this.setState({breakMinutes, notNumberWarning});
  }

  lunchHoursHandleChange(event) {
    let lunchHours = +event.target.value;
    const notNumberWarning = isNaN(lunchHours);
    if (notNumberWarning) lunchHours = this.state.lunchHours;
    this.setState({lunchHours, notNumberWarning});
  }

  lunchMinutesHandleChange(event) {
    let lunchMinutes = +event.target.value;
    const notNumberWarning = isNaN(lunchMinutes);
    if (notNumberWarning) lunchMinutes = this.state.lunchMinutes;
    this.setState({lunchMinutes, notNumberWarning});
  }

  render() {
    const {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes,
      notNumberWarning,
    } = this.state;
    const {
      workHoursHandleChange,
      workMinutesHandleChange,
      breakHoursHandleChange,
      breakMinutesHandleChange,
      lunchHoursHandleChange,
      lunchMinutesHandleChange,
      handleSubmit
    } = this;
    return (
      <div className="row">
        <form onSubmit={handleSubmit}>
          <TimeInputForm
            category={'Work'}
            hours={workHours}
            minutes={workMinutes}
            hoursHandleChange={workHoursHandleChange}
            minutesHandleChange={workMinutesHandleChange}
          />
          <TimeInputForm
            category={'Break'}
            hours={breakHours}
            minutes={breakMinutes}
            hoursHandleChange={breakHoursHandleChange}
            minutesHandleChange={breakMinutesHandleChange}
          />
          <TimeInputForm
            category={'Lunch'}
            hours={lunchHours}
            minutes={lunchMinutes}
            hoursHandleChange={lunchHoursHandleChange}
            minutesHandleChange={lunchMinutesHandleChange}
          />
          {notNumberWarning ? (<h3>Numbers only, please!</h3>) : <h3 className="col-xs-1"></h3>}
          <button type="submit" className="btn btn-primary">Change Schedule</button>
        </form>
=======
import React, {Component} from 'react';
import { connect } from 'react-redux';

import {setWorkDuration, setBreakDuration} from '../reducers/time';

import store from '../store';



export default class Settings extends Component {
  constructor() {
    console.log(this.props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
  }

  handleSubmit() {
    event.preventDefault();
    const state = getState();
    console.log(`Submitted!`, state);
  }

  handleHourChange(event) {
    event.preventDefault();
  }

  handleMinuteChange(event) {
    event.preventDefault();
    console.log(+event.target.value);
  }

  render() {
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
                className="form-control"
                id="hours"
                onChange={this.handleHourChange}
              />
            </div>
            <label className="col-xs-1">Minutes</label>
            <div className="input-group col-xs-5">
              <input
                type="text"
                className="form-control"
                id="minutes"
                onChange={this.handleMinuteChange}
              />
            </div>
            <div className="row input-group">
              <button type="submit" className="btn btn-primary col-xs-12">Submit</button>
            </div>
          </form>
        </div>
>>>>>>> d8f898eebe9088348acc314cb051ad9baabf9344
      </div>
    );
  }
}

<<<<<<< HEAD
const mapState = ({time}) => ({time});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Settings);
=======
>>>>>>> d8f898eebe9088348acc314cb051ad9baabf9344
