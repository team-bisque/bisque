'use strict';
import { authenticate }  from '../action-creators/auth';
import store         		 from '../store';

const firebase = require('./firebase');
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Auth {

	onAuthStateChanged(){
		console.log('onAuthStateChanged')
		firebase.auth().onAuthStateChanged((user) => {
			console.log(user);
		  if (user) store.dispatch(authenticate(user));
		  else store.dispatch(authenticate(null));
		})
	}

	authenticate(interactive){		
		chrome.identity.getAuthToken({
			interactive: !!interactive,
			scopes: ['profile', 'email']
		}, token => {
			if (chrome.runtime.lastError && !interactive) {
      	console.log('It was not possible to get a token programmatically.');
    	} else if (chrome.runtime.lastError) {
	      console.error(chrome.runtime.lastError);
	    } else if (token) {
	      // Authrorize Firebase with the OAuth Access Token.
				console.log('HELLO');
	      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
	      firebase.auth().signInWithCredential(credential)
	      .catch(error => {
	        // The OAuth token might have been invalidated. Lets' remove it from cache.
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
