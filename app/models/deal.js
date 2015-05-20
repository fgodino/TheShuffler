

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DealSchema = new Schema({
    configuration: [Number],
    score : {type: Number, max: 1, min: 0 },
    pairs : {type: Object},
    created : {type : Date}
});


DealSchema.statics.getAverageScore = function(callback){

	this.aggregate(
	    { 
	    	$group: { 
	    		_id: null, 
	    		averageScr: { 
	    			$avg: '$score' 
	    		}
	    	}
	    }, 
	    function (err, results) {
        
	        if (err || !results || !results.length) {
	            return callback(err);
	        } 

	        callback(null, results[0].averageScr);
	    }
    );
} 

module.exports = mongoose.model('Deal', DealSchema);