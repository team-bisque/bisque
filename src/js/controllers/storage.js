// testing chrome storage

'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Storage {
	// https://developer.chrome.com/extensions/storage
	constructor(){
	}

  sync(){
  	chrome.storage.sync;
  	// or sync with firebase
  	// read documentation
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