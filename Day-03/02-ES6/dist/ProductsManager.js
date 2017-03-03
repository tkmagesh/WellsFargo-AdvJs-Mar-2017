'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var subscribersSymbol = Symbol();

var Events = function () {
	function Events(eventName) {
		_classCallCheck(this, Events);

		this[subscribersSymbol] = {};
	}

	_createClass(Events, [{
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

			(this[subscribersSymbol] || []).forEach(function (subscriptionFn) {
				return subscriptionFn.apply(_this2, data);
			});
			return this;
		}
	}]);

	return Events;
}();

var Products = function (_Events) {
	_inherits(Products, _Events);

	function Products() {
		_classCallCheck(this, Products);

		return _possibleConstructorReturn(this, (Products.__proto__ || Object.getPrototypeOf(Products)).call(this));
	}

	_createClass(Products, [{
		key: 'add',
		value: function add() {
			var newProduct = { id: 101, name: 'Pen' };
			this.broadcast('add', newProduct);
		}
	}]);

	return Products;
}(Events);