import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';

// Alias actions send reqs for thunk actions to backend.js
import {alias} from 'react-chrome-redux';
import aliases from './action-creators/aliases';

const store = createStore(rootReducer,
  applyMiddleware(
    alias(aliases),
    thunkMiddleware
  )
);

export default store;
