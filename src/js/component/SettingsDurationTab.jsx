'use strict';

//CSS
require('../../css/settings-modal.css');

//Libraries
import React from 'react';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

const SettingsDurationTab = (props) => {
  const {
    workMinutes,
    breakMinutes,
    lunchMinutes,
    workMinutesHandleChange,
    breakMinutesHandleChange,
    lunchMinutesHandleChange
  } = props;

  return (    
    <div>    
      <FormGroup controlId="work-minutes">
        <ControlLabel className="settings-text">Work Minutes</ControlLabel>
        <FormControl type="number" value={workMinutes || 0} onChange={workMinutesHandleChange} />
      </FormGroup>          
      <FormGroup controlId="break-minutes">
        <ControlLabel className="settings-text">Break Minutes</ControlLabel>
        <FormControl type="number" value={breakMinutes || 0} onChange={breakMinutesHandleChange} />
      </FormGroup>          
      <FormGroup controlId="lunch-minutes">
        <ControlLabel className="settings-text">Lunch Minutes</ControlLabel>
        <FormControl type="number" value={lunchMinutes || 0} onChange={lunchMinutesHandleChange} />
      </FormGroup>
      <p>
        Set duration of your work / break / lunch time in minute unit
      </p>
    </div>
  );
};

export default SettingsDurationTab;
