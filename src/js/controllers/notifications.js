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
		this.loginHandler = this.loginHandler.bind(this);
		this.welcomeHandler = this.welcomeHandler.bind(this);
		this.warningHandler = this.warningHandler.bind(this);
		this.statusHandler = this.statusHandler.bind(this);
		this.whereAreYouHandler = this.whereAreYouHandler.bind(this);
	}

	create(noteId, options){
		// Notes demand type and icon Url
		// but we're not getting fancy yet
		// So it's easier to set defaults like this
		if (!options.type) options.type = 'basic';
		if (!options.iconUrl) options.iconUrl = './images/favicon-128.png';
		return chromep.notifications.create(noteId, options);
	}

	login(){
		this.create('login', {
			title: 'Welcome to Bisque!',
			message: 'Please login to get started',
			buttons: [
				{ title: 'Login with Google' },
				{ title: 'What is this?' }
			]
		}).then(() => {
			chrome.notifications.onButtonClicked.addListener(this.loginHandler);
		})
	}

	loginHandler(noteId, buttonIndex) {
		if (buttonIndex === 0) chrome.tabs.create({});
		if (buttonIndex === 1) console.log('about page');
		chrome.notifications.clear(noteId);
	}

	welcome(){
		this.create('welcome', {
			title: 'Welcome!',
			message: 'Ready to get to work?',
			isClickable: true,
			buttons: [
				{ title: 'Let’s do it!' },
				{ title: 'Not yet' }
			]
		}).then(() => {
			chrome.notifications.onButtonClicked.addListener(this.welcomeHandler);
		})
	}

	welcomeHandler(noteId, buttonIndex) {
		if (buttonIndex === 0) this.store.dispatch(toggleWork());
		else console.log('User isn’t ready');
		chrome.notifications.clear(noteId);
	}

	warning(){
		const message = this.store.getState().status.isWorking ? 'work' : 'break';

		this.create('warning', {
			title: `Are you almost ready?`,
			message: `Your ${message} time is about to end...`,
			buttons: [
				{ title: 'Looking forward to it!' },
				{ title: '5 more minutes...' }
			]
		}).then(() => {
			chrome.notifications.onButtonClicked.addListener(this.warningHandler);
		})
	}

	warningHandler(noteId, buttonIndex) {
		console.log(buttonIndex);
		if (buttonIndex === 1) this.store.dispatch(addFiveMinutes());
		chrome.notifications.clear(noteId);
	}

	statusChange(){
		const message = this.store.getState().status.isWorking
			? 'take a break'
			: 'get back to work';

		this.create('statusChange', {
			title: `Time's up!`,
			message: `Tell Bisque what to do`,
			buttons: [
				{ title: `Let’s ${message}!`},
				{ title: '5 more minutes...' }
			]
		}).then(() => {
			chrome.notifications.onButtonClicked.addListener(this.statusHandler);
		})
	}

	statusHandler(noteId, buttonIndex) {
		console.log(noteId);
		if (buttonIndex === 0) { // User is ready
			this.store.dispatch(toggleWork());
			chrome.tabs.create({});
		}
		if (buttonIndex === 1) {
			this.store.dispatch(addFiveMinutes());
		}
		chrome.notifications.clear(noteId);
	}

	whereAreYou(){
		chrome.notifications.create('whereAreYou', {
			title: `Where’ve you gone?`,
			message: `Tell Bisque what to do`,
			buttons: [
				{ title: `Let’s get back to work!`},
				{ title: `I’m clocking out early`}
			],
			requireInteraction: true
		}).then(() => {
			chrome.notifications.onButtonClicked.addListener(this.whereAreYouHandler);
		})
	}

	whereAreYouHandler(noteId, buttonIndex) {
		if (buttonIndex === 0) {
			this.store.dispatch(toggleWork());
			if (this.store.getState().status.isWorking) {
				this.store.dispatch(toggleWork());
			}
		}
		if (buttonIndex === 1) this.store.dispatch(togglePause());
		chrome.notifications.clear(noteId);
	}

	// clickHandler(noteId, buttonIndex){
	// 	const { dispatch } = this.store;
	// 	console.log(noteId);
	//
	// 	switch (noteId) {
	// 		case 'login':
	// 			if (!buttonIndex) chrome.tabs.create({});
	// 			else console.log('Show user intro');
	// 			break;
	//
	// 		case 'welcome':
	// 			// User is ready
	// 			if (!buttonIndex) dispatch(toggleWork());
	// 			break;
	//
	// 		case 'warning':
	// 			// User wants 5 more minutes
	// 			if  (buttonIndex) dispatch(addFiveMinutes());
	// 			break;
	//
	// 		case 'statusChange':
	// 			if (!buttonIndex) { // User is ready
	// 				dispatch(toggleWork());
	// 				chrome.tabs.create({});
	// 			}
	// 			if (buttonIndex) {
	// 				dispatch(addFiveMinutes());
	// 			}
	// 			break;
	//
	// 		case 'whereAreYou':
	// 			if (!buttonIndex) dispatch(toggleWork());
	// 			if (buttonIndex) dispatch(togglePause());
	// 			break;
	//
	// 		default:
	// 			break;
	// 	}
	// 	chrome.notifications.clear(noteId);
	// }
}
module.exports = Notifications;
