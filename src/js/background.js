'use strict';

// Spy wrapper for chrome functions
// Activate only when testing or you will not be able to build
// const chrome = require('sinon-chrome/extensions');

// Provides redux store to newtab.js
import { wrapStore } from 'react-chrome-redux';
import store from './store';
wrapStore(store, {portName: '1337'});

// Creates a new tab when tray icon is clicked
chrome.browserAction.onClicked.addListener(() => {
  return chrome.tabs.create({});
});

const Core = require('./controllers/Core');
const core = new Core();
core._init();
