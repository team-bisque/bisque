import React, {Component} from 'react';
import {login} from '../action-creators/auth';
import {connect} from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.login();
  }

  render () {
    return (
      <button onClick={this.clickHandler} className="btn btn-success btn-lg"><span className="glyphicon glyphicon-user"></span> login</button>
    );
  }
}

const mapState = null;

const mapDispatch = dispatch => ({
  login: () => dispatch(login())
});

export default connect(mapState, mapDispatch)(Login);
