'use strict';
import {
  RECEIVE_USER,
  TAB_ALIAS_AUTH
} from '../constants';

const auth = require('../controllers/auth');

export const authenticateAlias = () => ({
  type: TAB_ALIAS_AUTH
});

export const authenticate = () => dispatch => {
  auth.authenticate(true)
}

export const receiveUser = user => ({ type: RECEIVE_USER, user });
