'use strict';

import {
	SET_WORK_DURATION,
	SET_BREAK_DURATION,
	SET_LUNCH_DURATION,
	SET_START_TIME,
	ADD_URL,
	REMOVE_URL
} from '../constants';

const minute = 60 * 1000; // In miliseconds

const initialState = {
  workDuration: 8 * minute,
  breakDuration: 6 * minute,
  lunchDuration: 5 * minute,
  startTime: 0,
  urlList: [
    'youtube.com',
    'buzzfeed.com'
  ]
};

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
		case SET_START_TIME:
			newState.startTime = action.startTime;
			break;
	  case ADD_URL:
	    newState.urlList.push(action.url);
	    break;
	  case REMOVE_URL:
	    if (action.index < 0) {
	      console.log("URL wasn't on the list!");
	    } else {
	      newState.urlList = newState.urlList.filter((e, i) => i !== action.index);
	    }
	    break;
		default:
			break;
	}
	return newState;
};
