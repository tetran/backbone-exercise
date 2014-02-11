/**
 * Created by tetran on 2014/02/11.
 */
var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    events: {
        'click #add': 'addBook'
    },

    initialize: function(initialBooks) {
        this.collection = new app.Library(initialBooks);
        this.collection.fetch({reset: true});
        this.render();

        this.listenTo(this.collection, 'add', this.renderBook);
        this.listenTo(this.collection, 'reset', this.render);
    },

    render: function() {
        this.collection.each(function(item) {
            this.renderBook(item);
        }, this);
    },

    renderBook: function(item) {
        var bookView = new app.BookView({
            model: item
        });

        this.$el.append(bookView.render().el);
    },

    addBook: function(e) {
        e.preventDefault();

        var formDate = {};

        $('#addBook div').children('input').each(function(i, el) {
            if ($(el).val() != '') {
                if (el.id === 'keywords') {
                    formDate[el.id] = [];
                    _.each($(el).val().split(' '), function(keyword) {
                        formDate[el.id].push({'keyword': keyword});
                    });
                } else if (el.id === 'releaseDate') {
                    formDate[el.id] = $('#releaseDate').datepicker('getDate').getTime();
                } else {
                    formDate[el.id] = $(el).val();
                }
            }
            $(el).val('');
        });

        this.collection.create(formDate);
    }
});
