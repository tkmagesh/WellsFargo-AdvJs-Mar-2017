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
			for(var i=0; i < products.length-1; i ++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});

	function sort(list, by){

		var comparer = function(){ return 0 };
		
		if (typeof by === 'string'){
			comparer = function(item1, item2){
				if (item1[by] > item2[by]) return 1;
				if (item1[by] < item2[by]) return -1;
				return 0;
			}
		}
		if (typeof by === 'function'){
			comparer = by;
		}
		for(var i=0; i < list.length-1; i ++)
			for(var j=i+1; j < list.length; j++)
				if ( comparer(list[i], list[j]) > 0 ){
					var temp = list[i];
					list[i] = list[j];
					list[j] = temp;
				}
	}
	describe('Sort any list by any attribute', function(){
		/*function sort(list, attrName){
			for(var i=0; i < list.length-1; i ++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}*/
		describe('Products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});

		describe('Products by units', function(){
			sort(products, 'units');
			console.table(products);
		});
		
	});

	describe('Sort any list by any comparer', function(){
		/*function sort(list, comparerFn){
			for(var i=0; i < list.length-1; i ++)
				for(var j=i+1; j < list.length; j++)
					if ( comparerFn(list[i], list[j]) > 0 ){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		};*/

		describe("Products by value [units * cost] ", function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0;
			}

			sort(products, productComparerByValue);
			console.table(products);
		});

		describe('Products by units ', function(){
			var productComparerByUnits = function(p1, p2){
				return p1.units - p2.units;
			};

			sort(products, productComparerByUnits);
			console.table(products);
		});
	});
});

describe('Filter', function(){
	describe('Costly Products', function(){
		//filter
		//console.table(products);
	});
});