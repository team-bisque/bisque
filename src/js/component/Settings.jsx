'use strict';
import React from 'react';
import { connect } from 'react-redux';
// import SettingsModal from './SettingsModal';
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
    return (
      <div id="setting-modal">
        <div className="modal-bar">
          <div>
            <i className="fa fa-times" onClick={this.onClickClose.bind(this)}></i>
          </div>
        </div>
        {/*<SettingsModal {...this.props}/>*/}
      </div>
    );
  }
}

