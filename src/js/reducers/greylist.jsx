'use strict';

import {	
	ADD_URL,
	REMOVE_URL,
	EDIT_URL,
	RECEIVE_GREYLIST
} from '../constants';

// greylist should be an object with key


//imagine what data should look like
let firebaseDB = {
	0: "buzzfeed.com",
	1: "youtube.com",
	2: "facebook.com"
}

// ### reducer needs refactor
export default (greylist = [], action) => {
	let newState = Object.assign({}, greylist);
	switch (action.type) {		
	  case ADD_URL:	  
	  	newState.greylist.push(action.url);
	    break;
	  case REMOVE_URL:
	    newState.greylist = newState.greylist.filter((e, i) => i !== action.index);
	    
	    
	    break;
    case EDIT_URL:
    	newState.greylist[action.index] = action.url;
    	break;
    case RECEIVE_GREYLIST:
    	newState = action.greylist;
    	break;
		default:
			break;
	}
	return newState;
};

