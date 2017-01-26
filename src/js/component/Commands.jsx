import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addFiveMinutes, haltBackground} from '../action-creators/status';

class Commands extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler (evt) {
    const button = evt.target.name;

    if (button === 'time') {
      this.props.addFiveMinutes();
    } else if (button === 'stop') {
      this.props.haltBackground();
    }
  }

  render () {
    return (
      <div>
        <button
          name="time"
          onClick={this.clickHandler}
          className="btn btn-warning btn-xs">
          <span className="glyphicon glyphicon-hourglass" />
          Gimme 5 more minutes!
        </button>
        <button
          name="stop"
          onClick={this.clickHandler}
          className="btn btn-danger btn-xs">
          <span className="glyphicon glyphicon-alert" />
          $@*% hit the fan, sorry!
        </button>
      </div>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => ({
  addFiveMinutes: dispatch(addFiveMinutes()),
  haltBackground: dispatch(haltBackground())
});

export default connect(mapState, mapDispatch)(Commands);
