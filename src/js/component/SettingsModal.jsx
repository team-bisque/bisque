'use strict';
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import SettingsDurationTab from './SettingsDurationTab';
import SettingsGreylistTab from './SettingsGreylistTab';

const DurationIcon = (
  <div>
    <i className="fa fa-clock-o"></i>
    <span>duration</span>
  </div>
);

const GreylistIcon = (
  <div>
    <i className="fa fa-chain-broken"></i>
    <span>greylist</span>
  </div>
);

export default function SettingsModal(props) {
  return (
      <div>       
        <Tabs defaultActiveKey={1} id="settings-tabs">
          <Tab eventKey={1} title={DurationIcon}>
            <SettingsDurationTab />
          </Tab>
          <Tab eventKey={2} title={GreylistIcon}>
            <SettingsGreylistTab />
          </Tab>
        </Tabs>
       </div>
    );
}
