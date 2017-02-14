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
    console.log('increaseVisits',request, store)    
    let baseURL = request.url.split('/')[2];
    store.dispatch(increaseVisits(new Date(), baseURL));    
  }

  // consider placing it in util
  function isGreylist (url) {

    let result = false;
    store.getState().greylist.forEach(greylist => {      
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
      chrome.webRequest.onBeforeRequest.addListener(
        redirectBisque, {
          urls: ['*://www.buzzfeed.com/*']
        }, ['blocking']
      );
    },
    blockAll: function() {      
      chrome.webRequest.onBeforeRequest.addListener(
        redirectUrl, {
          urls: ['https://*/*', 'http://*/*']
        }, ['blocking']
      );
    }
  }
}

module.exports = WebRequest();
