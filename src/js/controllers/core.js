'use strict';
import { setTimeRemaining, togglePause } from '../action-creators/status';
import { fetchWeather } from '../action-creators/weather';
import { wrapStore } from 'react-chrome-redux';

import store from '../store';
import firebase from './firebase';
wrapStore(store, {portName: '1337'});

const 	Tabs 			= require('./Tabs'),
		WebRequest 		= require('./WebRequest'),
		Notifications 	= require('./Notifications'),
		Idle 			= require('./Idle'),
		Greylist 		= require('./Greylist'),
		Auth 			= require('./Auth');

class Core {
	constructor() {
		this.tabs = new Tabs();
		this.webRequest = new WebRequest();
		this.auth = new Auth();
		this.notifications = new Notifications();
		this.idle = new Idle();
		this.greylist = new Greylist();
	}

	init(){
		const { dispatch } = store;

		this.tabs._init(); // <-- for keylogger;
		this.idle._init(); // <-- detects whether user is idle

		
		this.auth.onAuthStateChanged();

		dispatch(fetchWeather());

		if (!store.getState().auth) {
			this.notifications.login();
		} else {
			this.notifications.welcome();
		}

		this.watchMinute();
	}

	watchMinute(){
		const { dispatch, getState } = store
		const minute = 60000; // 5 seconds for testing

		setInterval(() => {
			if (!getState().status.isPaused) {
				// Deprecate time remaining by 1 minute and dispatch to store
				const time = getState().status.timeRemaining - minute;
				dispatch(setTimeRemaining(time));

				if (time === 5 * minute) { // 5 Minutes
					console.log(time);
					this.notifications.warning();
				}
				else if (time === 0) {
					console.log(time);
					this.notifications.statusChange();
				}
				else if (time === -5 * minute) {
					console.log(time);
					this.notifications.whereAreYou();
					dispatch(togglePause());
				}
			} else {
        // When paused, interval keeps running -- but does nothing
				console.log('We are paused');
			}
		}, 5000); // 5 seconds for testing
	}
}

module.exports = Core;
