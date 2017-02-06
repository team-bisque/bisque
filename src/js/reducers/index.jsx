import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	auth: require('./auth').default,
	db: require('./db').default,
	status: require('./status').default,
  settings: require('./settings').default,
  weather: require('./weather').default,
  route: require('./route').default
});

export default rootReducer;
