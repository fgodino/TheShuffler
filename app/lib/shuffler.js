

//Generate array of integers
var array = [];
for(var i=0; i<52; i++){
	array.push(i);
}

//Knuth Algorithm
function knut_shuffle(array) {
  
    var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

module.exports = function shuffler(){
	return knut_shuffle(array);
}




