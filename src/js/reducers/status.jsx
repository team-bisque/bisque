'use strict';
import store from '../store';

import {
  SET_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  TOGGLE_WORK,
  TOGGLE_PAUSE,
  // TOGGLE_LUNCH
} from '../constants';

const minute = 60 * 1000; // In miliseconds

const initialState = {
  timeRemaining: 0,
  isWorking: false,
  pause: true,
  // lunch: false
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
      newState.isWorking = !newState.isWorking;
      // Unpause
      if (newState.pause) newState.pause = !newState.pause;
      // Set the clock
      if (newState.isWorking) {
        newState.timeRemaining = store.getState().time.workDuration;
      } else {
        newState.timeRemaining = store.getState().time.breakDuration;
      }
      break;

    case TOGGLE_PAUSE:
      newState.pause = !newState.pause;
      break;

    // case TOGGLE_LUNCH:
    //   newState.lunch = !newState.lunch;
    //   break;

    default:
      break;
  }

  return newState;
};
