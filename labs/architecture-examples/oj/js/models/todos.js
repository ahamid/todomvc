var app = app || {};

(function() {
  /*jshint validthis:true */
  'use strict';

  var Todos = app.Todos = function (name) {
    this.name = name || 'todomvc-oj';
    var store = localStorage[this.name];
    loadIndex.call(this, (store && store.split(',')) || []);
  };

  function loadIndex(index) {
    this.index = index;
    this.counter = this.index.length > 0 ? this.index[0].split('-').pop() : -1;
  }

  function saveIndex() {
    localStorage[this.name] = this.index.join(',');
  }

  function nextId() {
    this.counter++;
    return this.counter;
  }

  Todos.prototype.add = function(obj) {
    var key = this.name + '-' + nextId.call(this);
    this.index.unshift(key);
    obj.key = key;
    localStorage[key] = JSON.stringify(obj);
    saveIndex.call(this);
  };

  Todos.prototype.all = function() {
    var items = [];
    this.index.forEach(function(key) {
      items.push(JSON.parse(localStorage[key]));
    });
    return items;
  };

  Todos.prototype.delete = function(obj) {
    var idx;
    if (!obj || !obj.key) {
      return;
    }
    idx = this.index.indexOf(obj.key);
    if (idx > -1) {
      this.index.splice(idx, 1);
      saveIndex.call(this);
    }
    localStorage.removeItem(obj.key);
  };

  Todos.prototype.deleteAt = function(idx) {
    var key = this.index.splice(idx, 1);
    saveIndex.call(this);
    localStorage.removeItem(key);
  };

  Todos.prototype.itemAt = function(idx) {
    return JSON.parse(localStorage.getItem(this.index[idx]));
  };

  Todos.prototype.updateAt = function(idx, obj) {
    localStorage[this.index[idx]] = JSON.stringify(obj);
  };

  Todos.prototype.update = function(obj) {
    localStorage[obj.key] = JSON.stringify(obj);
  };

  Todos.prototype.size = function () {
    return this.index.length;
  };

  Todos.prototype.clear = function() {
    var prevIndex = this.index;
    this.index = [];
    prevIndex.forEach(function(key) {
      localStorage.removeItem(key);
    });
    saveIndex.call(this);
  };
})();
