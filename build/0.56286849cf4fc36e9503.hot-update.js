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

	chrome.runtime.onMessage.addListener(function (req, _, callback) {
	  var method = app[req.method];
	  if (typeof method !== 'function') {
	    return;
	  }
	  var p = Promise.resolve().then(function () {
	    return method.apply(app, req.args);
	  });
	  p.then(function (result) {
	    if (result !== undefined && result.error !== undefined) {
	      callback({ error: result.error });
	    } else {
	      callback({ result: result });
	    }
	  });
	  return true;
	});

/***/ }

})