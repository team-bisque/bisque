'use strict';

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

var toggle = false;
const breakURL = 'http://youtube.com';
let app = {
  toggle: false,
  working: true,
  workDuration: 10000,
  breakDuration: 5000
}

function breakStarts() {
  console.log('breakStarts')  
  setTimeout(() => {
    chromep.tabs.query({active:true})
      .then(tab => {
      	console.log('breakStarts' , tab)
      	return chromep.tabs.remove(tab[0].id)
      })
      .then(workStarts)
      .catch(console.error)
  }, app.breakDuration);
}

function workStarts() {
  console.log('workStarts')

  setTimeout(() => {
    return chromep.tabs.create({url: breakURL})
      .then(breakStarts)
  }, app.workDuration)
}

chrome.browserAction.onClicked.addListener(function(tab) {

  console.log('browserAction.onClicked', tab)
  if (app.toggle) {
    console.log('Toggle off')
    chrome.browserAction.setIcon({ path: `icon.png`, tabId: tab.id });    
  } else {
    console.log('Toggle on')
    chrome.browserAction.setIcon({ path: `icon.png`, tabId: tab.id });
    workStarts()
  }
  app.toggle = !app.toggle;
  
});
