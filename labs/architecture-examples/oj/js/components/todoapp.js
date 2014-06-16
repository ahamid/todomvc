/*global app, ENTER_KEY */

(function(OJ) {
  'use strict';

  app.TodoApp = OJComponent('todoapp', 'section', function(todoapp, options, owner) {
    var todolist, header, newtodo, main, toggleall, footer;

    (header = todoapp.make('header', { props: { id: 'header' }}))
      .make('h1', { text: 'todos' });
    newtodo = header.make('input', { props: { id: 'new-todo',
      placeholder: 'What needs to be done?',
      autofocus: 'autofocus' },
      events: { keypress: newTodoKeyPress }
    });

    function newTodoKeyPress(e) {
      var newtodoitem, todomodel;
      // If you hit return in the main input field, create new **Todo** model,
      // persisting it to *localStorage*.
      if (e.which === ENTER_KEY && newtodo.val().trim()) {
        todomodel = new app.Todo({ title: newtodo.val().trim() });
        todomodel.save();
        newtodo.val('');

        newtodoitem = new app.TodoItem(todolist, { item: todomodel });
        // move it to the top
        todolist.prepend(newtodoitem);
        //todoapp.todolist.el.insertBefore(newtodoitem.el, todoapp.todolist.el.firstChild);
        // 			var view = new app.TodoView({ model: todo });
        // this.$list.append(view.render().el);
      }
    }

    main = todoapp.make('section', { props: { id: 'main' } });
    toggleall = main.make('input', {
      props: { id: 'toggle-all', type: 'checkbox' },
      events: { click: toggleAllCompleted }
    });
    main.make('label', { text: 'Mark all as complete', props:{'for': 'toggle-all' } });
    todolist =  main.make('ul', { props: { id: 'todo-list' } });
    footer = new app.Stats(todoapp, { props: {id: 'footer'} });

    function toggleAllCompleted(e) {
      var completed = toggleall.value;

      app.Todo.each(function() {
        this.attr('completed', completed);
        this.save();
      });
    }

    app.Todo.bind('add', update);
    app.Todo.bind('add', function(model) {
      model.bind('change:completed', update);
    });
    app.Todo.bind('remove', update);

    function update() {
      var completed = app.Todo.completed().count();
      var remaining = app.Todo.count() - completed;
      toggleall.el.checked = !remaining;
    }

    app.Todo.load(function(todos) {
      // render most recently added first
      todos.reverse();
      todos.forEach(function(todo) {
        new app.TodoItem(todolist, { item: todo });
      });
    });

    return todoapp;
  });
})((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);