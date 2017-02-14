'use strict';
import {
  RECEIVE_USER,
  TAB_ALIAS_AUTH
} from '../constants';

// const auth = require('../controllers/auth');

const { firebaseAuth, firebaseDb, GoogleAuthProvider } = require('../firebase');
export const authenticateAlias = () => ({
  type: TAB_ALIAS_AUTH
});

export const authenticate = () => dispatch => {
  chrome.identity.getAuthToken({
		interactive: true
	}, token => {
		if (chrome.runtime.lastError && !interactive) {
    	console.error('It was not possible to get a token programmatically.');
  	} else if (chrome.runtime.lastError) {
			throw new Error(chrome.runtime.lastError);
    } else if (token) {
      // Authrorize Firebase with the OAuth Access Token.
      var credential = GoogleAuthProvider.credential(null, token);	      
      firebaseAuth.signInWithCredential(credential)
      .then(user => {	      	
      	let defaultSettings = {
          settings: {
            workDuration: 300000,
            breakDuration: 300000,
            lunchDuration: 300000,  
            nuclear: false,
          },      		
      		greylist: {
      			0: {
              url: 'facebook.com',
              isBlocked: false
            },
      			1: {
              url: 'buzzfeed.com',
              isBlocked: true
            }
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

export const receiveUser = user => ({ type: RECEIVE_USER, user });
