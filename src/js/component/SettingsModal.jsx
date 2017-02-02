'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Modal,
  Button,
  Grid, Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

require('../../css/survey-modal.css');

import TimeInputForm from './TimeInputForm';
import store from '../store';
import {convertMillisecondsToHM, convertHMToMilliseconds} from '../utils';
import {
  setWorkDuration,
  setBreakDuration,
  setLunchDuration,
  setShiftDuration,
  setStartTime
} from '../action-creators/time';


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
      notNumberWarning: false
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
      shiftHours,
      shiftMinutes
    } = this.state;
    const workDuration = convertHMToMilliseconds(workHours, workMinutes);
    const breakDuration = convertHMToMilliseconds(breakHours, breakMinutes);
    const lunchDuration = convertHMToMilliseconds(lunchHours, lunchMinutes);
    const shiftDuration = convertHMToMilliseconds(shiftHours, shiftMinutes);
    store.dispatch(setWorkDuration(workDuration));
    store.dispatch(setBreakDuration(breakDuration));
    store.dispatch(setLunchDuration(lunchDuration));
    store.dispatch(setShiftDuration(shiftDuration));
    chrome.storage.sync.set({workDuration, breakDuration, lunchDuration, shiftDuration}, () => {
      if (chrome.runtime.error) {
        console.log("Runtime error.");
      }
    });
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
            <Modal.Title>What Time Blocks Work For You?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid fluid={true} className="survey-wrapper">
              <Row className="statistics">
                <Form inline>
                  <FormGroup controlId="formInlineName">
                    <ControlLabel>WorkHours</ControlLabel>
                    {' '}
                    <FormControl type="text" placeholder={workHours || 0} onChange={workHoursHandleChange} />
                  </FormGroup>
                  {' '}
                  <FormGroup controlId="formInlineName">
                    <ControlLabel>WorkMinutes</ControlLabel>
                    {' '}
                    <FormControl type="text" placeholder={workMinutes || 0} onChange={workMinutesHandleChange} />
                  </FormGroup>
                </Form>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>Change Schedule</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapState = ({time}) => ({time});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Settings);
