/**
 * Created by tetran on 2014/02/11.
 */
var app = app || {};

app.Book = Backbone.Model.extend({
    defaults: {
        coverImage:  'img/placeholder.png',
        title: 'No Title',
        author: 'unknown',
        releaseDate: 'unknown',
        keyword: 'nothing'
    }
});
