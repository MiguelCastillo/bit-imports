define(["dist/amd-loader"], function(AMDLoader) {
  describe("Test suite", function() {
    var bitloader;
    beforeEach(function() {
      bitloader = new AMDLoader();
    });

    describe("When loading `number.js`", function() {
      var numero;
      beforeEach(function() {
        return bitloader.import("js/number.js")
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
