'use strict';

import {
  TOGGLE_WORK,
  TOGGLE_LUNCH,
  RECEIVE_LUNCH_TIME,
  RECEIVE_TIME_REMAINING,
  ADD_FIVE_MINUTES,
  HALT_BACKGROUND
} from '../constants';

const initialState = {
  timeRemaining: 5,
  timeOfLunch: 13, // Need to decide about this later
  lunch: false,
  work: true,
  workDuration: (1000 * 10),
  breakDuration: (1000 * 10),
  eatDuration: (1000 * 10)
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TOGGLE_WORK:
      newState.work = !newState.work;
      break;

    case TOGGLE_LUNCH:
      newState.lunch = !newState.lunch;
      break;

    case RECEIVE_LUNCH_TIME:
      newState.timeOfLunch = action.timeOfLunch;
      break;

    case RECEIVE_TIME_REMAINING:
      newState.timeRemaining = action.timeRemaining;
      break;

    case ADD_FIVE_MINUTES:
      console.log('OK, you get Five More Minutes');
      break;

    case HALT_BACKGROUND:
      console.log('OK, freezing background');
      break;

    default:
      break;
  }

  return newState;
};
