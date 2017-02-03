'use strict';

class GreyList {
	constructor() {
		this.listUrls = [
			'youtube.com',
			'buzzfeed.com'
		];
		this.visitAttempts = 0;
	}

	isOnList(url) {
		// parse url
		// check if url is on this list
		const domain = this.sliceToDomain(url);
		return this.listUrls.filter(greyUrl => domain.includes(greyUrl)).length;
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
		this.listUrls.push(domain);
	}
}

module.exports = GreyList;
