'use strict';

import {
	SET_WORK_DURATION,
	SET_BREAK_DURATION,
	SET_LUNCH_DURATION,
	SET_START_TIME
} from '../constants';

const initialState = {
  workDuration: (1000 * 5),
  breakDuration: (1000 * 15),
  lunchDuration: (1000 * 60),
  startTime: 0
};

// reducer
export default (app=initialState, action) => {
	let newState = Object.assign({}, app)

	switch(action.type){
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
	}
	return newState;
}
