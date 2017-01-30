'use strict';
const ChromePromise = require('chrome-promise'),
      webRequest    = require('./webRequest');
const chromep = new ChromePromise();

class Tabs {
    // https://developer.chrome.com/extensions/tabs
    constructor() {
        this.locked = false;
        this.lockedTab = {}
        this.forceActivateLockedTab = this.forceActivateLockedTab.bind(this)
    }

    // Tab functions

    setLockedTab (tab) {
        this.lockedTab = tab;
    }

    remove(tabId){
        if(this.lockedTab.id && tabId === this.lockedTab.id) this.removeEvent('onActivated', this.forceActivateLockedTab)
        return chromep.tabs.remove(tabId)
    }

    createAndLock(){
        return chromep.tabs.create({})
            .then(()=>chromep.tabs.query({ active: true }))
            .then(res=>res[0])
            .then(tab=>this.setLockedTab(tab))
            .then(()=>this.addEvent('onActivated', this.forceActivateLockedTab));
    }

    // Event Emitter
    addEvent(eventType, callback){
        chrome.tabs[eventType].addListener(callback);
    }

    removeEvent(eventType, callback){
        chrome.tabs[eventType].removeListener(callback);
    }

    // Event Callback
    forceActivateLockedTab(activeInfo){
        if(activeInfo.tabId )
        return chromep.tabs.update(this.lockedTab.id, { active:true });
    }   
}

module.exports = Tabs;