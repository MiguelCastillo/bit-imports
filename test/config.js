/*eslint no-unused-vars: 0 */
var System = (function() {
  var importer = bitimports.config({
    "baseUrl": "../",
    "paths": {
      "chai": "node_modules/chai/chai"
    },
    "shim": {
      "mocha": {
        "exports": "mocha"
      }
    },
    "urlArgs": "bust=" + (new Date()).getTime()
  });

  importer.ignore([{ fileName: "bundle.js" }]);
  importer.logger.enable();
  return importer;
})();
