'use strict';
//Libraries
import React from 'react';
// import {connect} from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import SettingsDurationTab from './SettingsDurationTab';
import SettingsGreylistTab from './SettingsGreylistTab';

// const firebase = require('../controllers/firebase');


const DurationIcon = (
  <div id="duration-tab">
    <i className="fa fa-clock-o"></i>
    <span>duration</span>
  </div>
)
const GreylistIcon = (
  <div id="greylist-tab">
    <i className="fa fa-chain-broken"></i>
    <span>greylist</span>
  </div>
)
export default function SettingsModal(props) {
  return (
      <div>       
        <Tabs defaultActiveKey={1} id="settings-tabs">
          <Tab eventKey={1} title={DurationIcon}>
            <SettingsDurationTab settings={props.settings} />
          </Tab>
          <Tab eventKey={2} title={GreylistIcon}>
            <SettingsGreylistTab settings={props.settings} />
          </Tab>
        </Tabs>
       </div>
    );
}
