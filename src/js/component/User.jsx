'use strict';

import React from 'react';
// import Login from './Login';
import { connect } from 'react-redux';

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    const { auth, weather } = this.props;

    var curHr = new Date().getHours();
    var message;

    if (curHr < 12) {
      message = (
        <div>
          <h3>{ 'Good morning!' }</h3>
          <h3>{ `${auth && auth.displayName}` }</h3>
        </div>
        );
    } else if (curHr < 18) {
      message = (
        <div>
          <h3>{ 'Good afternoon!' }</h3>
          <h3>{ `${auth && auth.displayName}` }</h3>
        </div>
        );
    } else {
      message = (
        <div>
          <h3>{ 'Good night!' }</h3>
          <h3>{ `${auth && auth.displayName}` }</h3>
        </div>
        );
    }

    // let auth = null;
    return  (
      <div id="user" className="icon top-left bg-check">
        { auth ? message : null }
      </div>
    );
  }
}

