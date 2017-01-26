import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  status: require('./status').default,
  weather: require('./weather').default
});

export default rootReducer;
