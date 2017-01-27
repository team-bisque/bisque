import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	app: require('./chromeApp').default,
	browser: require('./browser').default,
  status: require('./status').default,
  weather: require('./weather').default
});

export default rootReducer;
