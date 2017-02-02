import React, {Component} from 'react';
import {tabAuthenticate} from '../action-creators/auth';
import {connect} from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log('LOGGING IN!');
    console.log(this.props.tabAuthenticate);
    this.props.tabAuthenticate();
  }

  render () {
    return (
      <button onClick={this.clickHandler} className="btn btn-success btn-lg"><span className="glyphicon glyphicon-user"></span> login</button>
    );
  }
}

const mapState = null;
const mapDispatch = {tabAuthenticate};

export default connect(mapState, mapDispatch)(Login);