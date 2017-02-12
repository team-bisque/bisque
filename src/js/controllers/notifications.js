'use strict';
import {
	addFiveMinutes,
	toggleWork,
	startWork,
	startBreak,
	setTimeRemaining
} from '../action-creators/status';

import store from '../store';

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Notifications {
	// https://developer.chrome.com/apps/notifications
	constructor() {
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
		chrome.notifications.clear(noteId);
		chrome.notifications.onButtonClicked.removeListener(this.loginHandler);
		if (buttonIndex === 0) chrome.tabs.create({});
		if (buttonIndex === 1) console.log('about page');
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
		chrome.notifications.clear(noteId);
		chrome.notifications.onButtonClicked.removeListener(this.welcomeHandler);
		console.log('in welcomeHandler')
		if (buttonIndex === 0) store.dispatch(toggleWork());
		else console.log('User isn’t ready');
	}

	warning(){
		const message = store.getState().status.isWorking ? 'work' : 'break';

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
		chrome.notifications.clear(noteId);
		chrome.notifications.onButtonClicked.removeListener(this.warningHandler);
		if (buttonIndex === 1) store.dispatch(addFiveMinutes());
	}

	statusChange(){
		const message = store.getState().status.isWorking
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
			console.log('in statusHandler');
		chrome.notifications.clear(noteId);
		chrome.notifications.onButtonClicked.removeListener(this.statusHandler);
		if (buttonIndex === 0) { // User is ready
			store.dispatch(toggleWork());
		}
		if (buttonIndex === 1) {
			store.dispatch(setTimeRemaining(300000));
		}
	}

	whereAreYou(){
		this.create('whereAreYou', {
			title: `Where’ve you gone?`,
			message: `Tell Bisque what to do`,
			buttons: [
				{ title: `Let’s get back to work!`},
				{ title: `I’m back, but it's break time!`}
			],
			requireInteraction: true
		}).then(() => {
			chrome.notifications.onButtonClicked.addListener(this.whereAreYouHandler);
		})
	}

	whereAreYouHandler(noteId, buttonIndex) {
		chrome.notifications.clear(noteId);
		chrome.notifications.onButtonClicked.removeListener(this.whereAreYouHandler);
		if (buttonIndex === 0) store.dispatch(startWork());
		else store.dispatch(startBreak());
	}
}

module.exports = Notifications;
