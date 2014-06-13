/*global jQuery, _ */

/**
 * Patch ThinDOM to add `prepend` function
 */
(function(context) {
  'use strict';

  var originalThinDOM = context.ThinDOM;
  context.ThinDOM = function(tag, attributes, el) {
    var ret = originalThinDOM(tag, attributes, el);

    ret.prepend = function(other) {
      var self = this;
      var firstChild = self.el.firstChild;
      if (other.THINDOM) {
        self.el.insertBefore(other.get(), firstChild);
      } else if (other instanceof jQuery) {
        if (other.length > 1) {
          _.forEach(other, function(i, otherEl) {
            self.el.insertBefore(otherEl, firstChild);
          });
        } else {
          self.el.insertBefore(other[0], firstChild);
        }
      } else {
        if (_.isElement(other)) {
          self.el.insertBefore(other, firstChild);
        }
      }
      return self;
    };

    return ret;
  };

})(typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this));