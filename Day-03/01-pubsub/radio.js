
var radio = (function(){
	var contexts = {
		
	}

	function radio(eventName){
		if (!contexts[eventName])
			contexts[eventName] = new Context(eventName);
		return contexts[eventName];
	}

	function Context(eventName){
		this.__eventName  = eventName;
		this.__subscribers = [];
	}

	Context.prototype.subscribe = function(){
		var self = this;
		Array.prototype.forEach.call(arguments, function(subscription){
			if (Array.isArray(subscription)){
				self.__subscribers.push(subscription[0].bind(subscription[1]))
			} else if (typeof subscription === 'function'){
				self.__subscribers.push(subscription)	
			}
		});
		return this;
	}

	Context.prototype.unsubscribe = function unsubscribe(){
		var args = arguments;
		this.__subscribers = this.__subscribers.filter(function(subscriber){
			return Array.prototype.indexOf.call(args, subscriber) === -1;
		});
		return this;
	}

	Context.prototype.broadcast = function broadcast(){
		var args = arguments;
		this.__subscribers.forEach(function(subscriptionFn){
			subscriptionFn.apply(this, args);
		});
		return this;
	}
	return radio;
})()

