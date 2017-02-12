'use strict';
import {
  RECEIVE_USER,
  TAB_ALIAS_LOGIN
} from '../constants';

const auth = require('../controllers/auth');

export const tabAuthenticate = () => ({
  type: TAB_ALIAS_LOGIN
});

export const authenticate = () => dispatch => {
  auth.authenticate(true)
}

export const receiveUser = user => ({ type: RECEIVE_USER, user });
