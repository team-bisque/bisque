'use strict';
import { authenticate }  from '../action-creators/auth';
import { fetchTasks } from '../action-creators/tasks';
import store         		 from '../store';

import { setRoute } from '../action-creators/route';

const firebase = require('./firebase');
const User = require('./user');

const Auth = {

	onAuthStateChanged: ()=>{
		firebase.auth().onAuthStateChanged(user => {
		  if (user) {
				const userId = user.uid;

				store.dispatch(authenticate(user));

				User.history.getById(userId)
					.then(() => User.settings.getById(userId))
					.then(() => store.dispatch(fetchTasks()))
					.then(() => store.dispatch(setRoute(null)));

				chrome.tabs.reload();

			} else {
				store.dispatch(authenticate(null))
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
	      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
	      firebase.auth().signInWithCredential(credential)
	      .then(user => {
					let defaultSettings = {
						workDuration: 300000,
						breakDuration: 300000,
						lunchDuration: 300000,
						greylist: {
							0: 'facebook.com',
							1: 'youtube.com'
						}
					}
					firebase.database().ref('users/' + user.uid).set(defaultSettings)
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
