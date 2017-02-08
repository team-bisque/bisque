
'use strict';

import {
	SET_WORK_DURATION,
	SET_BREAK_DURATION,
	SET_LUNCH_DURATION,
	SET_START_TIME,
	RECEIVE_SETTINGS
} from '../constants';

const minute = 60 * 1000; // In miliseconds

const initialState = {
  workDuration: 8 * minute,
  breakDuration: 6 * minute,
  lunchDuration: 5 * minute,
  startTime: 0  
};

export default (state = initialState, action) => {
	let newState = Object.assign({}, state);
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
		case SET_START_TIME:
			newState.startTime = action.startTime;
			break;	  
    case RECEIVE_SETTINGS:
    	newState.workDuration = action.settings.workDuration || newState.workDuration;
    	newState.breakDuration = action.settings.breakDuration || newState.workDuration;
    	newState.lunchDuration = action.settings.lunchDuration || newState.workDuration;
    	newState.greylist = action.settings.greylist || newState.greylist;
    	break;
		default:
			break;
	}
	return newState;
};