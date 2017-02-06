'use strict';

import React from 'react';
// import Login from './Login';
import { tabAuthenticate, signout } from '../action-creators/auth';
import { connect } from 'react-redux';

export class User extends React.Component {
  constructor(props) {
    super(props);    
  }

  athenticate() {
    this.props.tabAuthenticate();
  }
  signout(){
    this.props.signout();
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
          <button onClick={this.signout.bind(this)}>Sign out</button>
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

    console.log('User', auth, weather);

    // let auth = null;
    return  (
      <div id="user" className="icon top-left bg-check">
        { auth ? message : null }
      </div>
    );
  }
}


const mapState = null;
const mapDispatch = {tabAuthenticate, signout};

export default connect(mapState, mapDispatch)(User);

