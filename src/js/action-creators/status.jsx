'use strict';

import store from '../store';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  START_BREAK,
  START_WORK,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  TOGGLE_LUNCH,
  TOGGLE_NUCLEAR,
  RECEIVE_DURATIONS,
  SET_DURATIONS,
  SET_START_TIME,
  TAB_ALIAS_SAVE_SETTINGS
} from '../constants';

export const setTimeRemaining = timeRemaining => ({
  type: SET_TIME_REMAINING, timeRemaining
});

export const addFiveMinutes = () => ({
	type: ADD_FIVE_MINUTES
});

export const startWork = () => ({type: START_WORK});

export const startBreak = () => ({type: START_BREAK});

export const toggleWork = () => ({type: TOGGLE_WORK});

export const togglePause = () => ({type: TOGGLE_PAUSE});

export const toggleLunch = () => ({type: TOGGLE_LUNCH});

export const toggleNuclear = () => ({type: TOGGLE_NUCLEAR});

export const receiveDurations = durations => ({
  type: RECEIVE_DURATIONS, durations
});

export const setStartTime = startTime => ({
  type: SET_START_TIME, startTime
});

export const tabSaveSettings = () => ({
  type: TAB_ALIAS_SAVE_SETTINGS
});

export const setSettings = () => dispatch => {
  const User = require('../controllers/user');
  const userId = store.getState().auth.uid;
  let settings = Object.assign({}, store.getState().status.durations);
      settings.greylist = store.getState().greylist;

  User.settings.set(userId, settings)
    .then(() => User.settings.getById(userId));
};
