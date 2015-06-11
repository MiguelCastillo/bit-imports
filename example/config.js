/* jshint unused: false, undef: false */
var System = (function() {
  var importer = bitimports.config({
    "baseUrl": ".",
    "paths": {
      "babel": "../node_modules/babel-bits/dist/index.min.js",
    }
  });

  importer.plugin("js", {
    transform: {
      handler: "babel",
      options: {
        sourceMap: "inline"
      }
    }
  });

  return importer;
})();

var require = System.require;
