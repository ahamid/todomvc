/*global $ */
/*jshint unused:false */

var app = app || {};

$(function () {
  'use strict';

  var Todos = app.Todos = function (name) {
    this.name = name || 'todomvc-oj';
    this.counter = -1;
    var store = localStorage[this.name];
    this.index = (store && store.split(',')) || [];
  }

  Todos.nextId = function() {
    counter++;
    return counter;
  };

  Todos.add = function(obj) {
    var key = this.name + '-' + this.nextId();
    this.index.unshift(key);
    localStorage[key] = JSON.stringify(obj);
    localStorage[this.name] = JSON.stringify(this.index);
  }

  Todos.deleteAt = function(idx) {
    var key = this.index.splice(idx, 1);
    localStorage[this.name] = JSON.stringify(this.index);
    localStorage.removeItem(key);
  }

  Todos.itemAt = function(idx) {
    return JSON.parse(localStorage.getItem(this.index[idx]));
  }

  Todos.updateAt = function(idx, obj) {
    localStorage[this.index[idx]] = JSON.stringify(obj);
  }

});
