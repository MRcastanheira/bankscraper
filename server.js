var express = require('express');
var app = express();

var path = require("path");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'/views'));

app.use(express.static(__dirname + '/public'));

const routes = require('./routes');

// front
app.get('/', function (req, res) {
  res.render('index');
});

//  api
app.use('/', routes);

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
