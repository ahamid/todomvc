/*global $ */
/*jshint unused:false */

(function(OJ) {
  'use strict';

  var nodeName = 'li';
  var className = 'todoitem';
  OJ.components.members[className] = nodeName;
  OJ.components.register(className, function(options, owner) {
    var todoitem, view, item, input, inputprops, edit, destroy, defaults = {
      props: {
      }
    };

    OJ.extend(defaults, options, true);

    todoitem = OJ.element(nodeName, defaults.props, defaults.styles, defaults.events, defaults.text);
    OJ.nodes.factory(todoitem, owner);

    item = options.item;

    view = todoitem.make('div', { props: { class: 'view' } });

    inputprops = { class: 'toggle', type: 'checkbox' };
    if (item.completed) {
      inputprops.checked = 'checked';
    }

    input = view.make('input', { props: inputprops, events: {
      click: function(e) {
        item.completed = !item.completed;
        options.todos.update(item);
      }
    }});
    view.make('label', { text: item.title });
    destroy = view.make('button', { props: { class: 'destroy' },  events: {
      click: function(e) {
        options.todos.delete(item);
        todoitem.remove();
      }
    }});
    edit = todoitem.make('input', { props: { class: 'edit', value: item.title }});

    return todoitem;
  });
})((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);