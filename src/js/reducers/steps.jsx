'use strict';

import {
  RECEIVE_STEPS
} from '../constants';

export default (state = 500, action) => {
  switch (action.type) {
    case RECEIVE_STEPS:
      return action.steps;

    default:
      break;
  }

  return state;
};
