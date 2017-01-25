webpackHotUpdate(0,{

/***/ 76:
/***/ function(module, exports) {

	'use strict';
	'user strict';

	var toggle = false;

	var app = {
		working: true,
		workDuration: 10000,
		breakDuration: 2000
	};

	function redirect(tab, type) {
		if (type === 'create') {
			chrome.tabs.create(tab, function (tab) {
				console.log('New tab created', tab);
			});
		} else {
			chrome.tabs.update(tab.id, { selected: true }, function (tab) {
				console.log('New tab created', tab);
			});
		}
	}

	function breakStarts() {
		console.log('breakStarts');

		// break start
		// redirect you somewhere

		// disable other tabs
		setTimeout(function () {
			chrome.tabs.getCurrent(function (tab) {
				chrome.tabs.discard(tab.id);
			});
			workStarts();
		}, app.breakDuration);
	}

	function workStarts() {
		console.log('workStarts');

		setTimeout(function () {
			breakStarts();
			redirect({ url: url, active: true }, 'create');
		}, app.workDuration);
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