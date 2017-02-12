'use strict';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  START_BREAK,
  START_WORK,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  TOGGLE_LUNCH,
  RECEIVE_DURATIONS,
  SET_START_TIME,
  TAB_ALIAS_SAVE_SETTINGS,
  SET_DURATION_ALIAS
} from '../constants';

import { firebaseDb } from '../firebase';
const settingsRef = firebaseDb.ref('users');

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

export const receive_duration = durations => ({
  type: RECEIVE_DURATIONS, durations
});

export const receiveDuration = () => (dispatch, getState) => {
  // Action-creators/status receiveDuration
  const ref = settingsRef.child(getState().auth.uid);
  ref.once('value', (snapshot) => {
    console.log('receiveDuration: snapshop', snapshot.val())
    dispatch(receive_duration(snapshot.val()));
  });
}

export const setDurationAlias = durations => ({
  type: SET_DURATION_ALIAS, durations
});

export const setDuration = payload => (dispatch, getState) => {
  // Action-creators/status setDuration  
  const ref = settingsRef.child(getState().auth.uid);  
  console.log('setDuration: snapshop',payload)
  ref.on('value', snapshot => {    
    ref.set(payload.durations)
      .then(()=>{
        ref.off();
        dispatch(receive_duration(payload.durations));        
      })      
      .catch(console.error);
  });     
}

// export const setSettings = () => (dispatch, getState) => {
//   const User = require('../controllers/user');
//   const userId = getState().auth.uid;
//   let settings = Object.assign({}, getState().status.durations);
//       settings.greylist = getState().greylist;

//   User.settings.set(userId, settings)
//     .then(() => User.settings.getById(userId));
// };
