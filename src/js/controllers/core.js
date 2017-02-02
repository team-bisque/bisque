'use strict';
import { setTimeRemaining } from '../action-creators/time';
import { toggleWork } 	 	from '../action-creators/status';
import { fetchWeather } 	from '../action-creators/weather';
import { receiveData }		from '../action-creators/db';

const Tabs 			= require('./tabs'),
	  Auth			= require('./auth'),
	  WebRequest 	= require('./webRequest'),
	  Notifications = require('./notifications'),
	  Idle 			= require('./idle'),
	  Greylist 		= require('./greylist'),
	  firebase      = require('./firebase');



class Core {
	constructor(store) {
		this.tabs 			= new Tabs(store);
		this.webRequest 	= new WebRequest();
		this.auth = new Auth();
		this.notifications 	= new Notifications(store);
		this.idle 			= new Idle();
		this.greylist 		= new Greylist();
		this.store 			= store;
	}

	init(){
		let { dispatch, getState } = this.store;

		const storedData = firebase.database().ref().once('value', (snapshot) => snapshot);

		this.notifications.welcome();
		this.idle._init();
		this.auth.onAuthStateChanged();
		dispatch(fetchWeather(10004));
		dispatch(receiveData(storedData))
		dispatch(setTimeRemaining(getState().time.workDuration));

		this.watchMinute();
	}

	watchMinute(){
		let { dispatch, getState } = this.store,
				minute = getState().time.timeRemaining;

		setInterval(() => {
			// When paused, interval keeps running -- but does nothing
			if (!getState().status.pause) {
				let remaining = getState().time.timeRemaining - 60000;
				dispatch(setTimeRemaining(remaining));
				if (remaining === (1000 * 60 * 5))
					this.notifications.warningRemaining(remaining);
				if (remaining === 0) this.setStatus();
			}
		}, minute);
	}

	setStatus(){
		let { dispatch, getState } = this.store;

		dispatch(toggleWork());
		const isWorking = getState().status.isWorking;
		if(isWorking){
			dispatch(setTimeRemaining(getState().time.workDuration));
			this.workStarts();
		} else {
			dispatch(setTimeRemaining(getState().time.breakDuration));
			this.breakStarts();
		}
	}

	breakStarts(){
		// let tabs = this.tabs, webRequest = this.webRequest;
		// tabs.createAndLock()
      	// .then(() => webRequest.addOnBeforeRequestEvent()).catch(console.error);
	}

	workStarts(){
		// let tabs = this.tabs, webRequest = this.webRequest;
		// tabs.remove(tabs.lockedTab.id)
		// 	.then(() => webRequest.removeOnBeforeRequestEvent())
		// 	.catch(console.error);
	}
}

module.exports = Core;
