'use strict';

import {
  RECEIVE_WEATHER
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_WEATHER:
      return action.weather;

    default:
      break;
  }

  return state;
};
