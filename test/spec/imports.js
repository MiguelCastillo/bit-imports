var Importer = require("dist/bit-imports");

function noop(arg) {return arg;}

describe("Imports Test Suite", function() {
  var importer;
  beforeEach(function() {
    importer = Importer.create();
  });


  describe("When calling `transform` with anonymous function as input", function() {
    var result, source;
    beforeEach(function() {
      source = "function x() {}";
      return importer.transform(source)
        .then(function(_result){
          result = _result;
        }, noop);
    });

    it("then transform generates a string as output", function() {
      expect(result).to.be.a('string');
    });
  });

});
