'use strict';
import store         		 from '../store';
import { receiveHistory } from '../action-creators/history';
import { receiveDurations } from '../action-creators/status';
import { receiveGreylist } from '../action-creators/greylist';

const { firebaseDb } = require('../firebase');
// const firebase = require('./firebase');
const moment = require('moment');
const _ = require('lodash');

var User = {
	settings: {},
	history: {},
	greylist: {}
};

function isGreylist (url) {

	let result = false;
	store.getState().greylist.forEach(greylist => {
		console.log(greylist)
      if(greylist.includes(url.replace('www.',''))) result = true;
  })
  return result;
}

// set functions (returns promise value)
User.settings.set = (userId, data) => firebase.database().ref('users/'+userId).set(data)
		// .then((res)=>(console.log('USER SETTTING SET:', res)))
		// .catch(console.error)

User.greylist.set = (userId, data) => (
	firebaseDb.ref(`users/${userId}/greylist`).set(data)
		// .then((res)=>(console.log('USER GREYLIST SET:', res)))
		// .catch(console.error)
);

User.history.set = (data, time) => {
	if (!data) Error('data is required');
	if (!data.url) Error('data url is required');
	if (!time) time = Error('time is required');
	const userId = store.getState().auth.uid,
				history = store.getState().history;
	
	let date = moment(time).format('MM-DD-YYYY'),
			hour = time.getHours(),
			refPath = `user_history/${userId}/${date}/${hour}`;

	console.log('User.history.set : DATA', data)
	let dataset = [],
			newData = {
				cpm: data.cpm || 0,
				wpm: data.wpm || 0,
				url: data.url,
				visits: data.visits,
				isGreylist: data.isGreylist || isGreylist(data.url)
			};

	console.log('User.history.set : newDATA', newData)

	if(history[date] && history[date][hour]) {
      dataset = history[date][hour];
      // if data url already exists findIndex will return index of object in array or -1 if doesn't exist
      let index = _.findIndex(dataset, o => o.url === data.url);

      if(index === -1){
          // push a new dataset to array
          dataset.push(newData);
      } else {
          // update existing dataset 
          newData.cpm = dataset[index].cpm !== newData.cpm ? _.mean([dataset[index].cpm, newData.cpm]) : dataset[index].cpm;
          newData.wpm = dataset[index].wpm !== newData.wpm ? _.mean([dataset[index].cpm, newData.wpm]) : dataset[index].wpm;
          newData.url = dataset[index].url;
          newData.visits = newData.visits.length ? newData.visits : dataset[index].visits;
          dataset[index] = newData;
      }
      
  } else {
      dataset.push(newData);
  }
  console.log('User.history.set : dataset', data, time, dataset)
	return firebaseDb.ref(refPath).set(dataset);
		// .then((res)=>(console.log('USER HISTORY SET:', res)))
		// .catch(console.error)
};

User.history.increaseVisits = (url) => {
	if (!url) Error('url is required');
	let time = new Date();
	let history = store.getState().history;

	let date = moment(time).format('MM-DD-YYYY'),
			hour = time.getHours();

	let tempData = { 
		url: url,
		visits: 1
	}
	console.log('increaseVisits',history[date],history[date][hour])
	if(!history[date] || !history[date][hour]) {
		return User.history.set(tempData, time);
	} else {
		let index = _.findIndex(history[date][hour], o => o.url === url);		
		if(index === -1) return User.history.set(tempData, time);
		else {
			let visits = history[date][hour][index].visits;

			console.log('increaseVisits',visits + 1)
    	return User.history.set({ 
        	url: url, 
        	visits: visits + 1
        }, time);
		}
	}
}

// get functions
User.history.getById = userId => {
	return new Promise((resolve, reject) => {
		firebaseDb.ref('user_history/' + userId).on('value', (snapshot) => {
			if(snapshot){
				store.dispatch(receiveHistory(snapshot.val()));
				resolve(snapshot.val());
			} else {
				reject(Error('no data'));
			}
		});
	}).then((res)=>{
		// console.log('USER HISTORY GET BY ID:', res)
		return res;
	}).catch(console.error);
};

User.settings.getById = userId => {
	return new Promise((resolve, reject) => {
		firebaseDb.ref('users/' + userId).on('value', (snapshot) => {
			if(snapshot){
				const settings = _.pickBy(snapshot.val(), (value, key) =>{
					return key !== "greylist";
				});
				const greylist = snapshot.val().greylist;

				// console.log('greylist',greylist)
				resolve({ settings, greylist });
			} else {
				reject(Error('no data'));
			}
		});
	}).then((res)=>{
			// console.log('USER SETTING GET BY ID:', res);
			store.dispatch(receiveDurations(res.settings));
			store.dispatch(receiveGreylist(res.greylist));
			return res;
	}).catch(console.error);
};

module.exports = User;
