'use strict';
import React from 'react';
import { connect } from 'react-redux';
import SettingsModal from './SettingsModal';
import store from '../store';

// import { setRouteAlias } from '../action-creators/aliases';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);    
  }

  onClickClose(e){
    this.props.setRoute(null)
  }
  render() {  
    // console.log('setting',this.props)
    return (
      <div id="setting-modal" className="content">
        <div className="modal-bar">
          <div className="modal-title">Settings</div>
          <div>
            <i className="fa fa-times" onClick={this.onClickClose.bind(this)}></i>
          </div>
        </div>
        <SettingsModal {...this.props}/>
      </div>
    );   
  }
}

