'use strict';

import {
	SET_ROUTE
} from '../constants';

export default (route = null, action) => {

	switch (action.type){
		case SET_ROUTE:
			return action.route;

		default:
			return route;
	}
};
