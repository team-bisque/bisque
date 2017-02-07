'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();
const firebase = require('./firebase');

class Tabs {
    // https://developer.chrome.com/extensions/tabs
    constructor(store) {
        this.store            = store;
        this.onCompleteState  = this.onCompleteState.bind(this);
    }

    init(){
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            this.onCompleteState(tabId, changeInfo, tab);
        });
    }

    onCompleteState(tabId, changeInfo, tab) {
        chrome.runtime.onConnect.addListener(port => {
            port.onMessage.addListener(msg => {
                if (this.store.getState().auth) {
                    const userId = this.store.getState().auth.uid;

                    // Next two lines ignore events triggered before keylogging begins.
                    const timeObject = msg.time ? new Date(msg.time) : null;
                    if (timeObject === null) return;

                    // Set firebase path.
                    const date = timeObject.getMonth() + 1 + '-' + timeObject.getDate() + '-' + timeObject.getFullYear();
                    const hour = timeObject.getHours().toString();
                    const path = ('user_history/' + userId + '/' + date + '/' + hour + '/' + tabId).toString();

                    firebase.database().ref(path).set({
                        cpm: msg.cpm, wpm: msg.wpm, url: msg.url
                    })
                }
            })
        })

        if (tab.url.indexOf('chrome://') === -1 && changeInfo.status === 'complete') {
            chrome.tabs.executeScript(tabId, {
                // code: "document.body.style.backgroundColor='red'",
                file: "keyLogger.js",
                runAt: 'document_idle'
            })
        }
    }

    createAndLock(){
        return chromep.tabs.create({})
            .then(()=>chromep.tabs.query({ active: true }))
            .then(res=>res[0])
    }
}

module.exports = Tabs;