/*global $, OJ */
/*jshint unused:false */

var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

$(function () {
	'use strict';

  var todoapp, info;

  function initOJ() {
    if (!OJ.body.make) {
      OJ.nodes.div();
    }
  }

  initOJ();

  //todoapp = OJ.body.make('todoapp', { props: { id: 'todoapp' } });

  new app.TodoApp({ props: { id: 'todoapp' }});

  info = OJ.body.make('info', { props: { id: 'info' } });

});
