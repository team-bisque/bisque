'use strict';
const SET_ROUTE = "SET_ROUTE";
export const setRoute = route => ({ type: SET_ROUTE, route });

export default (route = null, action) => {
	
	switch (action.type){
		case SET_ROUTE:
			return route = action.route;

		default:
			return route;
	}	
};