var pgm = (function(){
	function addSync(x,y){
		console.log(`		[Service] processing ${x}, ${y}`);
		var result = x + y;
		console.log(`		[Service] returning result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[Client] trigger addSync`);
		var result = addSync(x,y);
		console.log(`[Client] result = ${result}`);
	}

	function addAsync(x,y, onResult){
		console.log(`		[Service] processing ${x}, ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`		[Service] returning result`);
			if (typeof onResult === 'function')
				onResult(result);
		},5000);
	}

	function addAsyncClient(x,y){
		console.log(`[Client] trigger addAsync`);
		addAsync(x,y, function(result){
			console.log(`[Client] result = ${result}`);
		});
	}

	var addAsyncEvents = (function(){
		var _subscribers = [];
		function subscribe(subscriptionFn){
			_subscribers.push(subscriptionFn);
		}
		function add(x,y){
			console.log(`		[Service] processing ${x}, ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`		[Service] returning result`);
				_subscribers.forEach(subscriber => subscriber(result));
			},5000);
		}
		return {
			add : add,
			subscribe : subscribe
		}
	})()

	function addAsyncPromise(x,y){
		var promise = new Promise(function(resolveFn, rejectFn){
			console.log(`		[Service] processing ${x}, ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`		[Service] returning result`);
				resolveFn(result);
			},5000);
		});
		return promise;
	}
	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	};
})();