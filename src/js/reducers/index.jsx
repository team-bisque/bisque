import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  alarm: require('./alarm').default,
  status: require('./status').default,
  steps: require('./steps').default
});

export default rootReducer;
