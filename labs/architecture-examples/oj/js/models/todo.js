/*global Model*/
var app = app || {};

(function() {
  /*jshint validthis:true */
  'use strict';

  // Todo Model
  // ----------

  app.Todo = new Model("Todo", function() {
    this.persistence(Model.localStorage);

    this.extend({
      completed: function () {
        return this.select(function () {
          return this.attr('completed');
        });
      }
    });
  });

})();