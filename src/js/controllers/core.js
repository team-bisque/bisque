'use strict';
import { setTimeRemaining } from '../action-creators/time';
import { toggleWork } from '../action-creators/status';
import { fetchWeather} from '../action-creators/weather';

const Tabs = require('./tabs'),
			WebRequest = require('./webRequest');



class Core {
	constructor(store) {
		this.tabs = new Tabs(store);
		this.webRequest = new WebRequest();
		this.store = store
	}

	init(){
		console.log('background.js core initiated')

		this.store.dispatch(fetchWeather(10004));
		let testTimeRemaining = this.store.getState().time.workDuration; // 3 min
		this.store.dispatch(setTimeRemaining(testTimeRemaining));
		// invoke listeners
		this.watchMinute();
	}

	watchMinute(){
		let minute = 5000; //<=== 5 seconds for testing,  (1000 * 60);
		setInterval(()=>{

			const remaining = this.store.getState().time.timeRemaining - 60000;
			this.store.dispatch(setTimeRemaining(remaining));


			// console.log('watchMinute', remaining, this.store.getState().time.timeRemaining)
			if (remaining === 0) this.setStatus();

		}, minute);
	}

	setStatus(){
		let store = this.store;
		store.dispatch(toggleWork());
		const isWorking = store.getState().status.isWorking;
		console.log('setStatus', isWorking)
		if(isWorking){
			console.log('workDuration', store.getState().time.workDuration)
			store.dispatch(setTimeRemaining(store.getState().time.workDuration));
			this.workStarts();
		} else {
			console.log('breakDuration', store.getState().time.breakDuration)
			store.dispatch(setTimeRemaining(store.getState().time.breakDuration));
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
