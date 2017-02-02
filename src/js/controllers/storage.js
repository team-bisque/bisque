// testing chrome storage

'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

// import React from 'react';
import { firebaseConfig } from '../apiKeys';
import { receiveData } from '../action-creators/firebase';
import { connect } from 'react-redux';

class Storage {
	// https://developer.chrome.com/extensions/storage
	constructor(store){
    this.database = require('firebase').initializeApp(firebaseConfig).database();
    this.store = store;
	}

  init(){
    const dispatchData = this.store.dispatch.bind(this);

    const data = this.database.ref().once('value', function (snapshot) {
      dispatchData(receiveData(snapshot.val()));
    })
  }

  get(tableRef, value) {
    return this.database.ref(tableRef).once(tableRef, function (snapshot) {
      return snapshot.val();
    })
  }


  set(tableRef, value) {
    this.database().ref(tableRef).set(value, () => {
      return true;
    });
  }
}

module.exports = Storage;

// const mapDispatch = dispatch => ({receiveData: (data) => dispatch(receiveData(data))})
// export default connect(mapDispatch)(Storage)
