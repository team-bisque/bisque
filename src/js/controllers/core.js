'use strict';
import { setTimeRemaining } from '../action-creators/time';
import { toggleWork } 			from '../action-creators/status';
import { fetchWeather } 		from '../action-creators/weather';
import { addFiveMinutes } 	from '../action-creators/time';

const Tabs 					= require('./tabs'),
			WebRequest 		= require('./webRequest'),
			Notifications = require('./notifications'),
			Idle 					= require('./idle'),
			Greylist 			= require('./greylist'),
			Storage 			= require('./storage'),
			KeyLogger 		= require('./keyLogger');



class Core {
	constructor(store) {
		this.keyLogger 			= new KeyLogger();
		this.tabs 					= new Tabs(store, {
			keyboard: this.keyLogger
		});
		this.webRequest 		= new WebRequest();
		this.notifications 	= new Notifications(store);
		this.idle 					= new Idle();
		this.greylist 			= new Greylist();
		this.storage 				= new Storage();
		
		this.store 					= store;
	}

	init(){
		console.log('background.js core initiated');
		let { dispatch, getState } = this.store;

		this.notifications.welcome();
		this.tabs.init();
		this.idle.init();
			
		dispatch(fetchWeather(10004));
		dispatch(setTimeRemaining(getState().time.workDuration));		
		this.watchMinute();
	}

	watchMinute(){
		let { dispatch, getState } = this.store,
				minute = 5000; //<=== 5 seconds for testing,  (1000 * 60);

		setInterval(()=>{
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
		console.log('setStatus', isWorking);
		if(isWorking){
			console.log('workDuration', getState().time.workDuration);
			dispatch(setTimeRemaining(getState().time.workDuration));
			this.workStarts();
		} else {
			console.log('breakDuration', getState().time.breakDuration);
			dispatch(setTimeRemaining(getState().time.breakDuration));
			this.breakStarts();
		}
	}

	breakStarts(){
		console.log('breakStarts', this)
		let tabs 				= this.tabs,
				webRequest 	= this.webRequest;

		tabs.createAndLock()
      .then(() => {
				webRequest.addOnBeforeRequestEvent();
			}).catch(console.error);
	}

	workStarts(){
		console.log('workStarts', this)
		let tabs 				= this.tabs,
				webRequest 	= this.webRequest;

		tabs.remove(tabs.lockedTab.id)
				.then(() => webRequest.removeOnBeforeRequestEvent())
				.catch(console.error);
	}
}

module.exports = Core;
