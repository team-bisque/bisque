'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();
// const firebase = require('./firebase');
// const User = require('./user');
const _ = require('lodash');
const moment = require('moment');

import { setHistory } from '../action-creators/history'
import store from '../store';

class Tabs {

//<<<<<<< HEAD
  // https://developer.chrome.com/extensions/tabs
  constructor() {
    // this.greylist = [];
    // this.sitesVisited = [];
    // this.url = '';    
    this.keyloggerSetup = this.keyloggerSetup.bind(this);
    this.setFirebasePath = this.setFirebasePath.bind(this);
    this.findTime = this.findTime.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  _init() {
    // Listens for tab updates and ensures keylogger runs on each tab
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      // console.log('chrome.tabs.onUpdated', tabId, changeInfo)
      if (changeInfo.status && changeInfo.status === "complete") {
        // console.log("EventListenr is added")
        this.keyloggerSetup(tabId, changeInfo, tab);
      }
    })

  }

  // KEYLOGGER METHODS
  // See keyLogger.js for content script side of process.
  onMessage(port) {
    port.onMessage.addListener(msg => {
      store.dispatch(setHistory(new Date(), msg))
      // User.history.set(msg, new Date())
      //   .then(() => User.history.getById(store.getState().auth.uid))
      //   .catch(console.error)
    });
  }
  keyloggerSetup(tabId, changeInfo, tab) {
    // Set up listener in background for the port that the keyLogger script will set up on the tab
    // This listener receives keystrokes from the tab        
    chrome.runtime.onConnect.removeListener(this.onMessage);
    chrome.runtime.onConnect.addListener(this.onMessage);

    // Inject keylogger/content script into tab
    // This sets up the keylogger
    if (tab.url.indexOf('chrome://') === -1 && changeInfo.status === 'complete') {
      chrome.tabs.executeScript(tabId, {
        // code: "document.body.style.backgroundColor='red'",
        file: "contentScript.js",
        runAt: 'document_idle'
      }, (res) => {
        // console.log('keyloggerSetup RES', res)
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
        }
      })
    }
  }

  findTime(time) {
    // msg argument is optional; for use with keylogger only 
    return time ? new Date(time) : new Date();
  }

  setFirebasePath(timeObject) {
    const userId = store.getState().auth.uid;
    const date = timeObject.getMonth() + 1 + '-' + timeObject.getDate() + '-' + timeObject.getFullYear();
    const hour = timeObject.getHours().toString();

    const dbPath = ('user_history/' + userId + '/' + date + '/' + hour).toString();

    // console.log('setFirebasePath', dbPath)
    return dbPath;
  }

  createAndLock() {
    return chromep.tabs.create({})
      .then(() => chromep.tabs.query({ active: true }))
      .then(res => res[0])
  }
}

module.exports = Tabs;
