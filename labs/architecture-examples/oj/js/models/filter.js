/*global Model*/
var app = app || {};

(function() {
  /*jshint validthis:true */
  'use strict';

  // Todo Model
  // ----------

  app.Filter = new Model("Filter", function() {
    this.persistence(Model.localStorage);

    this.extend({
      loadFilter: function() {
        var filter;
        if (this.count() > 0) {
          return this.first();
        } else {
          filter = new this();
          filter.save();
          return filter;
        }
      }
    })
  });

})();