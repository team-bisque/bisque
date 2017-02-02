'use strict';

import {
  AUTHENTICATED,
  TAB_ALIAS_LOGIN
} from '../constants';

export const tabAuthenticate = () => ({
  type: TAB_ALIAS_LOGIN
});

export const authenticated = user => ({ type: AUTHENTICATED, user });

const Auth = require('../controllers/auth')
const auth = new Auth();

export const login = () =>
  dispatch => auth.authenticate(true)  