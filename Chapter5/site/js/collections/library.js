/**
 * Created by tetran on 2014/02/11.
 */
var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book,
    url: '/api/books'
});

