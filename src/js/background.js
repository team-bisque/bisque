'use strict';

// Provides redux store to newtab.js
import { wrapStore }  from 'react-chrome-redux';
import store          from './store';
wrapStore(store, {portName: '1337'});

import {authenticated} from './action-creators/auth';

// Creates a new tab when tray icon is clicked
chrome.browserAction.onClicked.addListener(() => {
  return chrome.tabs.create({});
});


const Core = require('./controllers/core');
const core = new Core(store);
core.init();

const firebro = core.storage.firebase;

// Listens for change in firebase auth
firebro.auth().onAuthStateChanged(user => {
  if (user) store.dispatch(authenticated(user));
  else store.dispatch(authenticated(null));
});

export {firebro};