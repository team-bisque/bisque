'use strict';

import {
  RECEIVE_TASKS
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_TASKS:
      return action.tasks;
    default:
      return state;
  }
};
