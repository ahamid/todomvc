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

    ret.html = function(html) {
      var val = void 0;
      if (html == null) {
        val = ret.el.innerHTML;
      } else {
        ret.el.innerHTML = html;
        val = ret;
      }
      return val;
    };

    ret.css = function(properties, value) {
      if (_.isString(properties)) {
        return ret.el.style[properties] = value;
      } else if (_.isPlainObject(properties)) {
        return _.forOwn(properties, function(val, key) {
          if (val !== '') {
            ret.el.style[key] = val;
          }
        });
      }
    };

    return ret;
  };

})(typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this));