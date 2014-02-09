/**
 * Created by tetran on 2014/02/09.
 */
var Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

var myTodo = new Todo({
   title: 'コンソールに出力されたモデルのプロパティを確認'
});


var TodoView = Backbone.View.extend({

    tagName: 'li',

    todoTpl: _.template($('#item-template').html()),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    initialize: function() {
        this.$el = $('#todo');
        this.render();
    },

    render: function() {
        this.$el.html(this.todoTpl(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },

    edit: function() {

    },

    close: function() {

    },

    updateOnEnter: function() {

    }

});

var todoView = new TodoView({model: myTodo});