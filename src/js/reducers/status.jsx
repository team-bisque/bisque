'use strict';

import {
  TOGGLE_WORK,
  TOGGLE_LUNCH,
  TOGGLE_PAUSE
} from '../constants';

const initialState = {
  isWorking: true,
  pause: false,
  lunch: false
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

    case TOGGLE_PAUSE:
      newState.pause = !newState.pause;
      break;

    default:
      break;
  }

  return newState;
};
