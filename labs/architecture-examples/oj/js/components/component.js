(function() {

  OJComponent = function (className, nodeName, builder) {
    OJ.components.members[className] = nodeName;
    OJ.components.register(className, buildComponent);

    function buildComponent(options, owner) {
      var oj_el = OJ.element(nodeName, options.props, options.styles, options.events, options.text);
      OJ.nodes.factory(oj_el, owner);

      return builder ? builder(oj_el, options, owner) : oj_el;
    }

    function OJComponentConstructor(parent_el, options) {
      if (arguments.length < 2) {
        options = parent_el;
        parent_el = OJ.body;
      }
      return parent_el.make(className, options);
    }

    OJComponentConstructor.prototype = {
      className: className,
      nodeName: nodeName,
      constructor: OJComponentConstructor
    };

    return OJComponentConstructor;
  }

})();