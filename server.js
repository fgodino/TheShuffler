// Modules
var express       = require('express');
var app           = express();
var mongoose      = require('mongoose');
var bodyParser    = require('body-parser');
var morgan		  = require('morgan');
var path		  = require('path');

var db = require('./config/db');

var port = process.env.PORT || 8080;

mongoose.connect(db.url);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var api = require('./app/routes/api');

app.use('/api', api);

app.get('/', function(req, res) {
	res.sendfile(path.join(__dirname, 'views/index.html'));
});

app.use(function(req, res) {
  return res.redirect(req.protocol + '://' + req.get('Host') + '/#' + req.url)
})

// start app ===============================================
app.listen(port);	
console.log('listening on port ' + port);
module.exports = app;