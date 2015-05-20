//Modules
var express = require('express');
var router = express.Router();
var shuffler = require('../lib/shuffler');
var getScore    = require('../lib/score');
var getPairs  = require('../lib/pairs');


const PAGE_SIZE = 20;

//Models
var Deal = require('../models/deal');

router.post('/deals', function(req, res) {

  var configuration = shuffler();
  var score = getScore(configuration);
  var pairs = getPairs(configuration);

  var deal = new Deal(
    { 
      configuration: configuration, 
      score : score, 
      pairs : pairs,
      created : new Date()
    }
  );
  deal.save(function (err, result) {

    /*
    We could do this in memory, only storing the last average value
    and the number of objects in the collection with the following
    formula: avg += (x - avg) / count. But this only works when we have
    only one API endpoint.
    */

    Deal.getAverageScore(function function_name (err, avg) {

      if (err){
        return res.sendStatus(500);
      }

      res.send(
        { configuration: configuration,
          pairs : pairs, 
          score : score, 
          average : avg, 
          id : result._id 
        }
      );
      
    });
  });
});


router.get('/deals', function(req, res) {

  var page = req.query.page || 0;

  Deal
    .where()
    .select('_id score created created')
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .sort('-created')
    .exec(function(err, deals) {

      if (err){
        return res.send(404);
      }

      res.json(deals);

    });

});

router.get('/deals/:id', function(req, res) {

  Deal.findById(req.params.id, function(err, deal) {

    if (err){
      return res.sendStatus(404);
    }

    Deal.getAverageScore(function function_name (err, avg) {

      if (err){
        return res.sendStatus(500);
      }

      res.send({ configuration: deal.configuration, score : deal.score, average : avg, id : deal._id });
      
    });
  });
});


module.exports = router;