/*global app, ENTER_KEY */

(function(OJ) {
  'use strict';

  var nodeName = 'section';
  var className = 'todoapp';
  OJ.components.members[className] = nodeName;
  OJ.components.register(className, function(options, owner) {
    var todoapp, todos, header, newtodo, main, toggleall, footer, defaults = {
      props: {
      }
    };

    OJ.extend(defaults, options, true);
    todoapp = OJ.element(nodeName, defaults.props, defaults.styles, defaults.events, defaults.text);
    OJ.nodes.factory(todoapp, owner);

    //if (!OJ.body.make) OJ.nodes.div();

    //todoapp = OJ.body.make('section', { props: { id: 'todoapp' } });
    (header = todoapp.make('header', { props: { id: 'header' }}))
      .make('h1', { text: 'todos' });
    newtodo = header.make('input', { props: { id: 'new-todo',
      placeholder: 'What needs to be done?',
      autofocus: 'autofocus' },
      events: {
        keypress: function(e) {
          var newtodoitem, todomodel;
          // If you hit return in the main input field, create new **Todo** model,
          // persisting it to *localStorage*.
          if (e.which === ENTER_KEY && newtodo.val().trim()) {
            todomodel = new app.Todo({ title: newtodo.val().trim() });
            todomodel.save();
            newtodo.val('');

            newtodoitem = todoapp.todolist.make('todoitem', { item: todomodel });
            // move it to the top
            todoapp.todolist.prepend(newtodoitem);
            //todoapp.todolist.el.insertBefore(newtodoitem.el, todoapp.todolist.el.firstChild);
            // 			var view = new app.TodoView({ model: todo });
            // this.$list.append(view.render().el);
          }
        }
      }
    });

    main = todoapp.make('section', { props: { id: 'main' } });
    toggleall = main.make('input', { props: { id: 'toggle-all', type: 'checkbox' }});
    main.make('label', { text: 'Mark all as complete', props:{'for': 'toggle-all' } });
    todoapp.todolist =  main.make('ul', { props: { id: 'todo-list' } });
    footer = todoapp.make('footer', { props: {id: 'footer'} });

    app.Todo.load(function(todos) {
      // render most recently added first
      todos.reverse();
      todos.forEach(function(todo) {
        var loadeditem = todoapp.todolist.make('todoitem', { item: todo });
        todoapp.todolist.append(loadeditem);
      });
    });

    return todoapp;
  });
})((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);