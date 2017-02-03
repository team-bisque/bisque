// testing chrome idle

'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

/*
 * Idle : tracks user idle state on chrome browser
 * ================================================
 * https://developer.chrome.com/extensions/idle
 */
class Idle {
  constructor(store){
    this.store = store;
    this.DetectionInterval = 15;    
  }

  _init(){
    this.setDetectionInterval(this.DetectionInterval);
    this.onStateChanged();
    this.queryState();
  }

  setDetectionInterval(value){
    chrome.idle.setDetectionInterval(15);
  }

  queryState(){
    return chromep.idle.queryState(15)
  }

  onStateChanged(){
    chrome.idle.onStateChanged.addListener(newState => {
      console.log('Idle: onStateChanged - ', newState);
    });
  }
}

module.exports = Idle;