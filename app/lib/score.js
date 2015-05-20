
module.exports = function score (array) {

	if(array.length !== 52){
		return 0;
	}

	var score = 0;

	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 13; j++){

			var value = array[ i*13 + j];

			if(Math.floor(value / 13 ) === i) score++; //Check right row
			if((value % 13) === j) score++; //Check right column
		}
	}
	
	return score / 104;
};