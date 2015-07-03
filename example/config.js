/* jshint unused: false, undef: false */
var System = (function() {

  // Get the extension rule matches
  var extension = bitimports.Rule.matcher.extension;

  // Create instance of bitimports
  var importer = bitimports.config({
    "paths": {
      "babel": "/node_modules/babel-bits/dist/index.min.js",
      "sass": "/node_modules/sassy-bits/dist/index.min.js",
      "threejs": "effects/three.min.js"
    },
    "extensions": ["css", "scss"]
  });

  // Make sure we don't process three js
  importer.ignore([
    "threejs",
    "effects/Projector",
    "effects/CanvasRenderer"
  ]);

  // Setup js pipeline
  importer.plugin("js", {
    match: {
      path: extension("js")
    },
    transform: {
      handler: "babel",
      options: {
        blacklist: ["react"],
        sourceMap: "inline"
      }
    }
  });

  // Setup sass pipeline
  importer.plugin("sass", {
    match: {
      path: extension("css|scss")
    },
    transform: "sass"
  });

  return importer;
})();

// Expose `require` globally
var require = System.require;

// Load application
System.import("main");
