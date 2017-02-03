'use strict';
import { addFiveMinutes } from '../action-creators/time';
import { toggleWork, togglePause } from '../action-creators/status';

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Notifications {
	// https://developer.chrome.com/apps/notifications
	constructor(store) {
		this.store = store;
		this.turnoff = null;
		this.clickHandler = this.clickHandler.bind(this);
	}

	create(noteId, options){
		if (!options.type) options.type = 'basic';
		// We can hook in specific logos to this later!
		if (!options.iconUrl) options.iconUrl = './images/logo.png';
		return chrome.notifications.create(noteId, options);
	}

	clear(noteId){
		return chrome.notifications.clear(noteId);
	}

	update(noteId, options){
		return chrome.notifications.update(noteId, options);
	}

	login(){
		this.create('login', {
			title: 'Welcome to Bisque!',
			message: 'Please login to get started',
			buttons: [
				{ title: 'Login with Google' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	welcome(){
		// create notification
		this.create('welcome', {
			title: 'Welcome!',
			message: 'Ready to get to work?',
			buttons: [
				{ title: 'Let’s do it!' },
				{ title: 'Not yet' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	warningNote(){
		const message = this.store.getState().status.isWorking ? 'work' : 'break';
		this.create('warning', {
			title: `Are you almost ready?`,
			message: `Your ${message} time is about to end...`,
			buttons: [
				{ title: 'Looking forward to it!' },
				{ title: '5 more minutes...' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	statusChange(){
		const message = this.store.getState().status.isWorking ? 'take a break' : 'get back to work';
		this.create('statusChange', {
			title: `Time's up!`,
			message: `Tell Bisque what to do`,
			buttons: [
				{ title: `Let’s ${message}!`},
				{ title: '5 more minutes...' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	whereAreYou(){
		this.create('whereAreYou', {
			title: `Where’ve you gone?`,
			message: `Tell Bisque what to do`,
			buttons: [
				{ title: `Let’s get back to work!`},
				{ title: `I’m clocking out early`}
			],
			requireInteraction: true
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	clickHandler(noteId, buttonIndex){
		const { dispatch } = this.store;
		console.log(noteId);

		switch (noteId) {
			case 'login':
				chrome.tabs.create({});
				break;

			case 'welcome':
				// User is ready
				if (!buttonIndex) dispatch(toggleWork());
				break;

			case 'warning':
				// User wants 5 more minutes
				if  (buttonIndex) dispatch(addFiveMinutes());
				break;

			case 'statusChange':
				if (!buttonIndex) { // User is ready
					dispatch(toggleWork());
					chrome.tabs.create({});
				}
				if (buttonIndex) {
					dispatch(addFiveMinutes());
				}
				break;

			case 'whereAreYou':
				if (!buttonIndex) dispatch(toggleWork());
				if (buttonIndex) dispatch(togglePause());
				break;

			default:
				break;
		}
		this.clear(noteId);
	}
}
module.exports = Notifications;
