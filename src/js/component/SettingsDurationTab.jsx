'use strict';

//CSS
require('../../css/settings-modal.css');

//Libraries
import React from 'react';
import {
  Button,
  Grid,
  Row,
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
      <Grid fluid={true} className="survey-wrapper">
        <Row className="statistics">
          <Form inline>
            <center>
            <Row>
            <FormGroup controlId="work-minutes">
              <ControlLabel className="settings-text">Work Minutes</ControlLabel>
              <FormControl type="number" value={workMinutes || 0} onChange={workMinutesHandleChange} />
            </FormGroup>
            </Row>
            <Row>
            <FormGroup controlId="break-minutes">
              <ControlLabel className="settings-text">Break Minutes</ControlLabel>
              <FormControl type="number" value={breakMinutes || 0} onChange={breakMinutesHandleChange} />
            </FormGroup>
            </Row>
            <Row>
            <FormGroup controlId="lunch-minutes">
              <ControlLabel className="settings-text">Lunch Minutes</ControlLabel>
              <FormControl type="number" value={lunchMinutes || 0} onChange={lunchMinutesHandleChange} />
            </FormGroup>
            </Row>
            </center>
          </Form>
        </Row>
      </Grid>
    </div>
  );
};

export default SettingsDurationTab;
