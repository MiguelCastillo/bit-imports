/* jshint unused: false, undef: false */
var System = (function() {
  var importer = bitimports.config({
    "baseUrl": "../",
    "paths": {
      "mocha": "../node_modules/mocha/mocha",
      "chai": "../node_modules/chai/chai"
    },
    "shim": {
      "mocha": {
        "exports": "mocha"
      }
    },
    "urlArgs": 'bust=' + (new Date()).getTime()
  });

  // Add modules to exclude from pipeline processing
  importer.ignore(["chai", "dist/bit-imports"]);

  importer.logger.enable();
  return importer;
})();

var require = System.import;
