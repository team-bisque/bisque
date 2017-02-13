'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();
const _ = require('lodash');
const moment = require('moment');

import { setHistory } from '../action-creators/history'
import store from '../store';

class Tabs {
  // https://developer.chrome.com/extensions/tabs
  constructor() {
    this.keyloggerSetup = this.keyloggerSetup.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  _init() {
    // Listens for tab updates and ensures keylogger runs on each tab
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status && changeInfo.status === "complete") {
        this.keyloggerSetup(tabId, changeInfo, tab);
      }
    })

  }

  // KEYLOGGER METHODS
  // See keyLogger.js for content script side of process.
  onMessage(port) {
    port.onMessage.addListener(msg => {
      store.dispatch(setHistory(new Date(), msg))
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
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
        }
      })
    }
  }
}

module.exports = Tabs;
