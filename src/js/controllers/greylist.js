'use strict'

class GreyList {
	constructor() {
		this.listUrls = [
			"youtube.com",
			"buzzfeed.com"
		];
		this.visitAttempts = 0;
	}

	isOnList(url){
		// parse url 
		// check if url is on this list
		let requestUrl = "https://www.buzzfee.com/acticle/1"; // <-- url
		requestUrl.split('/')[2];
		return this.listUrls.filter(greyUrl => requestUrl.includes(greyUrl));
	}

	watchVisit() {
		if(this.isOnList()){
			this.visitAttempts ++;
		}
	}	
}

module.exports = GreyList;