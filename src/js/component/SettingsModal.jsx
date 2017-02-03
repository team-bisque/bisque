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


class Settings extends Component {
  constructor(props) {
    super(props);
    const {
      workDuration,
      breakDuration,
      lunchDuration,
      shiftDuration
    } = props.settings;
    const greyList = new Greylist();
    const workMinutes = convertMillisecondsToMinutes(workDuration);
    const breakMinutes = convertMillisecondsToMinutes(breakDuration);
    const lunchMinutes = convertMillisecondsToMinutes(lunchDuration);
    this.state = {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      greyList,
      modalShowing: false,
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
    const {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      greyList
    } = this.state;
    const workDuration = convertMinutesToMilliseconds(workMinutes);
    const breakDuration = convertMinutesToMilliseconds(breakMinutes);
    const lunchDuration = convertMinutesToMilliseconds(lunchMinutes);
    chrome.storage.sync.get({workDuration, breakDuration, lunchDuration, greyList}, (storage) => {
      const {workDuration, breakDuration, lunchDuration, greyList} = storage;
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
    this.updateDuration(setWorkDuration, 'work', workDuration);
    this.updateDuration(setBreakDuration, 'break', breakDuration);
    this.updateDuration(setLunchDuration, 'lunch', lunchDuration);
  }

  updateDuration(actionCreator, timeCategory, duration) {
    const userId = store.getState().auth;

    firebase.database().ref('users/' + userId).set({
      [timeCategory]: duration
    })

    store.dispatch(actionCreator(duration));
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
      greyList,
      modalShowing,
      notNumberWarning
    } = this.state;

    const {listUrls} = greyList;

    const {
      showModal,
      hideModal,
      handleSubmit,
      workMinutesHandleChange,
      breakMinutesHandleChange,
      lunchMinutesHandleChange
    } = this;

    return (
      <div>
        <div>
          <center>
            <button onClick={showModal}>
              <span className="glyphicon glyphicon-cog settings-icon"></span>
            </button>
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
                  <SettingsGreylistTab listUrls={listUrls}/>
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
}

const mapState = ({settings}) => ({settings});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Settings);
