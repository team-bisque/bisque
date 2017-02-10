'use strict';

import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Duration from './Duration';
import Greylist from './Greylist';

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

export default function Settings (props) {
    return (
      <div id="setting-modal" className="content">
        <div className="modal-bar">
          <div className="modal-title">Settings</div>
          <div>
            <i className="fa fa-times" onClick={(e) => props.setRoute(null)}></i>
          </div>
        </div>
        <div>
          <Tabs defaultActiveKey={1} id="settings-tabs">
            <Tab eventKey={1} title={DurationIcon}>
              <Duration />
            </Tab>
            <Tab eventKey={2} title={GreylistIcon}>
              <Greylist />
            </Tab>
          </Tabs>
         </div>
      </div>
    );
}
