/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';


  var todoapp, header, h1, newtodo, main, toggleall, todolist, footer, info;
  if (!OJ.body.make) OJ.nodes.div();
  todoapp = OJ.body.make('section', { props: { id: 'todoapp' } });
  (header = todoapp.make('header', { props: { id: 'header' }}))
                   .make('h1', { text: 'todos' });
  newtodo = header.make('input', { props: { id: 'new-todo',
                                   placeholder: 'What needs to be done?',
                                   autofocus: 'autofocus' },
   events: {
    keypress: function(e) {
      // If you hit return in the main input field, create new **Todo** model,
      // persisting it to *localStorage*.
        if (e.which === ENTER_KEY && newtodo.val().trim()) {
          //app.todos.create(this.newAttributes());
          var thenewtodo = newtodo.newAttributes();
          newtodo.val('');
        }
      }
    }
  });
  newtodo.newAttributes = function() {
    return {
      title: newtodo.val().trim(),
      //order: app.todos.nextOrder(),
      completed: false
    };
  };



  main = todoapp.make('section', { props: { id: 'main' } });
  toggleall = main.make('input', { props: { id: 'toggle-all', type: 'checkbox' }});
  main.make('label', { text: 'Mark all as complete', props:{'for': 'toggle-all' } });
  todolist =  main.make('ul', { props: { id: 'todo-list' } });
  footer = todoapp.make('footer', { props: {id: 'footer'} });

  info = OJ.body.make('footer', { props: { id: 'info' } });
  info.make('p', { text: 'Double-click to edit todo '});
  info.make('p', { text: 'Written by ' })
      .make('a', { text: 'Aaron Hamid', props: { href: '#' } }); // add text nodes
  info.make('p', { text: 'Part of ' })
      .make('a', { text: 'TodoMVC', props: { href: 'http://todomvc.com' } }); // add text nodes

});
