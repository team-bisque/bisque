'use strict';

import {
  RECEIVE_STEPS
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_STEPS:
      return action.steps;s

    default:
      break;
  }

  return state;
};
