import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  alarm: require('./alarm').default
});

export default rootReducer;
