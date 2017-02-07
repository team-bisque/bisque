'use strict';
import React from 'react';
import { connect } from 'react-redux';
import SettingsModal from './SettingsModal';
import store from '../store';

class Settings extends React.Component {
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
        <SettingsModal settings={this.props.settings}/>
      </div>
    );
  }
}

const mapState = ({settings}) => ({settings});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Settings);
