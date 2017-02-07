'use strict';

import {
	SET_WORK_DURATION,
	SET_BREAK_DURATION,
	SET_LUNCH_DURATION,
	SAVE_SETTINGS
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
  console.log("got to reducer tho");
	switch (action.type) {
		case SET_WORK_DURATION:
			newState.workDuration = action.workDuration;
			break;
		case SET_BREAK_DURATION:
			newState.breakDuration = action.breakDuration;
			break;
		case SET_LUNCH_DURATION:
			newState.lunchDuration = action.lunchDuration;
			break;
		case SAVE_SETTINGS:
      newState.urlList = [...action.urlList];
    	break;
		default:
			break;
	}
	return newState;
};
