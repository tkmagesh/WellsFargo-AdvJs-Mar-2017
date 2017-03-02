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
	describe('Costly Products [cost > 50]', function(){
		function filterCostlyProducts(){
			var result = [];
			for(var i=0; i < products.length; i++)
				if (products[i].cost > 50)
					result.push(products[i]);
			return result;
		}
		var costlyProducts = filterCostlyProducts();
		console.table(costlyProducts);
	});

	describe("Any list by any criteria", function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var i=0; i < list.length; i++)
				if (criteriaFn(list[i]))
					result.push(list[i]);
			return result;
		}

		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			}
		}

		describe('Filter products by units', function(){
			var OverstockedProductCriteria = function(product){
				return product.units >= 50;
			};
			describe('Overstocked products [units >= 50]', function(){
				
				var OverstockedProducts = filter(products, OverstockedProductCriteria);
				console.table(OverstockedProducts);
			});
			describe("Understocked products [!OverstockedProduct]", function(){
				/*var UnderstockedProductCriteria = function(product){
					return !OverstockedProductCriteria(product);
				};*/
				var UnderstockedProductCriteria = negate(OverstockedProductCriteria);

				var UnderstockedProducts = filter(products, UnderstockedProductCriteria);
				console.table(UnderstockedProducts);
			});
		});

		describe('Filter products by cost', function(){
			var costlyProductCriteria = function(product){
				return product.cost > 50;
			}
			describe('Costly products [cost > 50]', function(){
				var costlyProducts = filter(products, costlyProductCriteria);
				console.table(costlyProducts);
			});
			describe('Affordable products [!CostlyProducts]', function(){
				/*var affordableProductCriteria = function(product){
					return !costlyProductCriteria(product);
				}*/
				var affordableProductCriteria = negate(costlyProductCriteria);
				var affordableProducts = filter(products, affordableProductCriteria);
				console.table(affordableProducts);
			});
		});
	});

});








