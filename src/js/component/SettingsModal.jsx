'use strict';

//CSS
require('../../css/settings-modal.css');

//Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'react-bootstrap';

//Local
import SettingsDurationTab from './SettingsDurationTab';
import SettingsGreylistTab from './SettingsGreylistTab';
import Greylist from '../controllers/Greylist';


class SettingsModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Tabs defaultActiveKey={1} id="settings-tabs">
          <Tab eventKey={1} title="Duration">
            <SettingsDurationTab />
          </Tab>
          <Tab eventKey={2} title="Greylist">
            <SettingsGreylistTab />
          </Tab>
        </Tabs>
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
