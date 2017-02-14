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

var Notifications = require('./notifications');
var notification = new Notifications();

const WebRequest = () => {


  function increaseVisitsHandler(request) {
    // Filters URLs down to the main domain before pushing to sitesVisited
    console.log('increaseVisits',request, store)
    // if (request.url.indexOf('chrome-extension://') > -1) return;
    let baseURL = request.url.split('/')[2];
    store.dispatch(increaseVisits(new Date(), baseURL));
    // return User.history.increaseVisits(baseURL);
  }

  // consider placing it in util
  function isGreylist (url) {

    let result = false;
    store.getState().greylist.forEach(greylist => {
      // console.log(greylist)
      console.log(url.replace('www.','').includes(greylist.url));
      if(greylist.isBlocked && url.replace('www.','').includes(greylist.url)) result = true;
    })
    return result;
  }

  function redirectUrl(request) {
    return { redirectUrl: 'javascript:' };
  }
  function redirectBisque(request) {    
    // increaseVisitsHandler(request);
    notification.greylistAttempt(request.url); 
    return { redirectUrl: 'chrome://newtab/' };
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
    blockGreylist: function(){
      console.log('BLOCK GREYLIST!!!');
      chrome.webRequest.onBeforeRequest.addListener(
        redirectBisque, {
          urls: ['*://www.buzzfeed.com/*']
        }, ['blocking']
      );
    },
    blockAll: function() {
      console.log('BLOCK ALL!!!');
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
