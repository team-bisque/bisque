'use strict';

import store from '../store';

import {
  SET_WORK_DURATION,
  SET_LUNCH_DURATION,
  SET_BREAK_DURATION,
  SET_START_TIME,
  RECEIVE_DURATIONS,
  TAB_ALIAS_SAVE_SETTINGS
} from '../constants';

import { firebaseDb } from '../firebase';


const receive_duration = durations => ({
  type: RECEIVE_DURATIONS, durations
});

export const set_workDuration = workDuration => ({
  type: SET_WORK_DURATION, workDuration
});

export const setBreakDuration = breakDuration => ({
  type: SET_BREAK_DURATION, breakDuration
});

export const setLunchDuration = lunchDuration => ({
  type: SET_LUNCH_DURATION, lunchDuration
});

export const setStartTime = startTime => ({
  type: SET_START_TIME, startTime
});

export const tabSaveSettings = () => ({
  type: TAB_ALIAS_SAVE_SETTINGS
});

export const receiveSettings = () => (dispatch, getState) => {
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/settings`);
  ref.once('value', (snapshot) => {
    console.log('receiveSettings: snapshop', snapshot.val())
    dispatch(receive_duration(snapshot.val()));
  });
}



export const setSettings = () => dispatch => {
  // why having scope issue??
  const User = require('../controllers/user');
  // console.log(User, User.settings)
  const userId = store.getState().auth.uid;
  let settings = Object.assign({}, store.getState().settings);
      settings.greylist = store.getState().greylist;

  User.settings.set(userId, settings)
    .then(() => User.settings.getById(userId));
};
