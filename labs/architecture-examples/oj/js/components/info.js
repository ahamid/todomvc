/*global $ */
/*jshint unused:false */

(function(OJ) {
  'use strict';

  app.InfoFooter = OJComponent('info', 'footer', function(info, options, owner) {
    var header, h1, newtodo, main, toggleall, todolist, footer;

    info.make('p', { text: 'Double-click to edit todo '});
    info.make('p', { text: 'Written by ' })
      .make('a', { text: 'Aaron Hamid', props: { href: '#' } }); // add text nodes
    info.make('p', { text: 'Part of ' })
      .make('a', { text: 'TodoMVC', props: { href: 'http://todomvc.com' } }); // add text nodes

    return info;
  });
})((typeof global !== 'undefined' && global ? global : (typeof window !== 'undefined' ? window : this)).OJ);