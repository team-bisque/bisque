'use strict';

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

let app = {
  toggle: false,
  working: true,
  workDuration: 3000,
  breakDuration: 10000
};

function breakStarts() {
  console.log('breakStarts');
  setTimeout(() => {
    chromep.tabs.query({active: true})
      .then(tab => {
        console.log('breakStarts', tab);
        return chromep.tabs.remove(tab[0].id);
      })
      .then(workStarts)
      .then(removeCancelRequestListener)
      .catch(console.error);
  }, app.breakDuration);
}

function workStarts() {
  console.log('workStarts');

  setTimeout(() => {
    return chromep.tabs.create({})
      .then(breakStarts)
      .then(setCancelRequestListener)
      .catch(console.error);
  }, app.workDuration);
}

function cancelAllRequests(detail) {
  console.log(detail)
  return {redirectUrl: 'javascript:'}
}

function setCancelRequestListener() {
  chrome.webRequest.onBeforeRequest.addListener(cancelAllRequests, {urls: ['https://*/*', 'http://*/*']}, ['blocking']);
}

function removeCancelRequestListener() {
  chrome.webRequest.onBeforeRequest.removeListener(cancelAllRequests);
}

chrome.browserAction.onClicked.addListener(function(tab) {

  if (app.toggle) {
    console.log('Toggle off');
    chrome.browserAction.setIcon({ path: `icon.png`, tabId: tab.id });
  } else {
    console.log('Toggle on');
    chrome.browserAction.setIcon({ path: `icon.png`, tabId: tab.id });
    workStarts();
  }
  app.toggle = !app.toggle;

});
