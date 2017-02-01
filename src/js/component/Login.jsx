import React, {Component} from 'react';
import {authenticated} from '../action-creators/auth';
import {connect} from 'react-redux';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const firebase = this.props.firebase;
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(res => authenticated(res.user))
      .catch(err => console.error(err))
  }

  render () {
    return (
      <button onClick={this.clickHandler} className="btn btn-success btn-lg"><span className="glyphicon glyphicon-user"></span> login</button>
    );
  }
}

const mapState = ({firebase}) => ({firebase});

export default connect(mapState, {authenticated})(Login)
