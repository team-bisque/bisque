'use strict';

/*
 * ==========
 * WebRequest
 * ==========
 *  Handles events on user web request.
 */

// const User = require('./user');
import { increaseVisits } from '../action-creators/history';
import store from '../store';

const WebRequest = () => {


  function increaseVisitsHandler(request) {
    // Filters URLs down to the main domain before pushing to sitesVisited
    console.log('increaseVisits',request, store)
    // if (request.url.indexOf('chrome-extension://') > -1) return;
    let baseURL = request.url.split('/')[2];
    store.dispatch(increaseVisits(new Date(), baseURL))
    // return User.history.increaseVisits(baseURL);
  }

  function redirectUrl() {
    return { redirectUrl: 'javascript:' };
  }

  return {
    visitCounter: function(tab) {
      chrome.webRequest.onCompleted.removeListener(increaseVisitsHandler);
      chrome.webRequest.onCompleted.addListener(
        increaseVisitsHandler, {
          urls: ['https://*/*', 'http://*/*'],
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
