import React, {Component} from 'react';
import {authenticateAlias} from '../action-creators/auth';
import {connect} from 'react-redux';

export class Login extends Component {
  authenticate() {
    this.props.authenticateAlias();
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
const mapDispatch = {authenticateAlias};

export default connect(mapState, mapDispatch)(Login);
export {Login as TestableLogin};
