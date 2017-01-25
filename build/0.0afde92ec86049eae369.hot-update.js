webpackHotUpdate(0,{

/***/ 76:
/***/ function(module, exports) {

	'use strict';
	'user strict';

	var toggle = false;

	var app = {
	  working: true,
	  workDuration: 3000,
	  breakDuration: 1000
	};

	function breakStarts() {
	  console.log('breakStarts', details);
	  setTimeout(function () {
	    // break ends		
	    chrome.tabs.update(details.tabId, { url: 'http://www.fullstackacademy.com' });
	  }, app.breakDuration);
	}

	function workStarts() {
	  console.log('workStarts');
	  setInterval(breakStarts(), app.workDuration);
	}

	chrome.runtime.onInstalled.addListener(function (details) {
	  console.log('previousVersion', details.previousVersion);
	  // workStarts(details)
	});

	chrome.browserAction.onClicked.addListener(function (tab) {
	  if (toggle) {
	    chrome.browserAction.setIcon({ path: 'icon.png', tabId: tab.id });
	    chrome.tabs.executeScript(tab.id, { code: 'alert()' });
	  } else {
	    chrome.browserAction.setIcon({ path: 'icon.png', tabId: tab.id });
	    chrome.tabs.executeScript(tab.id, {}, workStarts);
	  }
	  toggle = !toggle;
	});

/***/ }

})