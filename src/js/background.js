'use strict';

// Initialize Firebase
import {firebaseKey} from './apiKeys';

firebase.initializeApp({
  apiKey: firebaseKey,
  authDomain: 'go-outside-76d86.firebaseapp.com',
  databaseURL: 'https://go-outside-76d86.firebaseio.com',
  storageBucket: 'go-outside-76d86.appspot.com',
  messagingSenderId: '75953039302'
});

console.log(firebase);

// Provides redux store to newtab.js
import { wrapStore }  from 'react-chrome-redux';
import store          from './store';
wrapStore(store, {portName: '1337'});

// Creates a new tab when tray icon is clicked
chrome.browserAction.onClicked.addListener(() => {
  return chrome.tabs.create({});
});

const Core = require('./controllers/core');
const core = new Core(store);
core.init();
