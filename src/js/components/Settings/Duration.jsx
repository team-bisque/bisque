'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, Popover, Tooltip, OverlayTrigger } from 'react-bootstrap';

import {
  setSettingsAlias,
} from '../../action-creators/status';

const minute = 60 * 1000;

class Duration extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      saveInterval: null,
      workDuration: 5,
      breakDuration: 5,
      lunchDuration: 5,
      nuclear: false,
      key: '',
      validated: false
    };
    this.onChangeMinutes = this.onChangeMinutes.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.keyValidation = this.keyValidation.bind(this);
    this.toggleNuclear = this.toggleNuclear.bind(this);
  }

  componentDidMount() {
    this.setSettings(); // Copies user settings to local state
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

  keyValidation(e){
    let {value} = e.target;
    const key = 'GO NUCLEAR';
    const substring = key.substring(0, value.length);

    if (value === substring) this.setState({key: value});
    if (e.target.value === key) this.setState({validated: true});
  }

  saveSettings(){
    const { workDuration, breakDuration, lunchDuration, nuclear } = this.props.status.settings;
    let shouldSave = false;
    if (workDuration !== this.state.workDuration) shouldSave = true;
    if (breakDuration !== this.state.breakDuration) shouldSave = true;
    if (lunchDuration !== this.state.lunchDuration) shouldSave = true;
    if (nuclear !== this.state.nuclear) shouldSave = true;

    if (shouldSave){
      this.props.setSettingsAlias({
        workDuration: this.state.workDuration,
        breakDuration: this.state.breakDuration,
        lunchDuration: this.state.lunchDuration,
        nuclear: this.state.nuclear
      });
    }
  }

  toggleNuclear(e){
    if (this.state.nuclear) {
      this.setState({nuclear: false, key: ''});
    }
    else {
      this.setState({
        nuclear: true,
        validated: false,
        key: ''
      });
    }
    // WebRequest.unblock();
  }

  onChangeMinutes(e){
    const { name, value } = e.target;
    const data = {};
    data[name] = value * minute;
    this.setState(data);
  }

  render(){
    const { settings } = this.props.status;

    let { workDuration, breakDuration, lunchDuration, validated, nuclear } = this.state;
    workDuration = workDuration / minute;
    breakDuration = breakDuration / minute;
    lunchDuration = lunchDuration / minute;

    return (
      <div>
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


        <FormGroup style={{ 'margin-top': '30px'}}>
          <ControlLabel className="nuclear-text">
            {`The Nuclear Option`}
          </ControlLabel>
        <div className="block">
          {!nuclear ?
            <div>
              <div>Browser is NOT locked during work breaks</div>
              { !validated ?
                <div className="icon">
                  <OverlayTrigger placement="right" overlay={
                    (<Popover
                      id="popover-positioned-right popover-trigger-click"
                      title="The Nuclear Option">
                      If you’re feeling hopelessly under the command of your own computer, the Nuclear Option might be for you. While activated, the Nuclear Option will lock your browser from displaying anything other than the Bisque dashboard, until you’re supposed to resume working. Type “GO NUCLEAR” in the field below to activate the button. (And, yes, you can cheat the system, but that’s not really in keeping with the spirit of the Nuclear Option, now is it?)
                    </Popover>)
                    }>
                    <i className="fa fa-key"></i>
                  </OverlayTrigger>
                </div> :
               <div className="icon" onClick={this.toggleNuclear}>
                 <OverlayTrigger placement="bottom" overlay={<Tooltip id="unlock-tooltip">Turn on the Nuclear Option</Tooltip>}>
                   <i className="fa fa-bomb"></i>
                 </OverlayTrigger>
               </div>
              }
              <FormControl type="text" className={validated ? 'hide' : 'inline' } value={this.state.key} onChange={this.keyValidation} />
            </div> :
            <div>
              <div>The browser is locked during work breaks</div>
              <div className="icon" onClick={this.toggleNuclear}>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="unlock-tooltip">Turn off the Nuclear Option</Tooltip>}>
                  <i className="fa fa-unlock-alt"></i>
                </OverlayTrigger>
              </div>
            </div>
          }
        </div>
        </FormGroup>
      </div>
    );
  }
}

const mapState = ({ status }) => ({ status });
const mapDispatch = {setSettingsAlias};

export default connect(mapState, mapDispatch)(Duration);

export {Duration as TestableDuration};
