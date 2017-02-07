'use strict';

import React from 'react';
// import Login from './Login';
import {tabAuthenticate} from '../action-creators/auth';
import {connect} from 'react-redux';

export class User extends React.Component {
  constructor(props) {
    super(props);
  }

  athenticate() {
    this.props.tabAuthenticate();
  }

  render () {

    const { auth, weather } = this.props;

    var curHr = new Date().getHours();
    var message;

    if (curHr < 12) {
      message = (
        <div>
          <h3>{ `Good morning, ${auth && auth.displayName}!` }</h3>
        </div>
        );
    } else if (curHr < 18) {
      message = (
        <div>
          <h3>{ `Good afternoon, ${auth && auth.displayName}!` }</h3>
        </div>
        );
    } else {
      message = (
        <div>
          <h3>{ `Good evening, ${auth && auth.displayName}!` }</h3>
        </div>
        );
    }

    // let user = null;
    return  (
      <div id="user" className="icon top-left bg-check">
        { auth ? message : null }
      </div>
    );
  }
}


const mapState = null;
const mapDispatch = {tabAuthenticate};

export default connect(mapState, mapDispatch)(User);
