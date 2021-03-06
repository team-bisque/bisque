import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import Donut from './Donut';

import {
  addFiveMinutes,
  togglePause,
  toggleWorkAlias
} from '../../action-creators/status';

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickTogglePause(e){
    this.props.togglePause();
  }

  onClickToggleWork(e){
    this.props.toggleWorkAlias();
  }

  onClickAddFive(e){
    this.props.addFiveMinutes();
  }

  render(){
    const { status } = this.props;
    const min = status.timeRemaining / 60000;

    let message;
    if (status && status.isPaused) message = 'Timer is paused';
    if (status && !status.isPaused && status.isWorking) message = "You're at work";
    if (status && !status.isPaused && !status.isWorking) message = "You're on break";


    const tooltip = {
      fivemore: (<Tooltip id="fivemore-tooltip">Add <strong>5 more</strong> minutes!</Tooltip>),
      pause: (<Tooltip id="pause-tooltip">Pause</Tooltip>),
      play: (<Tooltip id="play-tooltip">Play</Tooltip>),
      break: (<Tooltip id="break-tooltip">I need a break!</Tooltip>),
      work: (<Tooltip id="work-tooltip">Work Work Work</Tooltip>)
    }

    return (
      <div className="timer-wrapper">
        <div className="timer-message">
          <span>{ message }</span>
        </div>

        <div className="timer">
          <div className="time">{ Math.abs(min) }</div>
          <span>{min > 0 ? 'minutes left' : 'minutes passed'}</span>
        </div>

        <div className="controller">
          { status && !status.isPaused ?
            <OverlayTrigger placement="bottom" overlay={tooltip.fivemore}>
              <i className="fa fa-history" onClick={this.onClickAddFive.bind(this)}></i>
            </OverlayTrigger> :
            null }
          { status && status.isPaused ?
            <OverlayTrigger placement="bottom" overlay={tooltip.play}>
              <i className="fa fa-play" onClick={this.onClickTogglePause.bind(this)}></i>
            </OverlayTrigger> :
            null }
          { status && !status.isPaused ?
            <OverlayTrigger placement="bottom" overlay={tooltip.pause}>
              <i className="fa fa-pause" onClick={this.onClickTogglePause.bind(this)}></i>
            </OverlayTrigger> :
            null }
          { status && !status.isPaused && !status.isWorking ?
            <OverlayTrigger placement="bottom" overlay={tooltip.work}>
              <i className="fa fa-suitcase" onClick={this.onClickToggleWork.bind(this)}></i>
            </OverlayTrigger> :
            null }
          { status && !status.isPaused && status.isWorking ?
            <OverlayTrigger placement="bottom" overlay={tooltip.break}>
              <i className="fa fa-beer" onClick={this.onClickToggleWork.bind(this)}></i>
            </OverlayTrigger> :
            null }
        </div>

        <Donut status={status} diameter={250} center={10}/>

      </div>
    );
  }
}

const mapState = ({ status }) => ({ status });
const mapDispatch = {
  addFiveMinutes, togglePause, toggleWorkAlias
};

export default connect(mapState, mapDispatch)(Timer);
export {Timer as TestableTimer};
