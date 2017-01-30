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
      </div>
    );
  }
}

