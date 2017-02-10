'use strict';

import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';

import {
  receiveDurations,
  tabSaveSettings
} from '../../action-creators/status';

const minute = 60 * 1000;

class Duration extends React.Component{
  constructor(props) {
    super(props);
    this.onChangeMinutes = this.onChangeMinutes.bind(this);
  }
  onChangeMinutes(e){
    let { name, value } = e.target;
    value = value * minute;

    let durations = Object.assign({}, this.props.status.durations)

    durations[`${name}Duration`] = value;

    // Because we have to alias our thunks I'm leaving this optmistic call
    // on the frontend, so as to prevent any lag between user input
    // and rerendering off the state. Maybe we can find an elegant way
    // to refactor this later on.
    this.props.receiveDurations(durations);
    this.props.tabSaveSettings(durations);
  }
  render(){
    const { durations } = this.props.status;
    return (
      <div>
        <p>
          Set in minutes the length of your work, break and lunch periods:
        </p>
        <FormGroup controlId="work-minutes">
          <ControlLabel className="settings-text">Work Minutes</ControlLabel>
          <FormControl type="number" value={durations.workDuration / minute} name="work" onChange={this.onChangeMinutes} />
        </FormGroup>
        <FormGroup controlId="break-minutes">
          <ControlLabel className="settings-text">Break Minutes</ControlLabel>
          <FormControl type="number" value={durations.breakDuration / minute} name="break" onChange={this.onChangeMinutes} />
        </FormGroup>
        <FormGroup controlId="lunch-minutes">
          <ControlLabel className="settings-text">Lunch Minutes</ControlLabel>
          <FormControl type="number" value={durations.lunchDuration / minute} name="lunch" onChange={this.onChangeMinutes} />
        </FormGroup>
      </div>
    );
  }
}

const mapState = ({ status }) => ({ status });
const mapDispatch = dispatch => ({
  tabSaveSettings:  () => (dispatch(tabSaveSettings())),
  receiveDurations:  duration => (dispatch(receiveDurations(duration)))
});

export default connect(mapState, mapDispatch)(Duration);
