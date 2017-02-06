'use strict';

// Provides redux store to newtab.js
import { wrapStore } from 'react-chrome-redux';
import store from './store';
wrapStore(store, {portName: '1337'});

// Creates a new tab when tray icon is clicked
chrome.browserAction.onClicked.addListener(() => {
  return chrome.tabs.create({});
});

const Core = require('./controllers/Core');
const core = new Core(store);
core.init();
