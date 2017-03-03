//ES5
/*
function add(x,y){
	function parseArg(n){
		if (Array.isArray(n)) return add.apply(this, n);
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n);
	}
	return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + add(Array.prototype.slice.call(arguments, 1));
}
*/
//ES6
function add(...list){
	function parseArg(n){
		if (Array.isArray(n)) return add(...n);
		if (typeof n === 'function') return parseArg(n());
		return isNaN(n) ? 0 : parseInt(n);
	}
	return list.length <= 1 ? parseArg(list[0]) : parseArg(list[0]) + add(list.slice(1));
}
/*
Function invocation
1. As a method of an obj
	this -> obj

2. As a function
	this -> global scope (window)
*/