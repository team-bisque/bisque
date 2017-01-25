webpackHotUpdate(0,{

/***/ 76:
/***/ function(module, exports) {

	'use strict';
	'user strict';

	var toggle = false;

	var app = {
		working: true,
		workDuration: 3000,
		breakDuration: 2000
	};

	function redirect(url) {
		chrome.tabs.create({ url: url, active: true }, function (tab) {
			console.log('New tab created', tab);
		});
	}

	function breakStarts() {
		chrome.tabs.onHighlighted.addListener(function (highlightInfo) {
			console.log(highlightInfo);
		});

		console.log('breakStarts');

		// break start
		// redirect you somewhere
		// redirect('http://www.youtube.com');	

		// disable other tabs
		setTimeout(function () {

			workStarts();
		}, app.breakDuration);
	}

	function workStarts() {
		console.log('workStarts');
		setTimeout(breakStarts(), app.workDuration);
	}

	chrome.runtime.onInstalled.addListener(function (details) {
		console.log('previousVersion', details.previousVersion);
		// workStarts(details)
	});

	chrome.browserAction.onClicked.addListener(function (tab) {

		console.log('browserAction.onClicked', tab);
		if (toggle) {

			chrome.browserAction.setIcon({ path: 'icon.png', tabId: tab.id });
		} else {
			console.log('Toggle on');
			chrome.browserAction.setIcon({ path: 'icon.png', tabId: tab.id });
			workStarts();
		}
		toggle = !toggle;
	});

/***/ }

})