describe('Todos', function(){
  function newTestTodos() {
    return new app.Todos("todos-test");
  }

  var todos = newTestTodos();

  var an_item = { testAdd: "testAdd", key: "todos-test-0" };
  var another_item = { testAdd2: "testAdd2", key: "todos-test-1" };
  function clear() {
    after(function() {
      todos.clear();
    })
  }

  describe('initially', function() {
    it('should be empty', function() {
      assert.equal(0, todos.size());
    })
  });

  function populateItems() {
    before(function() {
      todos.add(an_item);
      todos.add(another_item);
    });
  }

  function behavesAsInitiallyPopulated() {
    it('should should have 2 items', function(){
      assert.equal(2, todos.size());
    });
    it('should should prepend the second added item', function() {
      assert.deepEqual(another_item, todos.itemAt(0));
    });
    it('should should contain the first added item', function() {
      assert.deepEqual(an_item, todos.itemAt(1));
    });
  }

  describe('#add()', function(){
    before(function() {
      todos.add(an_item);
    });

    describe("first item", function() {
      it('should should have 1 item', function(){
        assert.equal(1, todos.size());
      });
      it('should should allow access to the first added item by index', function() {
        assert.deepEqual(an_item, todos.itemAt(0));
      });
    });

    describe("second item", function() {
      before(function() {
        todos.add(another_item);
      });

      behavesAsInitiallyPopulated();
    });

    clear();
  });

  describe('#updateAt()', function(){
    populateItems();

    describe("before update", behavesAsInitiallyPopulated);

    describe("after update", function() {
      before(function() {
        todos.updateAt(1, { testAddUpdated: "testAddUpdated" });
        todos.updateAt(0, { testAddUpdated2: "testAddUpdated2" });
      });
      it('should should have 2 items', function(){
        assert.equal(2, todos.size());
      });
      it('should should update the first added item', function() {
        assert.deepEqual({testAddUpdated: "testAddUpdated"}, todos.itemAt(1));
      });
      it('should should update the second added item', function() {
        assert.deepEqual({testAddUpdated2: "testAddUpdated2"}, todos.itemAt(0));
      });
    });

    clear();
  });

  describe('#deleteAt()', function(){
    describe('delete first, then second', function() {

      populateItems();

      describe("before delete", behavesAsInitiallyPopulated);

      describe("after delete of first added item", function() {
        before(function() {
          todos.deleteAt(1);
        });

        it('should should have 1 items', function(){
          assert.equal(1, todos.size());
        });

        it('should should contain the second added item', function() {
          assert.deepEqual(another_item, todos.itemAt(0));
        });
      });


      describe("after delete of second added item", function() {
        before(function() {
          todos.deleteAt(0);
        });

        it('should should be empty', function(){
          assert.equal(0, todos.size());
        });
      });

      clear();
    });

    describe('delete second, then first', function() {

      populateItems();

      describe("before delete", behavesAsInitiallyPopulated);


      describe("after delete of second added item", function() {
        before(function() {
          todos.deleteAt(0);
        });

        it('should should have 1 items', function(){
          assert.equal(1, todos.size());
        });

        it('should should contain the first added item', function() {
          assert.deepEqual(an_item, todos.itemAt(0));
        });
      });

      describe("after delete of first added item", function() {
        before(function() {
          todos.deleteAt(0);
        });

        it('should should be empty', function(){
          assert.equal(0, todos.size());
        });
      });

      clear();
    });
  });

  describe('should persist items', function() {
    populateItems();

    describe("recreated Todos object", function() {
      before(function() {
        todos = newTestTodos();
      });

      behavesAsInitiallyPopulated();

      it("accepts new items", function() {
        todos.add({itemThree: "itemThree"});
        assert.deepEqual({itemThree: "itemThree", key: "test-todos-2"}, todos.itemAt(0));
      });
    });

    clear();
  });
});
