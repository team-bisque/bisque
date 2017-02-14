'use strict';
import { setHistory } from '../action-creators/history';
import store from '../store';


const Tabs = () => {
  // const ChromePromise = require('chrome-promise');
  // const chromep = new ChromePromise();
  let lockedTab = null;

  // Tab functions
  function query(options){
    return new Promise((resolve, reject) => {
      let result = [];
      chrome.tabs.query(options, (tabs) => {
        if(tabs && tabs.length){
          resolve(tabs)
        } else {
          reject(Error("no tab query result"));
        }
      });  
    });
  }

  function create(option = {}){
    return new Promise((resolve, reject) => {
      let result = [];
      chrome.tabs.create(options, (tab) => {
        if(tab){
          resolve(tab)
        } else {
          reject(Error("coudln't create new tab"));
        }
      });  
    });
  }

  function setLockedTab(tab = null) {
    if(tab){
      lockedTab = tab;
      chrome.tabs.onActivated.addListener(forceActivateLockedTab);
      chrome.tabs.onCreated.addListener(forceRemoveNewTab);
      chrome.tabs.onRemoved.addListener(forceCreateLockTab);      
    } else {      
      chrome.tabs.onActivated.removeListener(forceActivateLockedTab);
      chrome.tabs.onCreated.removeListener(forceRemoveNewTab);
      chrome.tabs.onRemoved.removeListener(forceCreateLockTab);
      lockedTab = null;
    }    
  }

  function lockTab(){    
    return query({ active: true, currentWindow: true })
      .then(res => res[0])
      .then(tab => {
        if(tab.url === "chrome://newtab/"){
          setLockedTab(tab);
        } else {
          return createAndLockTab();
        }
      });
  }

  function createAndLockTab() {
    return create()
      .then(() => chromep.tabs.query({ active: true, currentWindow: true }))
      .then(res => res[0])
      .then(tab => setLockedTab(tab));
  }

  function onMessage(port) {
    port.onMessage.addListener(msg => {
      store.dispatch(setHistory(new Date(), msg))
    });
  }

  function keyloggerSetup(tabId, changeInfo, tab) {

    // Set up listener in background for the port that the keyLogger script will set up on the tab
    // This listener receives keystrokes from the tab        
    chrome.runtime.onConnect.removeListener(onMessage);
    chrome.runtime.onConnect.addListener(onMessage);
    
    if (tab.url.indexOf('chrome://') === -1 && changeInfo.status === 'complete') {
      chrome.tabs.executeScript(tabId, {
        file: "contentScript.js",
        runAt: 'document_idle'
      }, (res) => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message);
        }
      })
    }
  }  

  function forceActivateLockedTab(activeInfo) {
    if (activeInfo.tabId) return chrome.tabs.update(lockedTab.id, { active: true });
  }


  function forceRemoveNewTab(tab) {
    // if locked Tab exists remove newly created tab
    if (lockedTab && lockedTab.id) return chrome.tabs.remove(tab.id);
  }

  function forceCreateLockTab(tabId, removeInfo) {
    let { getState } = store;
    let isWorking = getState().status.isWorking;

    if (lockedTab && lockedTab.id && tabId === lockedTab.id) {
      setLockedTab(null);
      if (!removeInfo.isWindowClosing && !isWorking) createAndLockTab();
    }

  }

  return {
    _init: () => {
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status && changeInfo.status === "complete") {
          keyloggerSetup(tabId, changeInfo, tab);
        }
      })
    },
    lockTab: lockTab,
    unlockTab: () => {
      setLockedTab();
    }
  }
}

module.exports = Tabs();
