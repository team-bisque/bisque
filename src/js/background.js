'use strict';

import { wrapStore }  from 'react-chrome-redux';
import store          from './store';

// Provides redux store to newtab.js
wrapStore(store, {portName: '1337'});

// Creates a new tab when tray icon is clicked
chrome.browserAction.onClicked.addListener(() => {
  return chrome.tabs.create({});
});

const Core = require('./controllers/core');
const core = new Core(store);
core.init();
