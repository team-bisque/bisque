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
  setWorkDurationInDb,
  setBreakDurationInDb,
  setLunchDurationInDb,
  saveSettingsInDb
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
      urlList
    } = props.settings;
    const workMinutes = convertMillisecondsToMinutes(workDuration);
    const breakMinutes = convertMillisecondsToMinutes(breakDuration);
    const lunchMinutes = convertMillisecondsToMinutes(lunchDuration);
    urlList.push('');
    this.state = {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      urlList
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeUrl = this.removeUrl.bind(this);
    this.saveNewUrl = this.saveNewUrl.bind(this);
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
    store.dispatch(setWorkDurationInDb(workDuration));
    store.dispatch(setBreakDurationInDb(breakDuration));
    store.dispatch(setLunchDurationInDb(lunchDuration));
    store.dispatch(saveSettingsInDb(urlList));
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      urlList
    } = this.state;
    const workDuration = convertMinutesToMilliseconds(workMinutes);
    const breakDuration = convertMinutesToMilliseconds(breakMinutes);
    const lunchDuration = convertMinutesToMilliseconds(lunchMinutes);
    store.dispatch(setWorkDurationInDb(workDuration));
    store.dispatch(setBreakDurationInDb(breakDuration));
    store.dispatch(setLunchDurationInDb(lunchDuration));
    store.dispatch(saveSettingsInDb(urlList));
  }

  editUrlHandleChange(event, indexToChange) {
    const {value} = event.target;
    const urlList = this.state.urlList.map((url, index) =>
      (index === indexToChange) ? value : url
    );
    this.setState({urlList});
    store.dispatch(saveSettingsInDb(urlList));
  }

  newUrlHandleChange(event) {
    const {urlList} = this.state;
    const currentUrl = event.target.value;
    urlList[urlList.length-1] = currentUrl;
    this.setState({urlList});
    store.dispatch(saveSettingsInDb(urlList));
  }

  saveNewUrl() {
    const {urlList} = this.state;
    urlList.push('');
    this.setState({urlList});
    console.log('URLLIST IN SAVENEWURL', urlList)
    store.dispatch(saveSettingsInDb(urlList));
  }

  removeUrl(event, indexToRemove) {
    console.log(indexToRemove);
    const urlList = this.state.urlList.filter((url, index) =>
      index !== indexToRemove
    );
    this.setState({urlList});
    store.dispatch(saveSettingsInDb(urlList));
  }

  workMinutesHandleChange(event) {
    const workMinutes = +event.target.value;
    this.setState({workMinutes});
    const workDuration = convertMinutesToMilliseconds(workMinutes);
    store.dispatch(setWorkDurationInDb(workDuration));
  }

  breakMinutesHandleChange(event) {
    const breakMinutes = +event.target.value;
    this.setState({breakMinutes});
    const breakDuration = convertMinutesToMilliseconds(breakMinutes);
    store.dispatch(setWorkDurationInDb(breakDuration));
  }

  lunchMinutesHandleChange(event) {
    const lunchMinutes = +event.target.value;
    this.setState({lunchMinutes});
    const lunchDuration = convertMinutesToMilliseconds(lunchMinutes);
    store.dispatch(setWorkDurationInDb(lunchDuration));
  }

  render() {
    const {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      urlList
    } = this.state;

    const {
      handleSubmit,
      workMinutesHandleChange,
      breakMinutesHandleChange,
      lunchMinutesHandleChange,
      newUrlHandleChange,
      editUrlHandleChange,
      saveNewUrl,
      removeUrl
    } = this;

    return (
      <div>
        <div className="modal-container">
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
                    saveNewUrl={saveNewUrl}
                    removeUrl={removeUrl}
                    newUrlHandleChange={newUrlHandleChange}
                    editUrlHandleChange={editUrlHandleChange}
                  />
                </Tab>
              </Tabs>
              <center><Button onClick={handleSubmit}>Change Settings</Button></center>
        </div>
      </div>
    );
  }
}

const mapState = ({settings}) => ({settings});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsModal);
