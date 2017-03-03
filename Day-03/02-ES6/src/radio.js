
let radio = (function(){
	let contexts = {
		
	}
	let nameSymbol = Symbol(),
		subscribersSymbol = Symbol();

	function radio(eventName){
		if (!contexts[eventName])
			contexts[eventName] = new Context(eventName);
		return contexts[eventName];
	}

	class Context{
		constructor(eventName){
			this[nameSymbol]  = eventName;
			this[subscribersSymbol] = [];
		}

		subscribe(...subscriptions){
			subscriptions.forEach(subscription  => {
				if (Array.isArray(subscription)){
					this[subscribersSymbol].push(subscription[0].bind(subscription[1]))
				} else if (typeof subscription === 'function'){
					this[subscribersSymbol].push(subscription)	
				}
			});
			return this;
		}

		unsubscribe(...subscriptions){
			this[subscribersSymbol] = this[subscribersSymbol].filter(subscriber => subscriptions.indexOf(subscriber) === -1);
			return this;
		}

	
		broadcast(...data){
			this[subscribersSymbol].forEach(subscriptionFn => subscriptionFn.apply(this, data));
			return this;
		}
	}
	return radio;
})()

