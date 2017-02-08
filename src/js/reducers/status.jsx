'use strict';
import store from '../store';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  START_BREAK,
  START_WORK
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

    case START_BREAK:
      newState.isWorking = false;
      newState.isPaused = false;
      newState.timeRemaining = store.getState().settings.breakDuration;
      break;

    case START_WORK:
      newState.isWorking = true;
      newState.isPaused = false;
      newState.timeRemaining = store.getState().settings.workDuration;
      break;

    case TOGGLE_WORK:
      // First, toggle work
      newState.isWorking = !newState.isWorking;
      // Second, make sure we're unpaused
      newState.isPaused = false;
      // Last, put time on the clock
      newState.timeRemaining = newState.isWorking
      ? store.getState().settings.workDuration
      : store.getState().settings.breakDuration;
      break;

    case TOGGLE_PAUSE:
      newState.isPaused = !newState.isPaused;
      break;

    default:
      break;
  }

  return newState;
};
