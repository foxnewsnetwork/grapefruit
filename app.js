
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req,res){ 
	res.render("index.jade", { title : "Stuff"});	
}); // end app.get

app.get("/s/:name", function(req,res){ 
	res.render("iframe.jade", { title : req.params.name } );
}); // end app.get

app.get("/p/:name", function(req,res){ 
	res.redirect("http://" + req.params.name + ".heroku.com");
}); // end app.get

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
