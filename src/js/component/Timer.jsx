import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addFiveMinutes, togglePause, toggleWork } from '../action-creators/status';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Donut from './graphs/Donut';

class Timer extends React.Component {
  constructor(props) {
    super(props);    
  }  

  onClickTogglePause(e){
    this.props.togglePause();
  }

  onClickToggleWork(e){
    this.props.toggleWork();
  }

  onClickAddFive(e){
    this.props.addFiveMinutes();
  }

  render(){
    console.log('Timer',this.props)
    const { status } = this.props;  
    const min = status.timeRemaining / 60000;

    // function getMinitue(millisec) {
    //   return moment.utc(Math.abs(millisec)).format('hh:mm');
    // }

    let message;
    if (status && status.isPaused) message = 'Timer is paused';
    if (status && !status.isPaused && status.isWorking) message = "You're on work";
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
  addFiveMinutes, togglePause, toggleWork
};

export default connect(mapState, mapDispatch)(Timer);

