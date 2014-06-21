/*global app, ENTER_KEY */

(function(OJ) {
  'use strict';

  app.Stats = OJComponent('stats', 'footer', function (stats, options, owner) {
    var remaining_span, remaining_count, remaining_text, clear, filters, filterLinks;
    remaining_span = stats.make('span', { props: { id: 'todo-count' } });
    remaining_count = remaining_span.make('strong');

    remaining_text = document.createTextNode('');
    remaining_span.el.appendChild(remaining_text);

    filters = stats.make('ul', { props: { id: 'filters'}});
    filterLinks = {
      all: filters.make('li').make('a', {
        props: { 'class': 'selected', href: '#/' },
        events: { click: selectedFilter.bind(null, 'all') },
        text: 'All' }),
      active: filters.make('li').make('a', {
        props: { href: '#/active' },
        events: { click: selectedFilter.bind(null, 'active') },
        text: 'Active' }),
      completed: filters.make('li').make('a', {
        props: { href: '#/completed' },
        events: { click: selectedFilter.bind(null, 'completed') },
        text: 'Completed' })
    }

    function selectedFilter(name) {
      if (name == '') {
        name = 'all';
      }
      for (var filterLinkName in filterLinks) {
        if (filterLinkName == name) {
          filterLinks[filterLinkName].addClass('selected');
        } else {
          filterLinks[filterLinkName].removeClass('selected');
        }
      }
    }

    clear = stats.make('button', {
      props: { id: 'clear-completed' },
      events: { click: clearCompleted }
    });
    clear.hide();

    app.Todo.bind('add', update);
    app.Todo.bind('add', function(model) {
      model.bind('change:completed', update);
    });
    app.Todo.bind('remove', update);
    app.Filter.bind('add', function(added) {
      selectedFilter(added.attr('filter'));
    });
    app.Filter.bindAny('change:filter', function(changed) {
      selectedFilter(changed.attr('filter'));
    });

    function update() {
      var completed = app.Todo.completed().count();
      var remaining = app.Todo.count() - completed;

      remaining_count.el.textContent = remaining;
      remaining_text.textContent = (remaining == 1 ? ' item' : ' items') + ' left';

      if (completed) {
        clear.html('Clear completed  (' + completed + ')');
        clear.show();
      } else {
        clear.hide();
      }
    }

    // Clear all completed todo items, destroying their models.
    function clearCompleted() {
      app.Todo.completed().each(function() {
        this.destroy();
      });
    }

    return stats;
  });

})();