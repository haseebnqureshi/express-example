'use strict';

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/static'));

app.set('view engine', 'pug');

app.set('views', __dirname + '/views');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app = require('./middlewares.js')(app, express);

app = require('./routes.js')(app, express);

app.listen(8080, function() {

	console.log('Running app on http://localhost:8080');

});


