/*global $ */
/*jshint unused:false */

(function(OJ) {
  'use strict';

  var nodeName = 'li';
  var className = 'todoitem';
  OJ.components.members[className] = nodeName;
  OJ.components.register(className, function(options, owner) {
    var todoitem, view, item, input, inputprops, label, editInput, destroy, defaults = {
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

    input = view.make('input', {
      props: inputprops,
      events: { click: toggleCompleted }
    });

    label = view.make('label', {
      text: item.title,
      events: { dblclick: edit }
    });

    destroy = view.make('button', {
      props: { class: 'destroy' },
      events: { click: clear }
    });

    editInput = todoitem.make('input', {
      props: { class: 'edit', value: item.title },
      events: {
        keypress: updateOnEnter,
        keydown: revertOnEscape,
        blur: close
      }
    });

    function toggleCompleted() {
      item.completed = !item.completed;
      options.todos.update(item);
    }

    function clear() {
      options.todos.delete(item);
      todoitem.remove();
    }

    function edit() {
      todoitem.addClass('editing');
      input.el.focus();
    }

    function updateOnEnter() {

    }

    function revertOnEscape() {

    }

    function close() {
        var value = editInput.val();
        var trimmedValue = value.trim();

        // We don't want to handle blur events from an item that is no
        // longer being edited. Relying on the CSS class here has the
        // benefit of us not having to maintain state in the DOM and the
        // JavaScript logic.
        if (!todoitem.$.hasClass('editing')) {
          return;
        }

        if (trimmedValue) {
          item.title = trimmedValue;
          options.todos.update(item);

          if (value !== trimmedValue) {
            // Model values changes consisting of whitespaces only are
            // not causing change to be triggered Therefore we've to
            // compare untrimmed version with a trimmed one to check
            // whether anything changed
            // And if yes, we've to trigger change event ourselves
            this.model.trigger('change');
          }
        } else {
          clear();
        }

      todoitem.removeClass('editing');
    }

    return todoitem;
  });
})((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);