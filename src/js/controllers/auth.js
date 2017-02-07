'use strict';
import { authenticate }  from '../action-creators/auth';
import store         		 from '../store';
import { receiveHistory, receiveSettings } from '../action-creators/db';

const firebase = require('./firebase');
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Auth {

	onAuthStateChanged(){
		firebase.auth().onAuthStateChanged(user => {
		  if (user) {
				const userId = user.uid;

				store.dispatch(authenticate(user));

				firebase.database().ref('user_history/' + userId).once('value', (snapshot) => {
					store.dispatch(receiveHistory(snapshot.val()));
				});

				firebase.database().ref('users/' + userId).once('value', (snapshot) => {
					store.dispatch(receiveSettings(snapshot.val()));
				});

			} else store.dispatch(authenticate(null));
		})
	}

	authenticate(interactive){
		chrome.identity.getAuthToken({
			interactive: !!interactive,
			scopes: ['profile', 'email']
		}, token => {
			if (chrome.runtime.lastError && !interactive) {
    	} else if (chrome.runtime.lastError) {
				throw new Error(chrome.runtime.lastError);
	    } else if (token) {
	      // Authrorize Firebase with the OAuth Access Token.
	      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
	      firebase.auth().signInWithCredential(credential)
	      .catch(error => {
	        // The OAuth token might have been invalidated. Let's remove it from cache.
	        if (error.code === 'auth/invalid-credential') {
	          chrome.identity.removeCachedAuthToken({token: token}, function() {
	            startAuth(interactive);
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
