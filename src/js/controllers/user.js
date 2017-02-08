'use strict';
import store         		 from '../store';
import { receiveHistory } from '../action-creators/history';
import { receiveSettings } from '../action-creators/settings';
import { receiveGreylist } from '../action-creators/greylist';

const firebase = require('./firebase');
const _ = require('lodash');

var User = {
	settings: {},
	history: {},
	greylist: {}
};

// set functions (returns promise value)
User.settings.set = (userId, data) => firebase.database().ref('users/'+userId).set(data)
		// .then((res)=>(console.log('USER SETTTING SET:', res)))
		// .catch(console.error)

User.greylist.set = (userId, data) => (
	firebase.database().ref(`users/${userId}/greylist`).set(data)
		// .then((res)=>(console.log('USER GREYLIST SET:', res)))
		// .catch(console.error)
);

User.history.set = (userId, data) => (
	firebase.database().ref('user_history/'+userId).set(data)
		// .then((res)=>(console.log('USER HISTORY SET:', res)))
		// .catch(console.error)
);

// get functions
User.history.getById = userId => {
	return new Promise((resolve, reject) => {
		firebase.database().ref('user_history/' + userId).once('value', (snapshot) => {
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
		firebase.database().ref('users/' + userId).once('value', (snapshot) => {
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
			store.dispatch(receiveSettings(res.settings));
			store.dispatch(receiveGreylist(res.greylist));
			return res;
	}).catch(console.error);
};

module.exports = User;