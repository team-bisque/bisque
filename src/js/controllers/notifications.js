'use strict';
import { addFiveMinutes } from '../action-creators/time';

const ChromePromise = require('chrome-promise');
const chromep = new ChromePromise();

class Notifications {
	// https://developer.chrome.com/extensions/notification
	constructor(store) {
		this.store = store;
		this.notifications = [];
		this.options = {

		}
		this.onWarningRemainingClick = this.onWarningRemainingClick.bind(this);
	}

	create(notificationId, options){
		if(!options.type) options['type'] = 'basic';
		if(!options.iconUrl) options['iconUrl'] = './images/logo.png';
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
			title: 'Welcome student',
			message: 'Are you ready to begin work for a day?',
			buttons: [
				{ title: 'Yes' },
				{ title: 'No' }
			]
		});
	}

	warningRemaining(timeRemaining){
		var remainingMinute = new Date(timeRemaining).getMinutes();

		let status = this.store.getState().status.isWorking ? 'work' : 'break';
		this.create('warningRemaining', {
			title: `You got ${remainingMinute} minute left`,
			message: `Your ${status} time is about to end...`,
			buttons: [
				{ title: "Add 5 more minutes" },
				{ title: "I'm looking forward to it" }
			]
		});

		chrome.notifications.onButtonClicked.addListener(this.onWarningRemainingClick);
	}

	onWarningRemainingClick(notificationId, buttonIndex){
		const { dispatch, getState } = this.store;
		if(notificationId === 'warningRemaining' && buttonIndex === 0){
			console.log('Add five clicked');
			dispatch(addFiveMinutes);
		}
	}
}
module.exports = Notifications;