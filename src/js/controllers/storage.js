// testing chrome storage

'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

import { firebaseConfig } from '../apiKeys';
import { receiveFirebase } from '../action-creators/firebase';

class Storage {
	// https://developer.chrome.com/extensions/storage
	constructor(store){
    this.firebase = require('firebase');
    this.store = store;
	}

  init(){
    this.firebase.initializeApp(firebaseConfig);

    var database = this.firebase.database();

    this.store.dispatch(receiveFirebase(database.ref('testName').path.o))
  }
  sync(){

  }
  get(key, callback) {
  	chrome.storage.local.get(key, callback);
  }

  set(key, value) {
  	let data = {};
  			data[key] = value;
		chrome.storage.local.set(data);
  }

  onChanged(){
  	chrome.storage.onChanged.addListener((changes, areaName)=>{
  		alert('store has changed', changes, areaName)
  	})
  }
}

module.exports = Storage;
