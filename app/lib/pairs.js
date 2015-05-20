
const DIVISION_FACTOR = 13;

function findNumbers (array) {
	
	var numbers = {};

	for(var i = 0; i < array.length; i++){

		var number = array[i] % DIVISION_FACTOR;

		if(!numbers.hasOwnProperty(number)){
			numbers[number] = [];
		}

		numbers[number].push(i);
	}

	return numbers;
}

function isAdjacent(a, b){

	var modDiff = Math.abs((a % DIVISION_FACTOR) - (b % DIVISION_FACTOR));
	var difference = Math.abs(a - b);

	return (difference <= DIVISION_FACTOR + 1) && (modDiff === 0 || modDiff === 1);
}

function getPairs (array){

	var result = [];
	var maxPair = 0;
	var pairs = {};

	for(var i = 0; i < array.length - 1; i++){
		for(var j = i + 1; j < array.length; j++){

			if(!isAdjacent(array[i], array[j])){
				continue;
			}

			var diff = Math.abs(array[j] - array[i]);

			if(!pairs.hasOwnProperty(diff)){
				pairs[diff] = [];
			}

			if(pairs[diff].length === 0 || pairs[diff][pairs[diff].length - 1].indexOf(array[i]) === -1){
				pairs[diff].push([array[i]]);
			}

			if(pairs[diff][ pairs[diff].length - 1 ].indexOf(array[j]) === -1){
				pairs[diff][ pairs[diff].length - 1 ].push(array[j]);
			}

			maxPair = Math.max(maxPair, pairs[diff][ pairs[diff].length - 1 ].length);


		}

	}

	for(var diff in pairs){
		for(var i = 0; i < pairs[diff].length; i++){
			if( pairs[diff][i].length >= maxPair ){
				result.push(pairs[diff][i]);
			}
		}
	}
	
	return result;
}

module.exports = function (array){

	var numbers = findNumbers(array);

	for(var number in numbers){
		var pairs = getPairs(numbers[number]);
		
		if(pairs.length){
			numbers[number] = pairs;
		} else {
			delete numbers[number];
		}
		
	}

	return numbers;
}