'use strict';

import {
	WORK_DURATION,
	EAT_DURATION,
	BREAK_DURATION,
	START_TIME
} from '../constants';

const initialState = {
  workDuration: (1000 * 10),
  breakDuration: (1000 * 30),
  eatDuration: (1000 * 10),
  startTime: 0
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
		case EAT_DURATION:
			newState.eatDuration = action.eatDuration;
			break;
		case START_TIME:
			newState.startTime = action.startTime;
			break;
	}
	return newState;
}
