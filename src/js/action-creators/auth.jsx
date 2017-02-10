'use strict';
import {
  AUTHENTICATE,
  TAB_ALIAS_LOGIN
} from '../constants';

// const auth = require('../controllers/auth')

export const tabAuthenticate = () => ({
  type: TAB_ALIAS_LOGIN
});

export const login = () => dispatch => {
  auth.authenticate(true)
}

export const authenticate = user => ({ type: AUTHENTICATE, user });
