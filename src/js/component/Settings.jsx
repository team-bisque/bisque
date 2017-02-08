'use strict';
import React from 'react';
import SettingsModal from './SettingsModal';

export default function Settings (props) {
    return (
      <div id="setting-modal" className="content">
        <div className="modal-bar">
          <div className="modal-title">Settings</div>
          <div>
            <i className="fa fa-times" onClick={(e) => props.setRoute(null)}></i>
          </div>
        </div>
        <SettingsModal />
      </div>
    );  
}

