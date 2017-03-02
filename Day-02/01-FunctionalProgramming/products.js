var products = [
	{id : 7, name : "Pen", cost : 90, units : 50, category : "stationary"},
	{id : 3, name : "Hen", cost : 50, units : 80, category : "grocery"},
	{id : 9, name : "Pencil", cost : 70, units : 30, category : "stationary"},
	{id : 6, name : "Len", cost : 80, units : 20, category : "grocery"},
	{id : 8, name : "Marker", cost : 60, units : 50, category : "stationary"},
]

/*
sort
filter
groupBy
min
max
sum
aggregate
transform
forEach
*/

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default List', function(){
	console.table(products);
});

describe('Sorting', function(){
	describe('Default Sort [products by id]', function(){
		function sort(){

		}
		sort();
		console.table(products);
	});

	describe('Sort any list by any attribute', function(){
		//sort()
		//console.table(products)
	});
});

describe('Filter', function(){
	describe('Costly Products', function(){
		//filter
		//console.table(products);
	});
});