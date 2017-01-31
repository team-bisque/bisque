'use strict';

import {
	WORK_DURATION,
	BREAK_DURATION,
	LUNCH_DURATION,
	START_TIME,
	SET_TIME_REMAINING,
	ADD_FIVE_MINUTES,
} from '../constants';

const initialState = {
  workDuration: (1000 * 60) * 8,
  breakDuration: (1000 * 60) * 6,
  lunchDuration: (1000 * 60) * 5,
  startTime: 0,
  timeRemaining: 0
};

// reducer
export default (state = initialState, action) => {
	let newState = Object.assign({}, state);

	switch (action.type){
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
		case ADD_FIVE_MINUTES:
			newState.timeRemaining += (1000 * 60) * 5;
			break;
	}
	return newState;
};
