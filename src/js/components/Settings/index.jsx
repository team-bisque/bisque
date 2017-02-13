'use strict';

import React from 'react';
import { Tabs, Tab, OverlayTrigger, Popover } from 'react-bootstrap';

import Duration from './Duration';
import Greylist from './Greylist';

const DurationHelp = (
  <Popover
    id="popover-positioned-right popover-trigger-click"
    title="Durations">
    Set in minutes the desired durations of your work, break and lunch periods. Cirillo’s Pomodoro Technique suggests 25 minutes for work broken up by 5 minute breaks, but feel free to set whatever length of time you like.
  </Popover>
  );

const GreylistHelp = (
  <Popover
    id="popover-positioned-right popover-trigger-click"
    title="Greylist">
    Add distracting websites you want to stay away from during your work periods, e.g. “facebook.com”. Bisque does not bar you from visiting these sites, but it will keep track of how often you visit them.
  </Popover>
  );

const DurationIcon = (
  <div>
    <OverlayTrigger placement="bottom" overlay={DurationHelp}>
      <div>
        <i className="fa fa-clock-o"></i>      
        <span>duration</span>
      </div>
    </OverlayTrigger>
    
  </div>
);

const GreylistIcon = (
  <div>
    <OverlayTrigger placement="bottom" overlay={GreylistHelp}>
      <div>
        <i className="fa fa-chain-broken"></i>     
        <span>greylist</span> 
      </div>
    </OverlayTrigger>    
    
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
