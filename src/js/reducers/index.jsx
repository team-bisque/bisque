import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  alarm: require('./alarm').default,
  status: require('./status').default,
  steps: require('./steps').default,
  weather: require('./weather').default
});

export default rootReducer;
