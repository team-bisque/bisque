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
    <Grid fluid={true}>
      <Row>
        <Col xs={12} md={10} mdOffset={1}>
          <Form>
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
          </Form>
        </Col>
        
      </Row>
    </Grid>
  );
};

export default SettingsDurationTab;
