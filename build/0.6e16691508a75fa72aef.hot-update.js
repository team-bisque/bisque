webpackHotUpdate(0,{

/***/ 76:
/***/ function(module, exports) {

	'use strict';
	'user strict';

	var toggle = false;
	var breakURL = 'http://youtube.com';
	var app = {
	  working: true,
	  workDuration: 5000,
	  breakDuration: 2000
	};

	// Promisify 

	var prom = {
	  tabs: {
	    create: function create(createProperties) {
	      return new Promise(function (resolve) {
	        chrome.tabs.create(createProperties, function (tab) {
	          resolve(tab);
	        });
	      });
	    },
	    discard: function discard(id) {
	      return new Promise(function (resolve) {
	        chrome.tabs.discard(id, function (tab) {
	          resolve(tab);
	        });
	      });
	    },
	    getCurrent: function getCurrent() {
	      return new Promise(function (resolve) {
	        chrome.tabs.getCurrent(function (tab) {
	          console.log('getCurrent', tab);
	          resolve(tab);
	        });
	      });
	    }

	  }
	};

	// function redirect(createProperties){
	// 	return prom.tabs.create(createProperties)
	// }


	function breakStarts() {
	  console.log('breakStarts');

	  // break start
	  // redirect you somewhere

	  // disable other tabs
	  setTimeout(function () {
	    prom.tabs.getCurrent().then(function (tab) {
	      return prom.tabs.discard(tab.id);
	    }).then(function () {
	      workStarts();
	    });
	  }, app.breakDuration);
	}

	function workStarts() {
	  console.log('workStarts');

	  setTimeout(function () {
	    prom.tabs.create({ url: breakURL, active: true }).then(function () {
	      breakStarts();
	    });
	  }, app.workDuration);
	}

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