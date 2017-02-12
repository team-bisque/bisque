'use strict';
import { receiveUser }  from '../action-creators/auth';
import { receiveHistory } from '../action-creators/history';
import { receiveDuration } from '../action-creators/status';
import { fetchTasks } from '../action-creators/tasks';
import store         		 from '../store';

import { setRoute } from '../action-creators/route';

const { firebaseAuth, firebaseDb, GoogleAuthProvider } = require('../firebase');
// const firebase = require('./firebase');
const User = require('./user');

const Auth = {

	onAuthStateChanged: ()=>{
		firebaseAuth.onAuthStateChanged(user => {
		  if (user) {
				const userId = user.uid;
				store.dispatch(receiveUser(user));
				store.dispatch(receiveHistory());
				store.dispatch(receiveDuration());
				store.dispatch(fetchTasks());
				store.dispatch(setRoute(null));
				
				// do not reload!! it looks like app has glitch
				// chrome.tabs.reload();
			} else {
				store.dispatch(receiveUser(null))
				store.dispatch(setRoute('signin'))
			}
		})
	},

	authenticate:(interactive)=>{
		chrome.identity.getAuthToken({
			interactive: !!interactive
		}, token => {
			if (chrome.runtime.lastError && !interactive) {
      	console.error('It was not possible to get a token programmatically.');
    	} else if (chrome.runtime.lastError) {
				throw new Error(chrome.runtime.lastError);
	    } else if (token) {
	      // Authrorize Firebase with the OAuth Access Token.
	      console.log('token', token)
	      var credential = GoogleAuthProvider.credential(null, token);
	      console.log('credential', credential)
	      firebaseAuth.signInWithCredential(credential)
	      .then(user => {
	      	console.log(user);
	      	let defaultSettings = {
	      		workDuration: 300000,
	      		breakDuration: 300000,
	      		lunchDuration: 300000,
	      		greylist: {
	      			0: 'facebook.com',
	      			1: 'youtube.com'
	      		}
	      	}
	      	firebaseDb.ref('users/' + user.uid).set(defaultSettings)
	      })
	      .catch(error => {
	        // The OAuth token might have been invalidated. Let's remove it from cache.

	        console.error(error)
	        if (error) {
	          chrome.identity.removeCachedAuthToken({token: token}, function() {
	            this.authenticate(interactive);
	          });
	        }
	      });
	    } else {
	      console.error('The OAuth Token was null');
	    }
		})
	}
}

module.exports = Auth;
