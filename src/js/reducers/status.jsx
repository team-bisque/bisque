'use strict';

import {
  TOGGLE_WORK,
  TOGGLE_LUNCH,
  RECEIVE_LUNCH_TIME,
  ADD_FIVE_MINUTES,
  // HALT_BACKGROUND
} from '../constants';

const initialState = {
  timeOfLunch: 13, // Need to decide about this later
  lunch: false,
  isWorking: true
};

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TOGGLE_WORK:
      newState.isWorking = !newState.isWorking;
      break;

    case TOGGLE_LUNCH:
      newState.lunch = !newState.lunch;
      break;

    case RECEIVE_LUNCH_TIME:
      newState.timeOfLunch = action.timeOfLunch;
      break;

    case ADD_FIVE_MINUTES:
      console.log('OK, you get Five More Minutes');
      break;

    // case HALT_BACKGROUND:
    //   console.log('OK, freezing background');
    //   break;

    default:
      break;
  }

  return newState;
};
