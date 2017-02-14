'use strict';

import {
	ADD_URL,
	REMOVE_URL,
	EDIT_URL,
	RECEIVE_GREYLIST
} from '../constants';

// greylist should be an object with key

// ### reducer needs refactor
export default (greylist = [], action) => {
	let newState = greylist;
	switch (action.type) {
	  case ADD_URL:
	  	newState.push(action.greylist);
	    break;
	  case REMOVE_URL:
	    newState = newState.filter((e, i) => i !== action.index);
	    break;
    case EDIT_URL:
    	newState[action.index] = action.greylist;
    	break;
    case RECEIVE_GREYLIST:
    	newState = action.greylist;
    	break;
		default:
			break;
	}
	return newState;
};

