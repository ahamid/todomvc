/*global $ */
/*jshint unused:false */

(function(OJ) {
  'use strict';

  app.TodoItem = OJComponent('todoitem', 'li', function(todoitem, options, owner) {
    var view, item, input, inputprops, label, editInput, destroy;

    item = options.item;

    view = todoitem.make('div', { props: { class: 'view' } });

    inputprops = { class: 'toggle', type: 'checkbox' };
    if (item.attr('completed')) {
      inputprops.checked = 'checked';
    }

    input = view.make('input', {
      props: inputprops,
      events: { click: toggleCompleted }
    });

    label = view.make('label', {
      text: item.attr('title'),
      events: { dblclick: edit }
    });

    destroy = view.make('button', {
      props: { class: 'destroy' },
      events: { click: clear }
    });

    editInput = todoitem.make('input', {
      props: { class: 'edit', value: item.attr('title') },
      events: {
        keypress: updateOnEnter,
        keydown: revertOnEscape,
        blur: close
      }
    });

    app.Filter.bind('add', filter);
    app.Filter.bindAny('change:filter', filter);

    item.bind('change:completed', function(model) {
      input.el.checked = model.attr('completed');
      styleCompleted(model);
    });
    item.bind('destroy', function(model) {
      todoitem.remove();
    });

    function styleCompleted(model) {
      if (model.attr('completed')) {
        todoitem.addClass('completed');
      } else {
        todoitem.removeClass('completed');
      }
    }

    function toggleCompleted() {
      item.attr('completed',!item.attr('completed'));
      item.save();
    }

    function clear() {
      item.destroy();
    }

    function edit() {
      todoitem.addClass('editing');
      input.el.focus();
    }

    function updateOnEnter(e) {
      if (e.which === ENTER_KEY) {
        close();
      }
    }

    function revertOnEscape(e) {
      if (e.which === ESC_KEY) {
        todoitem.removeClass('editing');
        // Also reset the hidden input back to the original value.
        editInput.val(item.get('title'));
      }
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
          item.attr('title', trimmedValue);
          item.save();

          label.html('');
          label.text(value);
        } else {
          clear();
        }

      todoitem.removeClass('editing');
    }

    function filter(model) {
      var show = true,
          name = model.attr('filter');
      if (name == 'active') {
        show = !item.attr('completed');
      } else if (name == 'completed') {
        show = item.attr('completed');
      }

      if (show) {
        todoitem.show();
      } else {
        todoitem.hide();
      }
    }

    styleCompleted(item);

    return todoitem;
  });
})((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);