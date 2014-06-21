/*global OJ */
/*jshint unused:false */

var app = app || {};

(function () {
  'use strict';

  app.Router = function(callback) {
    return Router({
      '/': callback.bind(null, null),
      '/active': callback.bind(null, 'active'),
      '/completed': callback.bind(null, 'completed')
    })
  };
})();