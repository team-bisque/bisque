import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Alias actions send reqs for thunk actions to backend.js
import {alias} from 'react-chrome-redux';
import aliases from './action-creators/aliases';

const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(createLogger(), 
  	alias(aliases),
  	thunkMiddleware))
);

export default store;
