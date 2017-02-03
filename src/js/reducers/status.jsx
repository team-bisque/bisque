'use strict';
import store from '../store';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
} from '../constants';

const minute = 60 * 1000; // In miliseconds

// Pause begins true, waits for user to start
const initialState = {
  timeRemaining: 0,
  isWorking: false,
  isPaused: true,
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

    case TOGGLE_WORK:
      // First, toggle work
      newState.isWorking = !newState.isWorking;
      // Second, make sure we're unpaused
      if (newState.isPaused) newState.isPaused = !newState.isPaused;
      // Last, put time on the clock
      if (newState.isWorking) {
        newState.timeRemaining = store.getState().settings.workDuration;
      } else {
        newState.timeRemaining = store.getState().settings.breakDuration;
      }
      break;

    case TOGGLE_PAUSE:
      newState.isPaused = !newState.isPaused;
      break;

    default:
      break;
  }

  return newState;
};
