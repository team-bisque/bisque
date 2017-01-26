'use strict';

import moment from 'moment';

const initialState = {
  timeNow: new Date,
  timeOfLunch: 13,
  lunch: false,
  work: true
};

export default (state = initialState, action) => {
  const newState = Object.assign(state, {});

  switch (action.type) {
    case TOGGLE_WORK:
      newState.work = !newState.work;
      break;

    case RECEIVE_LUNCH_TIME:
      newState.timeOfLunch = action.timeOfLunch;
      break;

    case RECEIVE_CURRENT_TIME:
      newState.timeNow = action.timeNow;
      break;

    default:
      break;
  }

  return newState;
};
