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

	function redirect(tab, url) {
		chrome.tabs.update(tab.id, { url: url });
	}

	function breakStarts(tab) {
		console.log('breakStarts', tab);
		chrome.tabs.executeScript(tab.id, {}, function () {
			return redirect(tab, 'http://www.youtube.com');
		});
		setTimeout(function () {
			chrome.tabs.executeScript(tab.id, {}, function () {
				return redirect(tab, 'http://www.fullstackacademy.com');
			});
		}, app.breakDuration);
	}

	function workStarts(tab) {
		console.log('workStarts', tab);
		setInterval(breakStarts(tab), app.workDuration);
	}

	chrome.runtime.onInstalled.addListener(function (details) {
		console.log('previousVersion', details.previousVersion);
		// workStarts(details)
	});

	chrome.browserAction.onClicked.addListener(function (tab) {

		console.log('browserAction.onClicked', tab);
		if (toggle) {
			chrome.browserAction.setIcon({ path: 'icon.png', tabId: tab.id });
			chrome.tabs.executeScript(tab.id, { code: 'alert()' });
		} else {
			chrome.browserAction.setIcon({ path: 'icon.png', tabId: tab.id });
			workStarts(tab);
		}
		toggle = !toggle;
	});

/***/ }

})