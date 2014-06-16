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

  app.filter = app.Filter.loadFilter();

  function updateFilter(name) {
    app.filter.attr('filter', null);
    app.filter.save();
  }

  var router = Router({
    '/': updateFilter.bind(null, null),
    '/active': updateFilter.bind(null, 'active'),
    '/complete': updateFilter.bind(null, 'completed')
  });

  //todoapp = OJ.body.make('todoapp', { props: { id: 'todoapp' } });

  new app.TodoApp({ props: { id: 'todoapp' }});

  var info = OJ.body.make('info', { props: { id: 'info' } });

  router.configure({
    on: function() {
      alert("routed " + window.location);
    }
  })
  router.init();

});
