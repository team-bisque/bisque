'use strict';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  START_BREAK,
  START_WORK,
  RECEIVE_DURATIONS
} from '../constants';

const minute = 60 * 1000; // In miliseconds

// Pause begins true, waits for user
const initialState = {
  timeRemaining: 0,
  isWorking: false,
  isPaused: true,
  durations: {
    workDuration: 8 * minute,
    breakDuration: 6 * minute,
    lunchDuration: 30 * minute
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
      newState.timeRemaining = state.durations.breakDuration;
      break;

    case START_WORK:
      newState.isWorking = true;
      newState.isPaused = false;
      newState.timeRemaining = state.durations.workDuration;
      break;

    case TOGGLE_WORK:
      // First, toggle work
      newState.isWorking = !newState.isWorking;
      // Second, put time on the clock
      newState.timeRemaining = newState.isWorking
      ? state.durations.workDuration
      : state.durations.breakDuration;
      // Last, unpause
      newState.isPaused = false;
      break;

    case TOGGLE_PAUSE:
      newState.isPaused = !newState.isPaused;
      break;

    case RECEIVE_DURATIONS:
    newState.durations.workDuration = action.durations.workDuration || newState.durations.workDuration;
    newState.durations.breakDuration = action.durations.breakDuration || newState.durations.breakDuration;
    newState.durations.lunchDuration = action.durations.lunchDuration || newState.durations.lunchDuration;
    break;

    default:
      break;
  }

  return newState;
};
