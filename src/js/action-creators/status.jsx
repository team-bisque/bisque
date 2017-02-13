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
  TAB_ALIAS_SET_SETTINGS
} from '../constants';

import { firebaseDb } from '../firebase';
// const settingsRef = firebaseDb.ref('users');

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

