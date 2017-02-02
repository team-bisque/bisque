'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Modal,
  Button,
  Grid,
  Row,
  Col,
  Form,
  Tabs,
  Tab
} from 'react-bootstrap';

require('../../css/survey-modal.css');

import DurationInputGroup from './DurationInputGroup';
import store from '../store';
import {convertMillisecondsToHM, convertHMToMilliseconds} from '../utils';
import {
  setWorkDuration,
  setBreakDuration,
  setLunchDuration,
  setShiftDuration,
  setStartTime
} from '../action-creators/time';

const firebase = require('../controllers/firebase');

class Settings extends Component {
  constructor(props) {
    super(props);
    const {
      workDuration,
      breakDuration,
      lunchDuration,
      shiftDuration
    } = props.time;
    const workTimeObject = convertMillisecondsToHM(workDuration);
    const workHours = workTimeObject.hours;
    const workMinutes = workTimeObject.minutes;
    const breakTimeObject = convertMillisecondsToHM(breakDuration);
    const breakHours = breakTimeObject.hours;
    const breakMinutes = breakTimeObject.minutes;
    const lunchTimeObject = convertMillisecondsToHM(lunchDuration);
    const lunchHours = lunchTimeObject.hours;
    const lunchMinutes = lunchTimeObject.minutes;
    const shiftTimeObject = convertMillisecondsToHM(shiftDuration);
    const shiftHours = shiftTimeObject.hours;
    const shiftMinutes = shiftTimeObject.minutes;
    this.state = {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes,
      shiftHours,
      shiftMinutes,
      modalShowing: true,
      notNumberWarning: false,
      tabKey: 1
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.workHoursHandleChange = this.workHoursHandleChange.bind(this);
    this.workMinutesHandleChange = this.workMinutesHandleChange.bind(this);
    this.breakHoursHandleChange = this.breakHoursHandleChange.bind(this);
    this.breakMinutesHandleChange = this.breakMinutesHandleChange.bind(this);
    this.lunchHoursHandleChange = this.lunchHoursHandleChange.bind(this);
    this.lunchMinutesHandleChange = this.lunchMinutesHandleChange.bind(this);
    this.shiftHoursHandleChange = this.shiftHoursHandleChange.bind(this);
    this.shiftMinutesHandleChange = this.shiftMinutesHandleChange.bind(this);
  }

  componentDidMount() {
    this.showModal();
    const {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes,
      shiftHours,
      shiftMinutes
    } = this.state;
    const workDuration = convertHMToMilliseconds(workHours, workMinutes);
    const breakDuration = convertHMToMilliseconds(breakHours, breakMinutes);
    const lunchDuration = convertHMToMilliseconds(lunchHours, lunchMinutes);
    const shiftDuration = convertHMToMilliseconds(shiftHours, shiftMinutes);
    chrome.storage.sync.get({workDuration, breakDuration, lunchDuration, shiftDuration}, (storage) => {
      const {workDuration, breakDuration, lunchDuration, shiftDuration} = storage;
      store.dispatch(setWorkDuration(workDuration));
      store.dispatch(setBreakDuration(breakDuration));
      store.dispatch(setLunchDuration(lunchDuration));
      store.dispatch(setShiftDuration(shiftDuration));
      const workTimeObject = convertMillisecondsToHM(workDuration);
      const workHours = workTimeObject.hours;
      const workMinutes = workTimeObject.minutes;
      const breakTimeObject = convertMillisecondsToHM(breakDuration);
      const breakHours = breakTimeObject.hours;
      const breakMinutes = breakTimeObject.minutes;
      const lunchTimeObject = convertMillisecondsToHM(lunchDuration);
      const lunchHours = lunchTimeObject.hours;
      const lunchMinutes = lunchTimeObject.minutes;
      const shiftTimeObject = convertMillisecondsToHM(shiftDuration);
      const shiftHours = shiftTimeObject.hours;
      const shiftMinutes = shiftTimeObject.minutes;
      this.setState({
        workHours,
        workMinutes,
        breakHours,
        breakMinutes,
        lunchHours,
        lunchMinutes,
        shiftHours,
        shiftMinutes
      });
    });
  }

  showModal () {
    this.setState({modalShowing: true});
  }

  hideModal () {
    this.setState({modalShowing: false});
  }

  handleSelect(tabKey) {
    this.setState({tabKey});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.hideModal();
    const {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes,
    } = this.state;
    const workDuration = convertHMToMilliseconds(workHours, workMinutes);
    const breakDuration = convertHMToMilliseconds(breakHours, breakMinutes);
    const lunchDuration = convertHMToMilliseconds(lunchHours, lunchMinutes);
    this.updateDuration(setWorkDuration(workDuration))
    this.updateDuration(setBreakDuration(breakDuration))
    this.updateDuration(setLunchDuration(lunchDuration))
    store.dispatch(setWorkDuration(workDuration));
    store.dispatch(setBreakDuration(breakDuration));
    store.dispatch(setLunchDuration(lunchDuration));
  }

  updateDuration(dispatcher, setting, time) {
    const userId = store.getState().auth;

    firebase.database().ref('users/' + userId).set({
      [setting]: time
    })

    store.dispatch(dispatcher(setting));
  }

  workHoursHandleChange(event) {
    console.log(event);
    let workHours = +event.target.value;
    const notNumberWarning = isNaN(workHours);
    if (notNumberWarning) workHours = this.state.workHours;
    this.setState({workHours, notNumberWarning});
  }

  workMinutesHandleChange(event) {
    let workMinutes = +event.target.value;
    const notNumberWarning = isNaN(workMinutes);
    if (notNumberWarning) workMinutes = this.state.workMinutes;
    this.setState({workMinutes, notNumberWarning});
  }

  breakHoursHandleChange(event) {
    let breakHours = +event.target.value;
    const notNumberWarning = isNaN(breakHours);
    if (notNumberWarning) breakHours = this.state.breakHours;
    this.setState({breakHours, notNumberWarning});
  }

  breakMinutesHandleChange(event) {
    let breakMinutes = +event.target.value;
    const notNumberWarning = isNaN(breakMinutes);
    if (notNumberWarning) breakMinutes = this.state.breakMinutes;
    this.setState({breakMinutes, notNumberWarning});
  }

  lunchHoursHandleChange(event) {
    let lunchHours = +event.target.value;
    const notNumberWarning = isNaN(lunchHours);
    if (notNumberWarning) lunchHours = this.state.lunchHours;
    this.setState({lunchHours, notNumberWarning});
  }

  lunchMinutesHandleChange(event) {
    let lunchMinutes = +event.target.value;
    const notNumberWarning = isNaN(lunchMinutes);
    if (notNumberWarning) lunchMinutes = this.state.lunchMinutes;
    this.setState({lunchMinutes, notNumberWarning});
  }

  shiftHoursHandleChange(event) {
    let shiftHours = +event.target.value;
    const notNumberWarning = isNaN(shiftHours);
    if (notNumberWarning) shiftHours = this.state.shiftHours;
    this.setState({shiftHours, notNumberWarning});
  }

  shiftMinutesHandleChange(event) {
    let shiftMinutes = +event.target.value;
    const notNumberWarning = isNaN(shiftMinutes);
    if (notNumberWarning) shiftMinutes = this.state.shiftMinutes;
    this.setState({shiftMinutes, notNumberWarning});
  }

  render() {
    const {
      workHours,
      workMinutes,
      breakHours,
      breakMinutes,
      lunchHours,
      lunchMinutes,
      shiftHours,
      shiftMinutes,
      modalShowing,
      notNumberWarning
    } = this.state;

    const {
      hideModal,
      handleSubmit,
      workHoursHandleChange,
      workMinutesHandleChange,
      breakHoursHandleChange,
      breakMinutesHandleChange,
      lunchHoursHandleChange,
      lunchMinutesHandleChange,
      shiftHoursHandleChange,
      shiftMinutesHandleChange
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
            <Tabs defaultActiveKey={2}>
              <Tab eventKey={1} title="Duration">
                <Grid fluid={true} className="survey-wrapper">
                  <Row className="statistics">
                    <Form inline>
                      <Col xs={12} md={6}>
                        <DurationInputGroup
                          hours={workHours}
                          minutes={workMinutes}
                          hoursHandleChange={workHoursHandleChange}
                          minutesHandleChange={workMinutesHandleChange}
                          category={'Work'}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <DurationInputGroup
                          hours={breakHours}
                          minutes={breakMinutes}
                          hoursHandleChange={breakHoursHandleChange}
                          minutesHandleChange={breakMinutesHandleChange}
                          category={'Break'}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <DurationInputGroup
                          hours={lunchHours}
                          minutes={lunchMinutes}
                          hoursHandleChange={lunchHoursHandleChange}
                          minutesHandleChange={lunchMinutesHandleChange}
                          category={'Lunch'}
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <DurationInputGroup
                          hours={shiftHours}
                          minutes={shiftMinutes}
                          hoursHandleChange={shiftHoursHandleChange}
                          minutesHandleChange={shiftMinutesHandleChange}
                          category={'Shift'}
                        />
                      </Col>
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
