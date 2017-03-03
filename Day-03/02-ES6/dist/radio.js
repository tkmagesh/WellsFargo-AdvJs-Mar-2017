'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var radio = function () {
	var contexts = {};
	var nameSymbol = Symbol(),
	    subscribersSymbol = Symbol();

	function radio(eventName) {
		if (!contexts[eventName]) contexts[eventName] = new Context(eventName);
		return contexts[eventName];
	}

	var Context = function () {
		function Context(eventName) {
			_classCallCheck(this, Context);

			this[nameSymbol] = eventName;
			this[subscribersSymbol] = [];
		}

		_createClass(Context, [{
			key: 'subscribe',
			value: function subscribe() {
				var _this = this;

				for (var _len = arguments.length, subscriptions = Array(_len), _key = 0; _key < _len; _key++) {
					subscriptions[_key] = arguments[_key];
				}

				subscriptions.forEach(function (subscription) {
					if (Array.isArray(subscription)) {
						_this[subscribersSymbol].push(subscription[0].bind(subscription[1]));
					} else if (typeof subscription === 'function') {
						_this[subscribersSymbol].push(subscription);
					}
				});
				return this;
			}
		}, {
			key: 'unsubscribe',
			value: function unsubscribe() {
				for (var _len2 = arguments.length, subscriptions = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					subscriptions[_key2] = arguments[_key2];
				}

				this[subscribersSymbol] = this[subscribersSymbol].filter(function (subscriber) {
					return subscriptions.indexOf(subscriber) === -1;
				});
				return this;
			}
		}, {
			key: 'broadcast',
			value: function broadcast() {
				var _this2 = this;

				for (var _len3 = arguments.length, data = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					data[_key3] = arguments[_key3];
				}

				this[subscribersSymbol].forEach(function (subscriptionFn) {
					return subscriptionFn.apply(_this2, data);
				});
				return this;
			}
		}]);

		return Context;
	}();

	return radio;
}();