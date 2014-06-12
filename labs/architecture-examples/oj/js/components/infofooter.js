/*global $ */
/*jshint unused:false */

(function(OJ) {
  'use strict';

  var nodeName = 'footer';
  var className = 'infofooter';
  OJ.components.members[className] = nodeName;
  OJ.components.register(className, function(options, owner) {
    var info, header, h1, newtodo, main, toggleall, todolist, footer, defaults = {
      props: {
      }
    };
    OJ.extend(defaults, options, true);

    info = OJ.element(nodeName, defaults.props, defaults.styles, defaults.events, defaults.text);
    OJ.nodes.factory(info, owner);


    info.make('p', { text: 'Double-click to edit todo '});
    info.make('p', { text: 'Written by ' })
      .make('a', { text: 'Aaron Hamid', props: { href: '#' } }); // add text nodes
    info.make('p', { text: 'Part of ' })
      .make('a', { text: 'TodoMVC', props: { href: 'http://todomvc.com' } }); // add text nodes

    return info;
  });
})((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);