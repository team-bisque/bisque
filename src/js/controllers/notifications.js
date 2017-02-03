'use strict';
import {
	addFiveMinutes,
	toggleWork,
	togglePause
} from '../action-creators/status';

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Notifications {
	// https://developer.chrome.com/apps/notifications
	constructor(store) {
		this.store = store;
		this.clickHandler = this.clickHandler.bind(this);
	}

	create(noteId, options){
		// Notes demand type and icon Url
		// but we're not getting fancy yet
		// So it's easier to set defaults like this
		if (!options.type) options.type = 'basic';
		if (!options.iconUrl) options.iconUrl = './images/logo.png';
		return chrome.notifications.create(noteId, options);
	}

	login(){
		chrome.notifications.create('login', {
			title: 'Welcome to Bisque!',
			message: 'Please login to get started',
			iconUrl: './images/logo.png',
			type: 'basic',
			buttons: [
				{ title: 'Login with Google' },
				{ title: 'What is this?' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	welcome(){
		chrome.notifications.create('welcome', {
			title: 'Welcome!',
			message: 'Ready to get to work?',
			iconUrl: './images/logo.png',
			type: 'basic',
			isClickable: true,
			buttons: [
				{ title: 'Let’s do it!' },
				{ title: 'Not yet' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	warning(){
		const message = this.store.getState().status.isWorking
			? 'work'
			: 'break';

		chrome.notifications.create('warning', {
			title: `Are you almost ready?`,
			message: `Your ${message} time is about to end...`,
			iconUrl: './images/logo.png',
			type: 'basic',
			buttons: [
				{ title: 'Looking forward to it!' },
				{ title: '5 more minutes...' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	statusChange(){
		const message = this.store.getState().status.isWorking
			? 'take a break'
			: 'get back to work';

		chrome.notifications.create.create('statusChange', {
			title: `Time's up!`,
			message: `Tell Bisque what to do`,
			iconUrl: './images/logo.png',
			type: 'basic',
			buttons: [
				{ title: `Let’s ${message}!`},
				{ title: '5 more minutes...' }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.clickHandler);
	}

	whereAreYou(){
		chrome.notifications.create('whereAreYou', {
			title: `Where’ve you gone?`,
			message: `Tell Bisque what to do`,
			iconUrl: './images/logo.png',
			type: 'basic',
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
				if (!buttonIndex) chrome.tabs.create({});
				else console.log('Show user intro');
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
		chrome.notifications.clear(noteId);
	}
}
module.exports = Notifications;
