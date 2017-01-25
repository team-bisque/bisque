webpackHotUpdate(0,{

/***/ 76:
/***/ function(module, exports) {

	'use strict';
	'user strict';

	var app = {
		working: true,
		workDuration: 3000,
		breakDuration: 1000
	};

	function breakStarts(details) {
		setTimeout(function () {
			chrome.tabs.update(details.tabId, { url: 'http://www.fullstackacademy.com' });
		}, app.breakDuration);
	}

	function workStarts(details) {
		setInterval(breakStarts(details), app.workDuration);
	}

	chrome.runtime.onInstalled.addListener(function (details) {
		console.log('previousVersion', details.previousVersion);
		workStarts(details);
	});

/***/ }

})