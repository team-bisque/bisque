'use strict';
import { addFiveMinutes } from '../action-creators/time';
import { toggleWork, togglePause } from '../action-creators/status';

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Notifications {
	// https://developer.chrome.com/extensions/notification
	constructor(store) {
		this.store = store;
		this.turnoff = null;
		this.clickHandler = this.clickHandler.bind(this);
	}

	create(notificationId, options){
		if (!options.type) options['type'] = 'basic';
		// We can hook in specific logos to this later!
		if (!options.iconUrl) options['iconUrl'] = './images/logo.png';
		return chromep.notifications.create(notificationId, options);
	}

	clear(notificationId){
		return chromep.notifications.clear(notificationId)
	}

	update(notificationId, options){
		return chromep.notifications.update(notificationId, options)
	}

	welcome(){
		// create notification
		this.create('welcome', {
			title: 'Welcome!',
			message: 'Ready to get to work?',
			buttons: [
				{ title: 'Yes' },
				{ title: 'No' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	warning(timeRemaining){
		var remainingMinute = new Date(timeRemaining).getMinutes();

		let status = this.store.getState().status.isWorking ? 'work' : 'break';
		this.create('warning', {
			title: `You have ${remainingMinute} minutes left`,
			message: `Your ${status} time is about to end...`,
			buttons: [
				{ title: 'Thanks!' },
				{ title: '5 more minutes...' },
				{ title: 'How am I doing?'},
				{ title: 'Settings...' }
			]
		});

		// Auto closes warning after 7.5 seconds
		setTimeout(() => {
			this.clear('warning');
		}, 7500);

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	statusChange(){
		let status = this.store.getState().status.isWorking ? 'get back to work' : 'take a break';
		this.create('status', {
			title: `Time's up!`,
			buttons: [
				{ title: `Let’s ${status}!`},
				{ title: '5 more minutes...' },
				{ title: `I'm clocking out early`}
			]
		});

		setTimeout(() => {
			this.update('status', { message: 'Are you still here?'});
		}, 30000)

		this.turnOff = setTimeout(() => {
			// After 30 mins & no response, turn off Bisque
		}, 1800000);

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	setStatus(){
		const { dispatch, getState } = this.store;
		dispatch(toggleWork());
		const isWorking = getState().status.isWorking;

		if (isWorking){
			dispatch(setTimeRemaining(getState().time.workDuration));
			this.workStarts();
		} else {
			dispatch(setTimeRemaining(getState().time.breakDuration));
			this.breakStarts();
		}
	}

	clickHandler(notificationId, buttonIndex){
		const { dispatch, getState } = this.store;

		if (notificationId === 'welcome') {
			if (buttonIndex === 0) {
				dispatch(setTimeRemaining(getState().time.workDuration));
				this.clear('welcome');
			}
			else if (buttonIndex === 1) {

			}
		}

		else if (notificationId === 'warning') {
			if  (buttonIndex === 0) { // Thanks!
				this.clear('warning');
			}
			else if (buttonIndex === 1){ // 5 more minutes...
				this.store.dispatch(addFiveMinutes());
				this.clear('warning');
			}
			else if (buttonIndex === 2){ // Data...
				this.clear('warning');
				// Add some state change to show data modal
				return chrome.tabs.create({});
			}
			else if (buttonIndex === 3) { // Settings...
				this.clear('warning');
				// Add some state change to show settings modal
				return chrome.tabs.create({});
			}
		}

		else if (notificationId === 'status') {
			if (buttonIndex === 0) { // User is ready
				clearTimeout(this.turnOff);
				this.setStatus();
				this.store.dispatch(toggleWork());
			}
			else if (buttonIndex === 1) { // User is ending work
				clearTimeout(this.turnOff);
				this.store.dispatch(togglePause());
			}
		}
	}
}
module.exports = Notifications;
