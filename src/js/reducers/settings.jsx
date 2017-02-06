'use strict';

import {
	SAVE_SETTINGS,
} from '../constants';

const minute = 60 * 1000; // In miliseconds

const initialState = {
  workDuration: 8 * minute,
  breakDuration: 6 * minute,
  lunchDuration: 5 * minute,
  urlList: [
    'youtube.com',
    'buzzfeed.com'
  ]
};

export default (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case SAVE_SETTINGS:
      return action.settings;
		default:
			break;
	}
	return newState;
};
