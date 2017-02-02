// testing chrome storage

'use strict';
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

import { firebaseKey } from '../apiKeys';
import { firebaseConfig } from '../apiKeys';
import { receiveFirebase } from '../action-creators/firebase';

class Storage {
	// https://developer.chrome.com/extensions/storage
	constructor(store){
    this.database = require('firebase').initializeApp(firebaseConfig).database();
    this.store = store;
	}

  init(){
    const dispatchData = this.store.dispatch.bind(this);
    var database = this.firebase.database();
    // console.log('database', database)

    // console.log('ref', database.ref('testName').path.o)
    
    this.store.dispatch(receiveFirebase({test:'asdf'}));
  }
  sync(){
  	
  }
  get(key, callback) {
  	chrome.storage.local.get(key, callback);
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