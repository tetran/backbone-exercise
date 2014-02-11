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

mongoose.connect('mongodb://localhost/library_database');

var Keywords = new mongoose.Schema({
    keyword: String
});

var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [Keywords]
});

var BookModel = mongoose.model('Book', Book);

app.get('/api', function(rquest, response) {
    response.send('Library API is available.');
});

app.get('/api/books', function(request, response) {
    return BookModel.find(function(err, books) {
        if (!err) {
            return response.send(books);
        } else {
            return console.log(err);
        }
    });
});

app.get('/api/books/:id', function(request, response) {
    return BookModel.findById(request.params.id, function(err, book) {
        if (!err) {
            return response.send(book);
        } else {
            return console.log(err);
        }
    });
});

app.post('/api/books', function(request, response) {
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate,
        keywords: request.body.keywords
    });
    book.save(function(err) {
        if (!err) {
            return console.log('Added successfully!');
        } else {
            return console.log(err);
        }
    });
    return response.send(book);
});

app.put('/api/books/:id', function(request, response) {
    console.log('Update:: ' + request.body.title);
    return BookModel.findById(request.params.id, function(err, book) {
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;
        book.keywords = request.body.keywords;

        return book.save(function(err) {
            if (!err) {
                console.log('Updated successfully');
            } else {
                console.log(err);
            }
            return response.send(book);
        });
    });
});

app.delete('/api/books/:id', function(request, response) {
    console.log('Deleting:: ' + request.params.id);
    return BookModel.findById(request.params.id, function(err, book) {
        return book.remove(function(err) {
            if (!err) {
                console.log('Deleted successfully');
                return response.send('');
            } else {
                console.log(err);
            }
        });
    });
});
