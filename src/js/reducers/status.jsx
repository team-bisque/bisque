'use strict';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  START_BREAK,
  START_WORK,
  RECEIVE_SETTINGS
} from '../constants';

const minute = 60 * 1000; // In miliseconds

// Pause begins true, waits for user
const initialState = {
  timeRemaining: 0,
  isWorking: false,
  isPaused: true,
  settings: {
    workDuration: 25 * minute,
    breakDuration: 5 * minute,
    lunchDuration: 60 * minute,
    nuclear: false
    // nuclear: true //for test
  }
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_TIME_REMAINING:
      newState.timeRemaining = action.timeRemaining;
      break;

    case ADD_FIVE_MINUTES:
      newState.timeRemaining += (5 * minute);
      break;

    case START_BREAK:
      newState.isWorking = false;
      newState.isPaused = false;
      newState.timeRemaining = state.settings.breakDuration;
      break;

    case START_WORK:
      newState.isWorking = true;
      newState.isPaused = false;
      newState.timeRemaining = state.settings.workDuration;
      break;

    case TOGGLE_WORK:
      // First, toggle work
      newState.isWorking = !newState.isWorking;
      // Second, put time on the clock
      newState.timeRemaining = newState.isWorking
      ? state.settings.workDuration
      : state.settings.breakDuration;
      // Last, unpause
      newState.isPaused = false;
      break;

    case TOGGLE_PAUSE:
      newState.isPaused = !newState.isPaused;
      break;

    case RECEIVE_SETTINGS:
      newState.settings = Object.assign({}, newState.settings, action.settings);
      break;

    default:
      break;
  }

  return newState;
};
