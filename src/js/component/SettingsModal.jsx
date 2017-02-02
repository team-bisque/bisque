'use strict';

require('../../css/survey-modal.css');

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Modal,
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Tabs,
  Tab
} from 'react-bootstrap';
import store from '../store';
import {
  convertMillisecondsToMinutes,
  convertMinutesToMilliseconds
} from '../utils';
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
      lunchDuration,
    } = props.time;
    console.log("WORKDURATION", workDuration);
    const workMinutes = convertMillisecondsToMinutes(workDuration);
    console.log("WORKMINUTES AFTER CONSTRUCTOR CONVERSION", workMinutes);
    const breakMinutes = convertMillisecondsToMinutes(breakDuration);
    const lunchMinutes = convertMillisecondsToMinutes(lunchDuration);
    this.state = {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      modalShowing: true,
      notNumberWarning: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.workMinutesHandleChange = this.workMinutesHandleChange.bind(this);
    this.breakMinutesHandleChange = this.breakMinutesHandleChange.bind(this);
    this.lunchMinutesHandleChange = this.lunchMinutesHandleChange.bind(this);
  }

  componentDidMount() {
    this.showModal();
    const {
      workMinutes,
      breakMinutes,
      lunchMinutes
    } = this.state;
    console.log("WORKMINUTES", workMinutes);
    const workDuration = convertMinutesToMilliseconds(workMinutes);
    const breakDuration = convertMinutesToMilliseconds(breakMinutes);
    const lunchDuration = convertMinutesToMilliseconds(lunchMinutes);
    chrome.storage.sync.get({workDuration, breakDuration, lunchDuration}, (storage) => {
      const {workDuration, breakDuration, lunchDuration} = storage;
      store.dispatch(setWorkDuration(workDuration));
      store.dispatch(setBreakDuration(breakDuration));
      store.dispatch(setLunchDuration(lunchDuration));
      const workMinutes = convertMillisecondsToMinutes(workDuration);
      const breakMinutes = convertMillisecondsToMinutes(breakDuration);
      const lunchMinutes = convertMillisecondsToMinutes(lunchDuration);
      this.setState({
        workMinutes,
        breakMinutes,
        lunchMinutes,
      });
    });
  }

  showModal () {
    this.setState({modalShowing: true});
  }

  hideModal () {
    this.setState({modalShowing: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.hideModal();
    const {
      workMinutes,
      breakMinutes,
      lunchMinutes,
    } = this.state;
    const workDuration = convertMinutesToMilliseconds(workMinutes);
    const breakDuration = convertMinutesToMilliseconds(breakMinutes);
    const lunchDuration = convertMinutesToMilliseconds(lunchMinutes);
    store.dispatch(setWorkDuration(workDuration));
    store.dispatch(setBreakDuration(breakDuration));
    store.dispatch(setLunchDuration(lunchDuration));
    chrome.storage.sync.set({workDuration, breakDuration, lunchDuration}, () => {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
  }

  workMinutesHandleChange(event) {
    let workMinutes = +event.target.value;
    const notNumberWarning = isNaN(workMinutes);
    if (notNumberWarning) workMinutes = this.state.workMinutes;
    this.setState({workMinutes, notNumberWarning});
  }

  breakMinutesHandleChange(event) {
    let breakMinutes = +event.target.value;
    const notNumberWarning = isNaN(breakMinutes);
    if (notNumberWarning) breakMinutes = this.state.breakMinutes;
    this.setState({breakMinutes, notNumberWarning});
  }

  lunchMinutesHandleChange(event) {
    let lunchMinutes = +event.target.value;
    const notNumberWarning = isNaN(lunchMinutes);
    if (notNumberWarning) lunchMinutes = this.state.lunchMinutes;
    this.setState({lunchMinutes, notNumberWarning});
  }

  render() {
    const {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      modalShowing,
      notNumberWarning
    } = this.state;

    const {
      hideModal,
      handleSubmit,
      workMinutesHandleChange,
      breakMinutesHandleChange,
      lunchMinutesHandleChange
    } = this;

    return (
      <div className="modal-container">
        <Modal
          className="survey"
          show={modalShowing}
          onHide={hideModal}
          container={this}
        >
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey={1} id="settings-tabs">
              <Tab eventKey={1} title="Duration">
                <Grid fluid={true} className="survey-wrapper">
                  <Row className="statistics">
                    <Form inline>
                      <center>
                      <Row>
                      <FormGroup controlId="work-minutes">
                        <ControlLabel>Work Minutes</ControlLabel>
                        <FormControl type="number" value={workMinutes || 0} onChange={workMinutesHandleChange} />
                      </FormGroup>
                      </Row>
                      <Row>
                      <FormGroup controlId="break-minutes">
                        <ControlLabel>Break Minutes</ControlLabel>
                        <FormControl type="number" value={breakMinutes || 0} onChange={breakMinutesHandleChange} />
                      </FormGroup>
                      </Row>
                      <Row>
                      <FormGroup controlId="lunch-minutes">
                        <ControlLabel>Lunch Minutes</ControlLabel>
                        <FormControl type="number" value={lunchMinutes || 0} onChange={lunchMinutesHandleChange} />
                      </FormGroup>
                      </Row>
                      </center>
                    </Form>
                  </Row>
                </Grid>
              </Tab>
              <Tab eventKey={2} title="Greylist">Greylist Tab Content Goes Here</Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <center><Button onClick={handleSubmit}>Change Settings</Button></center>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapState = ({time}) => ({time});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Settings);
