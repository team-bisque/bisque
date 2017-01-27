'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {wrapStore} from 'react-chrome-redux';

import store from './store';

wrapStore(store, {portName: '1337'});

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

let app = {
  toggle: false,
  working: true,
  breakTab: {},
  workDuration: 10000,
  breakDuration: 10000
};

function breakStarts() {
  let breakTab;

  app.working = false;
  console.log('Working', app.working);

  setTimeout(() => {  
      chromep.tabs.remove(app.breakTab.id)
        .then(()=>{
          app.breakTab = {}
          return removeTabActivatedListener()
        })
        .then(workStarts)                   // <== break timer starts
        .then(removeCancelRequestListener)  // <== remove event listener for all requesst
        .catch(console.error);
  }, app.breakDuration);
    
  console.log('breakStarts');

}

function workStarts() {
  
  app.working = true;

  console.log('Working', app.working);

  setTimeout(() => {
    return chromep.tabs.create({})
      .then(() => chromep.tabs.query({ active: true }))    // <== get active tab
      .then(tabs => {
        app.breakTab = tabs[0];
        return setTabActivatedListener();               // <== set event listener for tab onActived
      })  
      .then(setCancelRequestListener)                      // <== set event listener for all request      
      .then(breakStarts)                                   // <== break timer starts      
      .catch(console.error);
  }, app.workDuration);
}

// on tab actived events and callback
  function tabActivateCallback(activeInfo) {
    console.log('tabActivateCallback', activeInfo.tabId, app.breakTab.id)
    if(!app.breakTab.id && activeInfo.tabId === app.breakTab.id) return;
    chromep.tabs.update(app.breakTab.id, { active:true })
  };

  function setTabActivatedListener(){
    chrome.tabs.onActivated.addListener(tabActivateCallback)
  };

  function removeTabActivatedListener(){
    chrome.tabs.onActivated.removeListener(tabActivateCallback)
  };

// Redirect events and callback
  function cancelRequestCallback(detail) {return {redirectUrl: 'javascript:'}} 
    
  function setCancelRequestListener() {
    chrome.webRequest.onBeforeRequest.addListener(
      cancelRequestCallback, 
      {
        urls: ['https://*/*', 'http://*/*']
      }, 
      ['blocking']);
  }

  function removeCancelRequestListener() {
    chrome.webRequest.onBeforeRequest.removeListener(cancelRequestCallback);
  }


workStarts();

// chrome.browserAction.onClicked.addListener(function(tab) {

//   if (app.toggle) {
//     console.log('Toggle off');
//     chrome.browserAction.setIcon({ path: `icon.png`, tabId: tab.id });
//   } else {
//     console.log('Toggle on');
//     chrome.browserAction.setIcon({ path: `icon.png`, tabId: tab.id });
//     workStarts();
//   }
//   app.toggle = !app.toggle;

// });

import {fetchWeather} from './action-creators/weather';
store.dispatch(fetchWeather('10004'));

render(
  <Provider store={store}>
    <div/>
  </Provider>,
  window.document.getElementById('app-container')
);
