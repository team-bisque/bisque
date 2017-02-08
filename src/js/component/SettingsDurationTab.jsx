'use strict';

import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setWorkDuration, setBreakDuration, setLunchDuration } from '../action-creators/settings';

class SettingsDurationTab extends React.Component{
  constructor(props) {
    super(props);  
    this.onChangeMinutes = this.onChangeMinutes.bind(this)
  }
  onChangeMinutes(e){
    const { name, value } = e.target;
    if(name === 'work') this.props.setWorkDuration(value * 60000);
    else if(name === 'break') this.props.setBreakDuration(value * 60000)
    else if(name === 'lunch') this.props.setLunchDuration(value * 60000)
  }
  render(){
    const { workDuration, breakDuration, lunchDuration } = this.props.settings;
    return (    
      <div>
        <FormGroup controlId="work-minutes">
          <ControlLabel className="settings-text">Work Minutes</ControlLabel>
          <FormControl type="number" value={workDuration / 60000} name="work" onChange={this.onChangeMinutes} />
        </FormGroup>          
        <FormGroup controlId="break-minutes">
          <ControlLabel className="settings-text">Break Minutes</ControlLabel>
          <FormControl type="number" value={breakDuration / 60000} name="break" onChange={this.onChangeMinutes} />
        </FormGroup>          
        <FormGroup controlId="lunch-minutes">
          <ControlLabel className="settings-text">Lunch Minutes</ControlLabel>
          <FormControl type="number" value={lunchDuration / 60000} name="lunch" onChange={this.onChangeMinutes} />
        </FormGroup>
        <p>
          Set duration of your work / break / lunch time in minute unit
        </p>
      </div>
    );  
  }
  
};

const mapState = ({ settings }) => ({ settings });
const mapDispatch = dispatch => ({
  setWorkDuration:  duration => (dispatch(setWorkDuration(duration))),
  setBreakDuration: duration => (dispatch(setBreakDuration(duration))),
  setLunchDuration: duration => (dispatch(setLunchDuration(duration)))
});

export default connect(mapState, mapDispatch)(SettingsDurationTab);