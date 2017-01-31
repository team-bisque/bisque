'use strict';

import {
	WORK_DURATION,
	BREAK_DURATION,
	LUNCH_DURATION,
	START_TIME,
	SET_TIME_REMAINING
} from '../constants';

const initialState = {
  workDuration: (1000 * 60) * 3,
  breakDuration: (15000 * 60) * 2,
  lunchDuration: (1000 * 60) * 5,
  startTime: 0,
  timeRemaining: 0
};

// reducer
export default (app=initialState, action) => {
	let newState = Object.assign({}, app)

	switch(action.type){
		case WORK_DURATION:
			newState.workDuration = action.workDuration;
			break;
		case BREAK_DURATION:
			newState.breakDuration = action.breakDuration;
			break;
		case LUNCH_DURATION:
			newState.lunchDuration = action.lunchDuration;
			break;
		case START_TIME:
			newState.startTime = action.startTime;
			break;
		case SET_TIME_REMAINING:
			newState.timeRemaining = action.timeRemaining;
			break;
	}
	return newState;
}
