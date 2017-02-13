'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl, ControlLabel, Popover, OverlayTrigger } from 'react-bootstrap';


import {
  // receiveSettings,
  setSettingsAlias,
  toggleNuclear
} from '../../action-creators/status';

const minute = 60 * 1000;

class Duration extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      saveInterval: null,
      workDuration: 0,
      breakDuration: 0,
      lunchDuration: 0,
      blockGreylist: false,
      nuclear: '',
      validated: this.props.status.settings.nuclear || false
    };
    this.onChangeMinutes = this.onChangeMinutes.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.nuclearValidation = this.nuclearValidation.bind(this);
  }

  componentDidMount() {
    this.setSettings();  
    this.setSaveInterval();  
  }

  componentWillUnmount() {
    this.saveSettings();
    clearInterval(this.state.saveInterval);
  }
  setSaveInterval(){
    let saveInterval  = setInterval(this.saveSettings, 3000);
    this.setState({saveInterval: saveInterval});
  }
  setSettings(){
    const { workDuration, breakDuration, lunchDuration, blockGreylist } = this.props.status.settings;
    
    this.setState({
      workDuration: workDuration,
      breakDuration: breakDuration,
      lunchDuration: lunchDuration,
      blockGreylist: blockGreylist
    });    
  }
  nuclearValidation(e){
    let {value} = e.target;
    const key = 'GO NUCLEAR';
    const substring = key.substring(0, value.length);

    if (value === substring) this.setState({nuclear: value});
    if (value === key) this.setState({validated: true});
  }

  saveSettings(){  
    const { workDuration, breakDuration, lunchDuration, blockGreylist } = this.props.status.settings;
    let shouldSave = false;
    if(workDuration !== this.state.workDuration) shouldSave = true;
    if(breakDuration !== this.state.breakDuration) shouldSave = true;
    if(lunchDuration !== this.state.lunchDuration) shouldSave = true;
    if(blockGreylist !== this.state.blockGreylist) shouldSave = true;

    if(shouldSave){
      this.props.setSettingsAlias({
        workDuration: this.state.workDuration,
        breakDuration: this.state.breakDuration,
        lunchDuration: this.state.lunchDuration,
        blockGreylist: this.state.blockGreylist
      });  
    }    
  }

  onChangeMinutes(e){
    let { name, value } = e.target;  
    let data = {};
    data[name] = value * minute;
    this.setState(data);
  }
  render(){
    const { settings } = this.props.status;

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
          If you’re feeling hopelessly under the command of your own computer, the Nuclear Option might be for you. When turned on, Bisque will lock your Chrome browser from displaying anything other than your Bisque dashboard, until you’re supposed to resume working. Type “GO NUCLEAR” in the adjacent form to activate the button. (And, yes, you can cheat the system, but that’s not really in keeping with the spirit of the Nuclear Option, now is it?)
        </Popover>
      )
    };


    
    // let nuclear = durations.nuclear;
    const trigger = ['hover', 'focus'];
    let { workDuration, breakDuration, lunchDuration, nuclear, validated } = this.state;        
    workDuration = workDuration / minute; 
    breakDuration = breakDuration / minute;
    lunchDuration = lunchDuration / minute;

    return (
      <div>
        <FormGroup controlId="duration">
          <ControlLabel className="settings-text">
            Durations settings
          </ControlLabel>
          <div id="help" className="icon">
            <OverlayTrigger trigger={trigger} className="inline" overlay={popover.durations}>
              <i className="fa fa-question-circle"/>
            </OverlayTrigger>
          </div>

          <FormGroup className="progressbar">
            <ControlLabel className="settings-text">
              {`Work Minutes: ${workDuration}`}
            </ControlLabel>
            <div className="rangeslider" data-value={workDuration}>
              <FormControl type="range" min="5" max="90" step="5" value={workDuration} name="workDuration" onChange={this.onChangeMinutes} />
              <div className="value">{workDuration}</div>
            </div>
          </FormGroup>
          
          <FormGroup className="progressbar">
            <ControlLabel className="settings-text">
              {`Break Minutes: ${breakDuration}`}
            </ControlLabel>
            <div className="rangeslider">
              <FormControl type="range" min="5" max="90" step="5" value={breakDuration} name="breakDuration" onChange={this.onChangeMinutes} />
              <div className="value" style={{
                left: `${breakDuration}%`
              }}>{breakDuration}</div>
            </div>            
          </FormGroup>

          <FormGroup className="progressbar">
            <ControlLabel className="settings-text">
              {`Lunch Minutes: ${lunchDuration}`}
            </ControlLabel>
            <div className="rangeslider">
              <FormControl type="range" min="5" max="90" step="5" value={lunchDuration} name="lunchDuration" onChange={this.onChangeMinutes} />
              <div className="value" style={{
                left: `${lunchDuration}%`
              }}>{lunchDuration}</div>
            </div>            
          </FormGroup>
        </FormGroup>

        <FormGroup controlId="nuclear">
          <ControlLabel className="settings-text">
            The Nuclear Option
          </ControlLabel>

          <div>
            <FormControl type="text" value={this.state.nuclear} name="nuclear-validation" className="inline" onChange={this.nuclearValidation} />
            <div className="icon">
              <OverlayTrigger trigger={trigger} placement="top" overlay={popover.nuclear}>
                <i className="fa fa-question-circle pull-right" />
              </OverlayTrigger>
            </div>
          </div>

          <Button
            style={{ marginTop: '10px', paddingLeft: '10%', paddingRight: '10%' }}
            name="nuclear"
            onClick={this.onChangeMinutes}
            disabled={!this.state.validated}>
            { nuclear ?
              'Turn off the Nuclear Option'
              : 'I understand, go Nuclear'}
          </Button>

        </FormGroup>
      </div>
    );
  }
}

const mapState = ({ status }) => ({ status });
const mapDispatch = {setSettingsAlias};

export default connect(mapState, mapDispatch)(Duration);
