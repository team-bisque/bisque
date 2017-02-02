'use strict';
import { setTimeRemaining } from '../action-creators/time';
import { fetchWeather } 		from '../action-creators/weather';

const Tabs 					= require('./tabs'),
			WebRequest 		= require('./webRequest'),
			Notifications = require('./notifications'),
			Idle 					= require('./idle'),
			Greylist 			= require('./greylist'),
			Storage 			= require('./storage');

class Core {
	constructor(store) {
		// this.keyLogger 			= new KeyLogger();
		this.tabs 					= new Tabs(store);
		this.webRequest 		= new WebRequest();
		this.notifications 	= new Notifications(store);
		this.idle 					= new Idle();
		this.greylist 			= new Greylist();
		this.storage 				= new Storage(store);

		this.store 					= store;
	}

	init(){
		console.log('background.js core initiated');
		const { dispatch, getState } = this.store;

		this.tabs.init();
		this.idle.init();
		this.storage.init();

		dispatch(fetchWeather(10004));
		// if (!this.store.getState().auth) {
		// 	console.log('no user');
		// 	this.notifications.login();
		// } else {
			console.log('welcome notification');
			this.notifications.welcome();
		// }
		this.watchMinute();
	}

	watchMinute(){
		const { dispatch, getState } = this.store,
				minute = 60000; // 5 seconds for testing

		setInterval(() => {
			// When paused, interval keeps running -- but does nothing
			if (!getState().status.pause) {
				// Deprecate time remaining by 1 minute and dispatch to storee
				const time = getState().status.timeRemaining - 60000;
				dispatch(setTimeRemaining(time));

				if (time === 5 * minute) { // 5 Minutess
					this.notifications.warningNote();
				}
				else if (time === 0) {
					this.notifications.statusChange();
				}
				else if (time === -5 * minute) {
					this.notifications.whereAreYou();
					dispatch(setTimeRemaining(-1 * minute));
				}
			} else {
				console.log('We are paused');
			}
		}, 5000); // 5 seconds for testing
	}

	setStatus(){
		// let { dispatch, getState } = this.store;
		//
		// dispatch(toggleWork());
		// const isWorking = getState().status.isWorking;
		// console.log('setStatus', isWorking);
		// if (isWorking){
		// 	dispatch(setTimeRemaining(getState().time.workDuration));
		// 	this.workStarts();
		// } else {
		// 	dispatch(setTimeRemaining(getState().time.breakDuration));
		// 	this.breakStarts();
		// }
	}

	breakStarts(){
		// console.log('breakStarts', this)
		// let tabs 				= this.tabs,
		// 		webRequest 	= this.webRequest;
		//
		// tabs.createAndLock()
    //   .then(() => {
		// 		webRequest.addOnBeforeRequestEvent();
		// 	}).catch(console.error);
	}

	workStarts(){
	// 	console.log('workStarts', this)
	// 	let tabs 				= this.tabs,
	// 			webRequest 	= this.webRequest;
	//
	// 	tabs.remove(tabs.lockedTab.id)
	// 			.then(() => webRequest.removeOnBeforeRequestEvent())
	// 			.catch(console.error);
	}
}

module.exports = Core;
