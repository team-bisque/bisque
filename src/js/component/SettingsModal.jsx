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
import {saveSettings} from '../action-creators/settings';
import Greylist from '../controllers/Greylist';
const firebase = require('../controllers/firebase');


class SettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workMinutes: 0,
      breakMinutes: 0,
      lunchMinutes: 0,
      urlList: [],
      currentUrl: '',
      modalShowing: false
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newUrlHandleChange = this.newUrlHandleChange.bind(this);
    this.editUrlHandleChange = this.editUrlHandleChange.bind(this);
    this.saveNewUrl = this.saveNewUrl.bind(this);
    this.removeUrl = this.removeUrl.bind(this);
    this.workMinutesHandleChange = this.workMinutesHandleChange.bind(this);
    this.breakMinutesHandleChange = this.breakMinutesHandleChange.bind(this);
    this.lunchMinutesHandleChange = this.lunchMinutesHandleChange.bind(this);
  }

  componentDidMount() {
    const {
      workDuration,
      breakDuration,
      lunchDuration,
      urlList
    } = this.props.settings;
    const workMinutes = convertMillisecondsToMinutes(workDuration);
    const breakMinutes = convertMillisecondsToMinutes(breakDuration);
    const lunchMinutes = convertMillisecondsToMinutes(lunchDuration);
    this.setState({
      workMinutes,
      breakMinutes,
      lunchMinutes,
      urlList,
      currentUrl: '',
      modalShowing: false
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
      urlList
    } = this.state;
    const workDuration = convertMinutesToMilliseconds(workMinutes);
    const breakDuration = convertMinutesToMilliseconds(breakMinutes);
    const lunchDuration = convertMinutesToMilliseconds(lunchMinutes);
    store.dispatch(saveSettings({
      workDuration, breakDuration, lunchDuration, urlList
    }));
  }

  editUrlHandleChange(event, indexToChange) {
    const {value} = event.target;
    const urlList = this.state.urlList.map((url, index) =>
      (index === indexToChange) ? value : url
    );
    this.setState({urlList});
  }

  newUrlHandleChange(event) {
    this.setState({currentUrl: event.target.value});
  }

  saveNewUrl() {
    const {urlList, currentUrl} = this.state;
    urlList.push(currentUrl);
    this.setState({urlList, currentUrl: ''});
  }

  removeUrl(event, indexToRemove) {
    const urlList = this.state.urlList.filter((url, index) =>
      index !== indexToRemove
    );
    this.setState({urlList});
  }

  workMinutesHandleChange(event) {
    let workMinutes = +event.target.value;
    this.setState({workMinutes});
  }

  breakMinutesHandleChange(event) {
    let breakMinutes = +event.target.value;
    this.setState({breakMinutes});
  }

  lunchMinutesHandleChange(event) {
    let lunchMinutes = event.target.value;
    this.setState({lunchMinutes});
  }

  render() {
    const {
      workMinutes,
      breakMinutes,
      lunchMinutes,
      urlList,
      currentUrl,
      modalShowing
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
      removeUrl
    } = this;

    return (
      <div>
       
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
                    removeUrl={removeUrl}
                    newUrlHandleChange={newUrlHandleChange}
                    editUrlHandleChange={editUrlHandleChange}
                  />
                </Tab>
              </Tabs>
       </div>
    );
  }
}

const mapState = ({settings}) => ({settings});
const mapDispatch = null;

export default connect(mapState, mapDispatch)(SettingsModal);


// return (
//       <div>
//         <div>
//           <center>
//             <Button onClick={showModal}>
//               <span className="glyphicon glyphicon-cog settings-icon"></span>
//             </Button>
//           </center>
//         </div>
//         <div className="modal-container">
//           <Modal
//             className="survey"
//             show={modalShowing}
//             onHide={hideModal}
//             container={this}
//           >
//             <Modal.Header closeButton>
//               <Modal.Title>Settings</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Tabs defaultActiveKey={1} id="settings-tabs">
//                 <Tab eventKey={1} title="Duration">
//                   <SettingsDurationTab
//                     workMinutes={workMinutes}
//                     breakMinutes={breakMinutes}
//                     lunchMinutes={lunchMinutes}
//                     workMinutesHandleChange={workMinutesHandleChange}
//                     breakMinutesHandleChange={breakMinutesHandleChange}
//                     lunchMinutesHandleChange={lunchMinutesHandleChange}
//                   />
//                 </Tab>
//                 <Tab eventKey={2} title="Greylist">
//                   <SettingsGreylistTab
//                     urlList={urlList}
//                     currentUrl={currentUrl}
//                     saveNewUrl={saveNewUrl}
//                     removeUrl={removeUrl}
//                     newUrlHandleChange={newUrlHandleChange}
//                     editUrlHandleChange={editUrlHandleChange}
//                   />
//                 </Tab>
//               </Tabs>
//             </Modal.Body>
//             <Modal.Footer>
//               <center><Button onClick={handleSubmit}>Change Settings</Button></center>
//             </Modal.Footer>
//           </Modal>
//         </div>
//       </div>
//     );