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
      </div>
    );
  }
}

const mapState = ({time}) => ({time});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Settings);
