import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	time: require('./time').default,	
  status: require('./status').default,
  weather: require('./weather').default
});

export default rootReducer;
