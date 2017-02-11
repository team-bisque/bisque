'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel, Popover, OverlayTrigger } from 'react-bootstrap';

import {
  receiveDurations,
  tabSaveSettings,
  toggleNuclear
} from '../../action-creators/status';

const minute = 60 * 1000;

class Duration extends React.Component{
  constructor(props) {
    super(props);
    this.onChangeMinutes = this.onChangeMinutes.bind(this);
    this.onClickNuclear = this.onClickNuclear.bind(this);
  }
  onClickNuclear(e){
    this.props.toggleNuclear();
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
    const { durations, nuclear } = this.props.status;

    const popover = {
      durations: (
        <Popover
          id="popover-positioned-right popover-trigger-click"
          title="Durations">
          Set in minutes the desired durations of your work, break and lunch periods. Cirillo’s Pomodoro Technique suggests 25 minutes for work broken up by 5 minute breaks, but feel free to set whatever length of time you like.
        </Popover>
      ),
      nuclear: (
        <Popover
          id="popover-positioned-top popover-trigger-click"
          title="The Nuclear Option">
          If you’re feeling hopelessly under the command of your own computer, the Nuclear Option might be for you. When turned on, Bisque will lock your Chrome browser from displaying anything other than your Bisque dashboard, until you’re supposed to resume working. Use at your own risk. (And, yes, you can cheat the system, but that’s not really in keeping with the spirit of the Nuclear Option, now is it?)
        </Popover>
      )
    };


    let workDuration = durations.workDuration / minute;
    let breakDuration = durations.breakDuration / minute;
    let lunchDuration = durations.lunchDuration / minute;
    const trigger = ['hover', 'focus'];

    return (

      <div>
        <div id="help" className="icon">
          <OverlayTrigger trigger={trigger} placement="right" overlay={popover.durations}>
            <i className="fa fa-question-circle"/>
          </OverlayTrigger>
        </div>
        <FormGroup controlId="work-minutes">
          <ControlLabel className="settings-text">
            {`Work Minutes: ${workDuration}`}
          </ControlLabel>
          <FormControl type="range" min="5" max="90" step="5" value={workDuration} name="work" onChange={this.onChangeMinutes} />
          <ControlLabel className="settings-text">
            {`Break Minutes: ${breakDuration}`}
          </ControlLabel>
          <FormControl type="range" min="5" max="90" step="5" value={breakDuration} name="break" onChange={this.onChangeMinutes} />
          <ControlLabel className="settings-text">
            {`Lunch Minutes: ${lunchDuration}`}
          </ControlLabel>
          <FormControl type="range" min="5" max="90" step="5" value={lunchDuration} name="lunch" onChange={this.onChangeMinutes} />
        </FormGroup>
        <FormGroup controlId="nuclear">
          <ControlLabel className="settings-text">
            The Nuclear Option
          </ControlLabel>
          <OverlayTrigger trigger={trigger} placement="top" overlay={popover.nuclear}>
            <Button className={nuclear ? 'btn-danger' : 'btn-default'} style={{ 'margin-left': '10px'}} onClick={this.onClickNuclear}>
              <i className="fa fa-bomb" />
            </Button>
          </OverlayTrigger>
        </FormGroup>
      </div>
    );
  }
}

const mapState = ({ status }) => ({ status });
const mapDispatch = dispatch => ({
  tabSaveSettings:  () => (dispatch(tabSaveSettings())),
  receiveDurations:  duration => (dispatch(receiveDurations(duration))),
  toggleNuclear: () => (dispatch(toggleNuclear()))
});

export default connect(mapState, mapDispatch)(Duration);
