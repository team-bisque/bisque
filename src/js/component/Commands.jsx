import React, {Component} from 'react';
import {connect} from 'redux';

import {addTime, stopTime} from './reducers/status';

class Commands extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler (evt) {
    const button = evt.target.name;
    if (button === 'time') {
      this.props.addTime(5);
    } else if (button === 'stop') {
      this.props.stopTime();
    }
  }

  render () {
    return (
      <div>
        <button
          name="time"
          onClick={this.clickHandler}
          className="btn btn-default btn-xs">
          <span className="glyphicon glyphicon-wrench" />
          Gimme 5 more minutes!
        </button>
        <button
          name="stop"
          onClick={this.clickHandler}
          className="btn btn-default btn-xs">
          <span className="glyphicon glyphicon-wrench" />
          $@*% hit the fan, sorry!
        </button>
      </div>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => ({
  addTime: dispatch(addTime),
  stopTime: dispatch(stopTime)
});

export default connect(mapState, mapDispatch)(Commands);
