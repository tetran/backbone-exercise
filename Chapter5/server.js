/**
 * Created by tetran on 2014/02/11.
 */
var application_root = __dirname;
var express = require('express');   // Web Framework
var path = require('path'); // Utility
var mongoose = require('mongoose'); // Unifying with MongoDB

var app = express();

app.configure(function() {
    // Parse request body and set to request.body
    app.use(express.bodyParser());

    // Check request.body for overriding request
    app.use(express.methodOverride());

    app.use(app.router);

    app.use(express.static(path.join(application_root, 'site')));

    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

var port = 4711;
app.listen(port, function() {
    console.log('Express Server started with port %d. mode: %s', port, app.settings.env);
});

app.get('/api', function(rquest, response) {
    response.send('Library API is available.');
});
