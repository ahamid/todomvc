/*global $, OJ */
/*jshint unused:false */

var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

  function initOJ() {
    if (!OJ.body.make) {
      OJ.nodes.div();
    }
  }

  initOJ();

  // HTML5-History-API breaks hashchange events, so we have to rely on OJ popstate hook
  // https://github.com/devote/HTML5-History-API/pull/59
  OJ.subscribe('restoreState', function(eventName, locationObj) {
    var filter = locationObj.pageName.replace(/^\//, '');
    updateFilter(filter);
  });

  new app.TodoApp({ props: { id: 'todoapp' }});

  var info = OJ.body.make('info', { props: { id: 'info' } });

  app.filter = app.Filter.loadFilter();

  function updateFilter(name) {
    app.filter.attr('filter', name);
    app.filter.save();
  }

  function initRouter() {
    var router = app.Router(updateFilter);
    router.init();
  }

  if (window.location.hash == null || window.location.hash.match(/^(#\/?)?$/)) {
    if (app.filter.attr('filter')) {
      // if the default (all) view is loaded but there is a saved filter
      // then update location and load the filter
      window.location.hash = '#/' + app.filter.attr('filter');
      initRouter = _.debounce(initRouter, 14);
    }
  }

  initRouter();
});
