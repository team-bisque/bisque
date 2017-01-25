webpackHotUpdate(0,{

/***/ 76:
/***/ function(module, exports) {

	'use strict';
	'user strict';

	var app = {
	  audio: document.createElement('audio'),
	  data: {
	    sound: false,
	    time: -1,
	    reminds: []
	  },
	  log: function log(message) {
	    console.log(message);
	  }
	};

	chrome.runtime.onInstalled.addListener(function (details) {
	  console.log('previousVersion', details.previousVersion);
	});

/***/ }

})