'use strict';

import {firebro} from '../background';

import {
  AUTHENTICATED,
} from '../constants';

export const authenticated = user => ({ type: AUTHENTICATED, user });

export const login = () =>
  dispatch => {
    console.log('CREATING PROVIDER');
    const provider = new firebro.auth.GoogleAuthProvider();
    console.log(provider);
    console.log('BEGINNING AUTHENTICATION');
    return firebro.auth().signInWithPopup(provider)
      .then(res => {
        console.log('RECEIVING USER');
        console.log(res.user);
        console.log('DISPATCHING USER');
        dispatch(authenticated(res.user));
      })
      .catch(err => console.error(err));
  }
