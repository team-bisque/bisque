import React, {Component} from 'react';
import {tabAuthenticate} from '../action-creators/auth';
import {connect} from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);    
  }

  athenticate() {
    this.props.tabAuthenticate();
  }

  render () {
    return (
      <div id="signin" className="icon">
        <i className="fa fa-google" onClick={this.athenticate.bind(this)} ></i>
        <span>signin with google account</span>
      </div>
    );
  }
}

const mapState = null;
const mapDispatch = {tabAuthenticate};

export default connect(mapState, mapDispatch)(Login);
