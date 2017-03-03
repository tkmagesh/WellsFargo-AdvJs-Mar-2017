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

	function addAsync(x,y){
		console.log(`		[Service] processing ${x}, ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`		[Service] returning result`);
			return result;
		},5000);
	}

	function addAsyncClient(x,y){
		console.log(`[Client] trigger addAsync`);
		var result = addAsync(x,y);
		console.log(`[Client] result = ${result}`);
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient
	};
})();