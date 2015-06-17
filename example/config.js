/* jshint unused: false, undef: false */
var System = (function() {
  var importer = bitimports.config({
    "baseUrl": ".",
    "paths": {
      "babel": "../node_modules/babel-bits/dist/index.min.js",
      "sass": "../node_modules/sassy-bits/dist/index.js",
    }
  });


  // Setup js pipeline
  importer.plugin("js", {
    match: {
      path: '**/*.js'
    },
    transform: {
      handler: "babel",
      options: {
        sourceMap: "inline"
      }
    }
  });


  // Setup sass pipeline
  importer.plugin("sass", {
    match: {
      path: ['**/*.css', '**/*.scss']
    },
    transform: "sass"
  });


  return importer;
})();

var require = System.require;
