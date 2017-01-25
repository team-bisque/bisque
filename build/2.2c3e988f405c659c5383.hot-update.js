webpackHotUpdate(2,{

/***/ 415:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _index = __webpack_require__(85);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(267);

	var _index4 = _interopRequireDefault(_index3);

	var _react2 = __webpack_require__(86);

	var _react3 = _interopRequireDefault(_react2);

	var _index5 = __webpack_require__(268);

	var _index6 = _interopRequireDefault(_index5);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
	  _component: {}
	};

	var _UsersMinhokangCodePracticeChromeExtNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	  filename: '/Users/minhokang/Code/practice/chrome-ext/src/js/popup/alarm.jsx',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});

	var _UsersMinhokangCodePracticeChromeExtNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	  filename: '/Users/minhokang/Code/practice/chrome-ext/src/js/popup/alarm.jsx',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
	  return function (Component) {
	    return _UsersMinhokangCodePracticeChromeExtNode_modulesReactTransformHmrLibIndexJs2(_UsersMinhokangCodePracticeChromeExtNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	  };
	}

	var callBackground = function callBackground(method) {
	  var _console;

	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  (_console = console).log.apply(_console, ['callBackground', method].concat(args));
	  return new Promise(function (resolve, reject) {
	    chrome.runtime.sendMessage({
	      method: method,
	      args: args
	    }, function (res) {
	      console.log('callBackground result', res);
	      if (res.error !== undefined) {
	        reject(res.error);
	      } else {
	        resolve(res.result);
	      }
	    });
	  });
	};

	var initialState = {
	  alarms: [],
	  currentAlarm: null,
	  open: false,
	  message: '',
	  sound: false
	};
	var reducer = function reducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  var newState = Object.assign({}, initialState);
	  switch (action.type) {
	    case SAVE:
	      callBackground('save', alarms).then(function (newValue) {
	        var index = newState.alarms.findIndex(function (a) {
	          return a.name === newValue.name;
	        });

	        if (index > -1) {
	          newState.alarms.splice(index, 1, newValue);
	        } else {
	          newState.alarms.push(newValue);
	        }
	      });
	      break;

	      return newState;
	  }
	};

	var _component = _wrapComponent('_component')(function (_React$Component) {
	  _inherits(_class, _React$Component);

	  function _class(props, context) {
	    _classCallCheck(this, _class);

	    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

	    _this.state = {
	      alarms: [],
	      currentAlarm: null,
	      open: false,
	      message: '',
	      sound: false
	    };
	    return _this;
	  }

	  _createClass(_class, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var self = this;
	      callBackground('sync').then(function (data) {
	        console.log(data);
	        self.setState({
	          alarms: data.reminds,
	          sound: data.sound
	        });
	      });
	    }
	  }, {
	    key: 'formatDate',
	    value: function formatDate(x) {
	      if (!x.enable && x.repeat) return 'After ' + x.after + 'min';
	      var d = new Date(x.when);
	      return d.toLocaleString('es-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log('Alarm', this.state);
	      var _state = this.state;
	      var alarms = _state.alarms;
	      var currentAlarm = _state.currentAlarm;
	      var open = _state.open;
	      var message = _state.message;

	      return _react3.default.createElement(
	        'p',
	        null,
	        'Hello, find me on src/js/popup/greeting_component.jsx'
	      );
	    }
	  }]);

	  return _class;
	}(_react3.default.Component));

	exports.default = _component;
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }

})