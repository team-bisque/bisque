import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addFiveMinutes, togglePause, toggleWork} from '../action-creators/status';

class Commands extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler (evt) {
    const button = evt.target.name;

    if (button === 'time') {
      this.props.addFiveMinutes();
    } else if (button === 'pause') {
      this.props.togglePause();
    } else if (button === 'toggle') {
      this.props.toggleWork();
    }
  }

  render () {
    return (
      <div>
        <div>
          {
            !this.props.isWorking
              ? <button
                  name="toggle"
                  onClick={this.clickHandler}
                  className="btn btn-default btn-s">
                  <span className="glyphicon glyphicon-briefcase" /> Start work
                </button>
              : <button
                  name="toggle"
                  onClick={this.clickHandler}
                  className="btn btn-default btn-s">
                  <span className="glyphicon glyphicon-sunglasses" /> Take a break
                </button>
          }
        </div>
        {
          this.props.isPaused
            ? (<button
                name="pause"
                onClick={this.clickHandler}
                className="btn btn-danger btn-s">
                <span className="glyphicon glyphicon-hourglass" /> Unpause yourself
              </button>)
            : (<div>
                <button
                  name="time"
                  onClick={this.clickHandler}
                  className="btn btn-warning btn-s">
                  <span className="glyphicon glyphicon-time" /> 5 more minutes
                </button>
                <button
                  name="pause"
                  onClick={this.clickHandler}
                  className="btn btn-danger btn-s">
                  <span className="glyphicon glyphicon-hourglass" /> I can't even
                </button>
              </div>)
        }
      </div>
    );
  }
}

const mapState = (state, {status}) => ({
  isPaused: status.isPaused,
  isWorking: status.isWorking
});

const mapDispatch = dispatch => ({
  addFiveMinutes: () => dispatch(addFiveMinutes()),
  togglePause: () => dispatch(togglePause()),
  toggleWork: () => dispatch(toggleWork())
});

export default connect(mapState, mapDispatch)(Commands);
