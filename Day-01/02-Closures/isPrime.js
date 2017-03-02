

var isPrime = (function (){
	var cache = {};

	return function isPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		if (n <= 3){
			cache[n] = true;
		} else {
			cache[n] = true;
			for(var i=0; i < (n/2); i++)
				if (n % i === 0){
					cache[n] = false;
					break;
				}
		}
		return cache[n];

	}
})();

var isOddOrEven = (function(){
	var cache = {};

	return function isPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		cache[n] = n % 2 === 0 ? 'even' : 'odd';
		return cache[n];

	}
})()


function memoize(algoFn){
	var cache = {};

	return function(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		cache[n] = algoFn(n);
		return cache[n];

	}
}

var isPrime = memoize(function(n){
	if (n <= 3)
		return true;
	for(var i=2; i < (n/2); i++)
		if (n % i === 0)
			return false;
	return true;
})























