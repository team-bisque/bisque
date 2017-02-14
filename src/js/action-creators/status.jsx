'use strict';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  START_BREAK,
  START_WORK,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  TOGGLE_LUNCH,
  RECEIVE_SETTINGS,
  SET_START_TIME,  
  TAB_ALIAS_SET_SETTINGS,
  TOGGLE_WORK_ALIAS
} from '../constants';

import { firebaseDb } from '../firebase';
const Tabs = require('../controllers/tabs');
// const settingsRef = firebaseDb.ref('users');

export const setTimeRemaining = timeRemaining => ({
  type: SET_TIME_REMAINING, timeRemaining
});

export const addFiveMinutes = () => ({
	type: ADD_FIVE_MINUTES
});

export const startWork = () => ({type: START_WORK});

export const startBreak = () => ({type: START_BREAK});

export const toggle_work = () => ({type: TOGGLE_WORK});

export const togglePause = () => ({type: TOGGLE_PAUSE});

export const toggleLunch = () => ({type: TOGGLE_LUNCH});

export const toggleWorkAlias = () => ({type: TOGGLE_WORK_ALIAS});

export const toggleWork = () => (dispatch, getState) => {
  if(getState().status.isWorking && getState().status.settings.nuclear) {

    // if current tab has url, we will create and lock new tab, because user was not on our dashboard.    
    Tabs.lockTab();

    // if current tab doesn't have url, we will lock current tab, because user was on out dashboard.
  }
  dispatch(toggle_work());
};

export const setStartTime = startTime => ({
  type: SET_START_TIME, startTime
});

export const receive_settings = settings => ({
  type: RECEIVE_SETTINGS, settings
});

export const receiveSettings = () => (dispatch, getState) => {
  // Action-creators/status receiveDuration
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/settings`);
  ref.once('value', (snapshot) => {
    dispatch(receive_settings(snapshot.val()));
  });
}

export const setSettingsAlias = settings => ({
  type: TAB_ALIAS_SET_SETTINGS, settings
});

export const setSettings = payload => (dispatch, getState) => {
  // Action-creators/status setDuration  
  const ref = firebaseDb.ref(`users/${getState().auth.uid}/settings`);;  
  ref.on('value', snapshot => {    
    ref.set(payload.settings)
      .then(()=>{
        ref.off();
        dispatch(receive_settings(payload.settings));        
      })      
      .catch(console.error);
  });     
}

