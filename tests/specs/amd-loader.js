define(["dist/amd-loader"], function(AMDLoader) {
  describe("Test suite", function() {
    var loader;
    beforeEach(function() {
      loader = new AMDLoader();
    });

    describe("When loading `number.js`", function() {
      var numero;
      beforeEach(function() {
        return loader.import("js/number.js")
          .then(function(_numero) {
            numero = _numero;
          });
      });

      it("then `numero` is `3.1.4`", function() {
        expect(numero).to.equal(3.14);
      });
    });
  });
});
