// testing chrome storage

'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

import { firebaseKey } from '../apiKeys';
import { receiveFirebase } from '../action-creators/firebase';
// const firebase = require('firebase')

// firebase.initializeApp({
//   apiKey: firebaseKey,
//   authDomain: 'go-outside-76d86.firebaseapp.com',
//   databaseURL: 'https://go-outside-76d86.firebaseio.com',
//   storageBucket: 'go-outside-76d86.appspot.com',
//   messagingSenderId: '75953039302'
// });


class Storage {
	// https://developer.chrome.com/extensions/storage
	constructor(store){
    this.firebase = require('firebase');
    this.store = store;
	}

  init(){
    this.firebase.initializeApp({
      apiKey: firebaseKey,
      authDomain: 'go-outside-76d86.firebaseapp.com',
      databaseURL: 'https://go-outside-76d86.firebaseio.com',
      storageBucket: 'go-outside-76d86.appspot.com',
      messagingSenderId: '75953039302'
    });

    
    var database = this.firebase.database();
    // console.log('database', database)

    // console.log('ref', database.ref('testName').path.o)
    
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