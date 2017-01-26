'use strict';

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

let app = {
  toggle: false,
  working: true,
  workDuration: 10000,
  breakDuration: 10000
};

function breakStarts() {
  let breakTab;
  setTimeout(() => {
      chromep.tabs.query({active: true})
        .then(tabs => {
          breakTab = tabs[0]
          removeTabActivatedListener(breakTab.id) // <== remove event listener for tab onActived
          return chromep.tabs.remove(breakTab.id)
        })
        .then(workStarts)                   // <== break timer starts
        .then(removeCancelRequestListener)  // <== remove event listener for all requesst
        .catch(console.error);
  }, app.breakDuration);
    
  console.log('breakStarts');

}

function workStarts() {
  console.log('workStarts');

  setTimeout(() => {
    return chromep.tabs.create({})
      .then(breakStarts)                                  // <== break timer starts
      .then(setCancelRequestListener)                     // <== set event listener for all request
      .then(()=>chromep.tabs.query({active: true}))       // <== get active tab
      .then((tabs)=>setTabActivatedListener(tabs[0].id))  // <== set event listener for tab onActived
      .catch(console.error);
  }, app.workDuration);
}

// on tab actived events and callback
  function tabActivateCallback(activeInfo, tabId) {
    console.log('tabActivateCallback', activeInfo.tabId, tabId)
    if(activeInfo.tabId === tabId) return;
    chrome.tabs.update(tabId, {active:true})
  };

  function setTabActivatedListener(tabId){
    chrome.tabs.onActivated.addListener((activeInfo)=>tabActivateCallback(activeInfo, tabId))
  }
  function removeTabActivatedListener(tabId){
    chrome.tabs.onActivated.removeListener((activeInfo)=>tabActivateCallback(activeInfo, tabId))
  }

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

