import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addFiveMinutes} from '../action-creators/time';
import {togglePause} from '../action-creators/status';

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
        <button
          name="time"
          onClick={this.clickHandler}
          className="btn btn-warning btn-s">
          <span className="glyphicon glyphicon-hourglass" />
          Gimme 5 more minutes!
        </button>
        {
          this.props.pause
            ? (<button
                name="pause"
                onClick={this.clickHandler}
                className="btn btn-danger btn-s">
                <span className="glyphicon glyphicon-alert" />
                Unpause yourself
              </button>)
            : (<button
                name="pause"
                onClick={this.clickHandler}
                className="btn btn-danger btn-s">
                <span className="glyphicon glyphicon-alert" />
                $@*% hit the fan, sorry!
              </button>)
        }
      </div>
    );
  }
}

const mapState = (state, {status}) => ({pause: status.pause});

const mapDispatch = dispatch => ({
  addFiveMinutes: () => dispatch(addFiveMinutes()),
  togglePause: () => dispatch(togglePause())
});

export default connect(mapState, mapDispatch)(Commands);
