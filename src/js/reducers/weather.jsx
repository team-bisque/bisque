'use strict';

import {
  RECEIVE_WEATHER
} from '../constants';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_WEATHER:
      return action.weather;

    // case 

    default:
      break;
  }

  return state;
};
