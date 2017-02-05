'use strict';

//CSS
require('../../css/settings-modal.css');

//Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Modal,
  Button,
  Grid,
  Row,
  Col,
  Tabs,
  Tab
} from 'react-bootstrap';

//Local
import store from '../store';
import SettingsDurationTab from './SettingsDurationTab';
import SettingsGreylistTab from './SettingsGreylistTab';
import {
  convertMillisecondsToMinutes,
  convertMinutesToMilliseconds
} from '../utils';
import {
  setWorkDuration,
  setBreakDuration,
  setLunchDuration,
  setStartTime
} from '../action-creators/settings';
import Greylist from '../controllers/Greylist';
const firebase = require('../controllers/firebase');




class SettingsModal extends Component {
  constructor(props) {
    super(props);
    const {
      workDuration,
      breakDuration,
      lunchDuration,
      shiftDuration,
      urlList
    } = props.settings;
    const workMinutes = convertMillisecondsToMinutes(workDuration);
    const breakMinutes = convertMillisecondsToMinutes(breakDuration);
    const lunchMinutes = convertMillisecondsToMinutes(lunchDuration);
    this.state = {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      urlList,
      currentUrl: '',
      modalShowing: false,
      notNumberWarning: false
    };
    this.saveEditUrl = this.saveEditUrl.bind(this);
    this.saveNewUrl = this.saveNewUrl.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newUrlHandleChange = this.newUrlHandleChange.bind(this);
    this.editUrlHandleChange = this.editUrlHandleChange.bind(this);
    this.workMinutesHandleChange = this.workMinutesHandleChange.bind(this);
    this.breakMinutesHandleChange = this.breakMinutesHandleChange.bind(this);
    this.lunchMinutesHandleChange = this.lunchMinutesHandleChange.bind(this);
  }

  componentDidMount() {
    const {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      urlList
    } = this.state;
    const workDuration = convertMinutesToMilliseconds(workMinutes);
    const breakDuration = convertMinutesToMilliseconds(breakMinutes);
    const lunchDuration = convertMinutesToMilliseconds(lunchMinutes);
    this.updateDuration(setWorkDuration, 'work', workDuration);
    this.updateDuration(setBreakDuration, 'break', breakDuration);
    this.updateDuration(setLunchDuration, 'lunch', lunchDuration);
  }

  updateDuration(actionCreator, timeCategory, duration) {
    const userId = store.getState().auth;

    // firebase.database().ref('users/' + userId).set({
    //   [timeCategory]: duration
    // })

    store.dispatch(actionCreator(duration));
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
      urlList
    } = this.state;
    const workDuration = convertMinutesToMilliseconds(workMinutes);
    const breakDuration = convertMinutesToMilliseconds(breakMinutes);
    const lunchDuration = convertMinutesToMilliseconds(lunchMinutes);
    this.updateDuration(setWorkDuration, 'work', workDuration);
    this.updateDuration(setBreakDuration, 'break', breakDuration);
    this.updateDuration(setLunchDuration, 'lunch', lunchDuration);
  }


  updateDuration(dispatcher, setting, time) {
    const userId = store.getState().auth.uid;

  newUrlHandleChange(event) {
    this.setState({currentUrl: event.target.value});
  }

  saveNewUrl() {
  }

workHoursHandleChange(event) {
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
      urlList,
      currentUrl,
      modalShowing,
      notNumberWarning
    } = this.state;

    const {
      showModal,
      hideModal,
      handleSubmit,
      workMinutesHandleChange,
      breakMinutesHandleChange,
      lunchMinutesHandleChange,
      newUrlHandleChange,
      editUrlHandleChange,
      saveNewUrl,
      saveEditUrl
    } = this;

    return (
      <div>
        <div>
          <center>
            <Button onClick={showModal}>
              <span className="glyphicon glyphicon-cog settings-icon"></span>
            </Button>
          </center>
        </div>
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
                  <SettingsDurationTab
                    workMinutes={workMinutes}
                    breakMinutes={breakMinutes}
                    lunchMinutes={lunchMinutes}
                    workMinutesHandleChange={workMinutesHandleChange}
                    breakMinutesHandleChange={breakMinutesHandleChange}
                    lunchMinutesHandleChange={lunchMinutesHandleChange}
                  />
                </Tab>
                <Tab eventKey={2} title="Greylist">
                  <SettingsGreylistTab
                    urlList={urlList}
                    currentUrl={currentUrl}
                    saveNewUrl={saveNewUrl}
                    saveEditUrl={saveEditUrl}
                    newUrlHandleChange={newUrlHandleChange}
                    editUrlHandleChange={editUrlHandleChange}
                  />
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <center><Button onClick={handleSubmit}>Change Settings</Button></center>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
};

const mapState = ({settings}) => ({settings})
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsModal);
