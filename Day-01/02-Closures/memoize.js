function memoize(algoFn){
	var cache = {};

	return function(){
        var key = JSON.stringify(arguments);
		if (typeof cache[key] !== 'undefined')
			return cache[key];
		console.log('processing ', key);
		cache[key] = algoFn.apply(this, arguments);
		return cache[key];

	}
}