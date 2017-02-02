'use strict';
const Storage = require('./storage');
const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Auth extends Storage {
	constructor() {
		super();
		console.log('Auth Class', this);
	}

	authenticate(interactive){		
		const { firebase } = this;

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