import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	auth: require('./auth').default,
	history: require('./history').default,
	tasks: require('./tasks').default,
	status: require('./status').default,
  greylist: require('./greylist').default,
  weather: require('./weather').default,
  route: require('./route').default
});

export default rootReducer;
