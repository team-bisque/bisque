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

	function breakStarts() {
		setTimeout(function () {
			return alert('get out now');
		}, app.breakDuration);
	}

	function workStarts() {
		setInterval(breakStarts(), app.workDuration);
	}

	chrome.runtime.onInstalled.addListener(function (details) {
		console.log('previousVersion', details.previousVersion);
		workStarts();
	});

/***/ }

})