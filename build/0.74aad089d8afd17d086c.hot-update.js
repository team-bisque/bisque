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

	chrome.alarms.onAlarm.addListener(function (alarm) {
	  var index = app.data.reminds.findIndex(function (x) {
	    return x.name === alarm.name;
	  });
	  if (index > -1) {
	    var remind = app.data.reminds[index];
	    chrome.notifications.create(remind.name, {
	      title: chrome.i18n.getMessage('reminderTitle'),
	      type: 'basic',
	      message: remind.message,
	      iconUrl: 'images/icon-24.png'
	    });
	    app.notification();
	    app.log('show ' + remind.message);
	    if (!remind.repeat) {
	      remind.enable = false;
	    }
	    app.update(remind);
	  }
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