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
	  },
	  //
	  notification: function notification() {
	    if (this.data.sound) {
	      this.audio.src = '../sounds/hangout_message.mp3';
	      this.audio.play();
	    }
	  },
	  setConfig: function setConfig(newConfig) {
	    this.data = Object.assign(this.data, newConfig);
	    chrome.storage.sync.set(newConfig);
	  },
	  //
	  fix: function fix() {
	    var _this = this;

	    var now = Date.now();
	    this.data.reminds.map(function (x) {
	      if (x.when < now) {
	        if (x.repeat && x.enable) {
	          while (x.when < now) {
	            x.when += parseInt(x.after) * 60000;
	          }
	          _this.log('fix ' + x.message);
	          chrome.alarms.create(x.name, {
	            'when': x.when
	          });
	        } else if (x.enable) {
	          x.enable = false;
	          chrome.alarms.clear(x.name);
	          _this.log('clear ' + x.message);
	        }
	      } else if (x.when > now && x.enable) {
	        chrome.alarms.get(x.name, function (alarm) {
	          if (alarm === null) {
	            chrome.alarms.create(x.name, {
	              'when': x.when
	            });
	          }
	        });
	      }
	    });
	  },
	  sync: function sync() {
	    var _this2 = this;

	    return new Promise(function (resolve) {
	      chrome.storage.sync.get(_this2.data, function (newData) {
	        if (newData.time > _this2.data.time) {
	          _this2.data = newData;
	        } else if (_this2.data.time > newData.time) {
	          chrome.storage.sync.set(_this2.data);
	        }
	        _this2.fix();
	        resolve(_this2.data);
	      });
	    });
	  },
	  update: function update(a) {
	    var now = Date.now();
	    if (a.enable) {
	      a.when = a.after === 0 ? a.when : now + parseInt(a.after) * 60000;
	      chrome.alarms.create(a.name, {
	        'when': a.when
	      });
	      this.log('create ' + a.message + ' at ' + new Date(a.when).toLocaleString());
	    } else {
	      chrome.alarms.clear(a.name);
	      this.log('clear ' + a.message);
	    }
	    this.data.time = now;
	    this.sync();
	  },
	  add: function add(a) {
	    var now = Date.now();
	    //
	    a.name = this.getName(6);
	    if (a.message == undefined || a.message === undefined || a.message === '') {
	      a.message = 'No Message.';
	    }
	    if (a.repeat) {
	      a.after = Math.max(parseInt(a.after), 10);
	    } else {
	      a.when = Math.max(a.when, now + 60000 * 10);
	    }
	    //
	    this.data.reminds.push(a);
	    this.update(a);
	    return a;
	  },
	  delete: function _delete(a) {
	    var i = this.data.reminds.findIndex(function (x) {
	      return x.name === a.name;
	    });
	    if (i > -1) {
	      this.data.reminds.splice(i, 1);
	      a.enable = false;
	      this.update(a);
	    }
	    return a;
	  },
	  save: function save(a) {
	    if (a.name === undefined) return this.add(a);
	    var i = this.data.reminds.findIndex(function (x) {
	      return x.name === a.name;
	    });
	    if (i > -1) {
	      this.data.reminds.splice(i, 1, a);
	      this.update(a);
	    }
	    return a;
	  },
	  getName: function getName(x) {
	    var s = '';
	    while (s.length < x && x > 0) {
	      var r = Math.random();
	      s += r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65));
	    }
	    return s;
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

	chrome.notifications.onClicked.addListener(function (id) {
	  chrome.notifications.clear(id);
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