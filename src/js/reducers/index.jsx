import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	auth: require('./auth').default,
	db: require('./db').default,
	time: require('./time').default,
  status: require('./status').default,
  weather: require('./weather').default
});

export default rootReducer;
