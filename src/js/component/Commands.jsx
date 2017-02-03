import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addFiveMinutes, togglePause} from '../action-creators/status';

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
    }
  }

  render () {
    return (
      <div>
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
                  <span className="glyphicon glyphicon-time" /> Gimme 5 more minutes!
                </button>
                <button
                  name="pause"
                  onClick={this.clickHandler}
                  className="btn btn-danger btn-s">
                  <span className="glyphicon glyphicon-hourglass" /> $@*% hit the fan, sorry!
                </button>
              </div>)
        }
      </div>
    );
  }
}

const mapState = (state, {status}) => ({isPaused: status.isPaused});

const mapDispatch = dispatch => ({
  addFiveMinutes: () => dispatch(addFiveMinutes()),
  togglePause: () => dispatch(togglePause())
});

export default connect(mapState, mapDispatch)(Commands);
