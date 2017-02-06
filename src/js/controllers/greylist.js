'use strict';

class GreyList {
	constructor() {
		this.urlList = [
			'youtube.com',
			'buzzfeed.com'
		];
		this.visitAttempts = 0;
	}

	isOnList(url) {
		// parse url
		// check if url is on this list
		const domain = this.sliceToDomain(url);
		return !!(this.urlList.filter(greyUrl => domain.includes(greyUrl)).length);
	}

	watchVisit(url) {
		if (this.isOnList(url)) {
			this.visitAttempts++;
		}
	}

	sliceToDomain(url) {
		return url.split('/')[2];
	}

	addToList(url) {
		const domain = this.sliceToDomain(url);
		this.urlList.push(domain);
	}
}

module.exports = GreyList;
