import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

// Components
import Login from './Login';
import Timer from './Timer';

class Popup extends React.Component {
  render() {
    const { status, auth } = this.props;

    const tooltip = {
      home: (<Tooltip id="home-tooltip">Home</Tooltip>)
    };

    return (
      <div id="popup"
        className="fullsizeBg"
        style={{ background: `url("http://i.imgur.com/CA9gCNx.jpg")`}}
        >
        <div id="home" className="icon top-right">
          <OverlayTrigger placement="bottom" overlay={tooltip.home}>
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
export {Popup as TestablePopup};
