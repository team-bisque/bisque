import {
  RECEIVE_FIREBASE,
} from '../constants';

export const receiveFirebase = firebase => ({ type: RECEIVE_FIREBASE, firebase });
