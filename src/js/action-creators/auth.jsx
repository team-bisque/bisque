'use strict';
import {
  RECIEVE_USER,
  TAB_ALIAS_LOGIN
} from '../constants';

const auth = require('../controllers/auth')

export const tabAuthenticate = () => ({
  type: TAB_ALIAS_LOGIN
});

export const authenticate = () => dispatch => {
  auth.authenticate(true)
}

export const recieveUser = user => ({ type: RECIEVE_USER, user });
