/* jshint unused: false, undef: false */
var System = (function() {

  // Create instance of bitimports
  var importer = bitimports.config({
    "paths": {
      "babel": "node_modules/babel-bits/dist/index.min.js",
      "loadstyle": "node_modules/loadstyle-bits/dist/index.js",
      "threejs": "node_modules/three/three.min.js",
      "CanvasRenderer": "node_modules/three/examples/js/renderers/CanvasRenderer.js",
      "Projector": "node_modules/three/examples/js/renderers/Projector.js"
    },
    "extensions": ["css"]
  });

  // Make sure we don't process three js
  importer.ignore([
    "threejs",
    "effects/Projector",
    "effects/CanvasRenderer"
  ]);

  // Setup js pipeline
  importer.plugin("js", {
    match: { path: /\.(js)$/ },
    transform: {
      handler: "babel",
      options: {
        sourceMap: "inline"
      }
    }
  });

  // Setup sass pipeline
  importer.plugin("style", {
    match: { path: /\.(css)$/ },
    transform: "loadstyle"
  });

  return importer;
})();

// Expose `require` globally
var require = System.import;

// Load application
System.import("main");
