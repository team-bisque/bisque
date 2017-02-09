'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();
const firebase = require('./firebase');

import store from '../store';

class Tabs {

    // https://developer.chrome.com/extensions/tabs
    constructor () {
        this.greylist = [];
        this.sitesVisited = [];

        this.siteTracker             = this.siteTracker.bind(this);
        this.keyloggerSetup          = this.keyloggerSetup.bind(this);
        this.calculateGreylistVisits = this.calculateGreylistVisits.bind(this);
        this.setFirebasePath         = this.setFirebasePath.bind(this);
        this.findTime                = this.findTime.bind(this);
        this.checkDuplicates         = this.checkDuplicates.bind(this);
        this.filterDomain            = this.filterDomain.bind(this);
    }

    _init () {

        // Listens for page navigation and identifies greylisted sites
        chrome.tabs.onUpdated.addListener(tab => {
            this.siteTracker(tab);
        })
        
        // Listens for tab updates and ensures keylogger runs on each tab
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            this.keyloggerSetup(tabId, changeInfo, tab);
        })

        // Processes greylist visits to DB every 5 seconds.
        setInterval(() => {
            this.calculateGreylistVisits()
        }, 10000);
    }

    // KEYLOGGER METHODS
    // See keyLogger.js for content script side of process.

    keyloggerSetup (tabId, changeInfo, tab) {
        // Set up a listener for the keylogger script injected into a new tab

        chrome.runtime.onConnect.addListener(port => {
            port.onMessage.addListener(msg => {
                // If user is not logged in, don't process output from the keylogger script
                if (!store || !store.getState().auth) return;

                // Next two lines ignore events triggered before keylogging begins.
                const timeObject = msg ? this.findTime(msg) : null;
                if (timeObject === null) return;

                const dbPath = this.setFirebasePath(timeObject);

                firebase.database().ref(dbPath + 'tabs/' + tab.id).set({
                    cpm: msg.cpm, wpm: msg.wpm, url: msg.url
                })
            })
        })

        // Inject keylogger/content script into tab
        // This sets up the keylogger
        if (tab.url.indexOf('chrome://') === -1 && changeInfo.status === 'complete') {
            chrome.tabs.executeScript(tabId, {
                // code: "document.body.style.backgroundColor='red'",
                file: "keyLogger.js",
                runAt: 'document_idle'
            })
        }
    }

    // GREYLIST METHODS

    siteTracker (tab) {
        const id = tab.id;

        chrome.webRequest.onCompleted.addListener(request => {
            if (!store || !store.getState().auth) return;

            // Filters URLs down to the main domain before pushing to sitesVisited
            if (request.url.indexOf('chrome-extension://') > -1) return;

            // Filters main domain out of request URL
            const filteredDomain = this.filterDomain(request);

            // Checks if url is in greylist
            const inGreylist = this.onGreylist(filteredDomain);
            if (!inGreylist) return;

            // Checks if request is already registered in this.sitesVisited
            const dupeCheck = this.checkDuplicates(request);
            if (dupeCheck) return;

            const siteVisited = {[request.requestId]: [filteredDomain]};
            this.sitesVisited.push(siteVisited);
        },
        { urls: ["<all_urls>"], tabId: id, types: ["main_frame"] },
        ["responseHeaders"])
    }

    checkDuplicates (request) {
        // Removes duplicate sites visited (side effect of the Chrome onCompleted listener)
        const duplicateList = this.sitesVisited.filter(existingReq => {
                                  const existingReqId = Object.keys(existingReq)[0].toString();
                                  return existingReqId === request.requestId})
                              .map(req => Object.keys(req)[0])
        
        if (duplicateList.indexOf(request.requestId) > -1) return true;

        return false;
    }

    filterDomain (request) {
        // Filters a URL down to the primary domain
        const searchRegEx = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i;
        const domainMatches = request.url.match(searchRegEx);
        let filteredDomain = domainMatches && domainMatches[1];
        filteredDomain = filteredDomain.replace(/\./g, '-');

        return filteredDomain;
    }

    onGreylist (request) {
        // if (!this.greylist.length) this.greylist = store.getState().greylist;

        let filteredUrl;
        let numHyphens = (request.match(/\-/g) || [])

        if (numHyphens.length > 1) {
            filteredUrl = request.slice(request.indexOf('-')+1, request.lastIndexOf('-'));
        } else if (numHyphens.length === 1 && request.indexOf('www-') > -1) {
            filteredUrl = request.slice(request.indexOf('-')+1)
        } else if (numHyphens.length === 1 && !(request.indexOf('www-') > -1)) {
            filteredUrl = request.slice(0, request.indexOf('-'));
        }

        const result = store.getState().greylist.filter(entry => entry.indexOf(filteredUrl) > -1).length > 0

        return result;
    }

    calculateGreylistVisits () {
        // If user is not logged in, don't calculate their greylist visits
        if (!this.sitesVisited || !store || !store.getState().auth) return; 

        let greylistVisits = {};
        this.sitesVisited.map(req => {
            const site = Object.values(req)[0][0];
            if (greylistVisits[site]) greylistVisits[site]++;
            else (greylistVisits[site] = 1);
        });

        // Reset container of visited sites after processing
        this.sitesVisited = [];

        // Send processred results to DB
        this.sendGreylistVisitsToDB(greylistVisits);
    }

    sendGreylistVisitsToDB (visits) {
        const time = this.findTime();
        const dbPath = this.setFirebasePath(time);

        for (let entry in visits) {
            firebase.database().ref(dbPath + 'greylist' + entry).once('value')
            .then(snapshot => {
                firebase.database().ref(dbPath + 'greylist/' + entry).transaction((currentData) => {
                    if (!currentData) return visits[entry];
                    else return visits[entry]+1;
                }, function (error, committed, snapshot) {
                    if (error) console.error(error);
                }, true);
            })
        }
    }

    // UTILITY METHODS

    findTime (msg) {
        // msg argument is optional; for use with keylogger only 
        return msg ? new Date(msg.time) : new Date();
    }

    setFirebasePath (timeObject) {
        const userId = store.getState().auth.uid;
        const date = timeObject.getMonth() + 1 + '-' + timeObject.getDate() + '-' + timeObject.getFullYear();
        const hour = timeObject.getHours().toString();

        const dbPath = ('user_history/' + userId + '/' + date + '/' + hour + '/').toString();

        return dbPath;
    }

    createAndLock(){
        return chromep.tabs.create({})
            .then(()=>chromep.tabs.query({ active: true }))
            .then(res=>res[0])
    }
}

module.exports = Tabs;