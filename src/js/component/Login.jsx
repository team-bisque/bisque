import React, {Component} from 'react';
import {tabAuthenticate} from '../action-creators/auth';
import {connect} from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);
  }

  authenticate() {
    this.props.tabAuthenticate();
  }

  render () {
    return (
      <div id="signin" className="icon" onClick={this.authenticate.bind(this)}>
        <i className="fa fa-google"></i>
        <div>signin with google account</div>
      </div>
    );
  }
}

const mapState = null;
const mapDispatch = {tabAuthenticate};

export default connect(mapState, mapDispatch)(Login);
