'use strict';

/*
 * ==========
 * WebRequest
 * ==========
 *  Handles events on user web request.
 */

const User = require('./user');
const WebRequest = () => {

  function increaseVisits(request) {
    // Filters URLs down to the main domain before pushing to sitesVisited
    if (request.url.indexOf('chrome-extension://') > -1) return;
    let baseURL = request.url.split('/')[2];
    return User.history.increaseVisits(baseURL);
  }

  function redirectUrl() {
    return { redirectUrl: 'javascript:' };
  }

  return {
    visitCounter: function(tab) {
      // chrome.webRequest.onCompleted.removeListener(increaseVisits);
      chrome.webRequest.onCompleted.addListener(
        increaseVisits, {
          urls: ["<all_urls>"],
          // tabId: tab.id,
          types: ["main_frame"]
        }, ["responseHeaders"]
      );
    },
    block: function() {
      // chrome.webRequest.onCompleted.removeListener(redirectUrl);
      chrome.webRequest.onBeforeRequest.addListener(
        redirectUrl, {
          urls: ['https://*/*', 'http://*/*']
        }, ['blocking']
      );
    }
  }
}

module.exports = WebRequest();
