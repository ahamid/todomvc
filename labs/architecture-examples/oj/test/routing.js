describe('Todos', function() {
  var fired = [];

  function navigate(hash, callback) {
    window.location.hash = hash;
    setTimeout(callback, 14);
  }

  function initRouter() {
    fired = [];
    var router = app.Router(function(name) {
      fired.push(name);
    });
    router.init();
    return router;
  }

  beforeEach(function(done) {
    navigate('', done)
  });

  describe('when no hash', function(){
    beforeEach(function() {
      initRouter();
    });

    it('it should not fire route', function(){
      assert.equal(fired.length, 0, "route was fired");
    });
  });

  var testCases = { '': null, active: 'active', completed: 'completed' };
  for (var route in testCases) {
    describe('when #/' + route, function () {
      beforeEach(function (done) {
        navigate("#/" + route, function () {
          initRouter();
          done();
        });
      });

      it('should fire ' + route + ' route', function () {
        assert.equal(fired.length, 1);
        assert.deepEqual(fired[0], testCases[route]);
      });
    });
  }

});