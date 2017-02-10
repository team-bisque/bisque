import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

// Components
import Login from './Login';
import Timer from './Timer';

let backgrounds = [
'http://i.imgur.com/cAkrTyU.jpg',
'http://i.imgur.com/kvhSMjC.jpg',
'http://i.imgur.com/KBWmaas.jpg',
'http://i.imgur.com/976n77H.jpg',
'http://i.imgur.com/H1Lb2Xv.jpg',
'http://i.imgur.com/CA9gCNx.jpg',
'http://i.imgur.com/aVcP3fF.jpg',
'http://i.imgur.com/Jnh77yl.jpg'
];

const random = Math.floor(Math.random() * (backgrounds.length - 1)) + 1;
const BackgroundCheck = require('../controllers/backgroundCheck');
const classNames = require('classnames');

class Popup extends React.Component {
  render() {
    const { status, auth } = this.props;

    const tooltip = {
      home: (<Tooltip id="home-tooltip">Home</Tooltip>)
    };

    return (
      <div id="popup">
        <div id="home" className="icon top-right">
          <OverlayTrigger placement="top" overlay={tooltip.home}>
            <i className="fa fa-home" onClick={(e)=>{chrome.tabs.create({})}}/>
          </OverlayTrigger>
        </div>
        <div className="flex-center">
          <div id="wrapper" className={null}>
          {
            !auth ?
            <Login /> : <Timer status={status} />
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => (state);

export default connect(mapState, null)(Popup);
