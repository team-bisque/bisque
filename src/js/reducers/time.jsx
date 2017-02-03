'use strict';

import {
	SET_WORK_DURATION,
	SET_BREAK_DURATION,
	SET_LUNCH_DURATION,
	SET_SHIFT_DURATION,
	SET_START_TIME,
} from '../constants';

const minute = 60 * 1000; // In miliseconds

const initialState = {
  workDuration: 8 * minute,
  breakDuration: 6 * minute,
  lunchDuration: 5 * minute,
  shiftDuration: 60 * minute
  startTime: 0,
};

// reducer
export default (state = initialState, action) => {
	let newState = Object.assign({}, state);

	switch (action.type){
		case SET_WORK_DURATION:
			newState.workDuration = action.workDuration;
			break;
		case SET_BREAK_DURATION:
			newState.breakDuration = action.breakDuration;
			break;
		case SET_LUNCH_DURATION:
			newState.lunchDuration = action.lunchDuration;
			break;
		case SET_SHIFT_DURATION:
			newState.shiftDuration = action.shiftDuration;
			break;
		case SET_START_TIME:
			newState.startTime = action.startTime;
			break;
	}
	return newState;
};
