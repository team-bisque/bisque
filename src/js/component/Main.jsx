import React from 'react';

import {connect} from 'react-redux';

// Components
import Commands from './Commands';
import Header from './Header';
import Status from './Status';
import Timer from './Timer';
import Weather from './Weather';
import { Modal, Button } from 'react-bootstrap';

require('../../css/main.css');

const bg = Math.floor(Math.random() * (8 - 1)) + 1;

const style = {
  background: {
    width: 100 + '%',
    height: 100 + 'vh',
    background: `url("wallpapers/${bg}.jpg") no-repeat center center fixed`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white'
  }
};

export class Main extends React.Component {

  constructor (props) {
    super(props)
  }
  
  render () {
    const {status, time, weather} = this.props;

    let workDuration;
    if (time) workDuration = time.workDuration;

    const options = {
      prefix: 'seconds elapsed!',
      delay: workDuration
    };

    return (
      <div className="row">
        <div style={style.background}>TOP
          <Weather weather={weather} />
          <Header status={status} />
          <Status status={status} />
          <Timer options={options}/>
          <Commands />
        </div>
        <div>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.openModal}
          >
            Launch demo modal
          </Button>
          <Modal
            show={status.isWorking}
            onHide={this.closeModal}
            container={this}
          >
            <Modal.Header closeButton>
              <Modal.Title>Productivity Check-in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Kapowza!</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        ,.</div>
      </div>
    )
  }
}

const mapState = (state) => (state);
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Main);
