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

	setTimeout(function () {
		return alert('get out now');
	}, 1000);

	setInterval(function () {
		alert("Hello");
	}, 3000);

	chrome.runtime.onInstalled.addListener(function (details) {
		console.log('previousVersion', details.previousVersion);
	});

/***/ }

})