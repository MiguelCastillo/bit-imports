/* jshint unused: false, undef: false */
var System = (function() {

  // Create instance of bitimports
  var importer = bitimports.config({
    "paths": {
      "babel-bits": "node_modules/babel-bits/dist/index.min",
      "loadstyle-bits": "node_modules/loadstyle-bits/dist/index.min",
      "three": "node_modules/three/three.min",
      "CanvasRenderer": "node_modules/three/examples/js/renderers/CanvasRenderer",
      "Projector": "node_modules/three/examples/js/renderers/Projector"
    },
    "extensions": ["css"]
  });

  // Setup js pipeline
  importer.plugin("js", {
    match: { path: /\.(js)$/ },
    transform: {
      handler: "babel-bits",
      options: {
        sourceMap: "inline",
        presets: ["es2015"]
      }
    }
  });

  // Setup sass pipeline
  importer.plugin("style", {
    match: { path: /\.(css)$/ },
    transform: "loadstyle-bits"
  });

  return importer;
})();

// Expose `require` globally
var require = System.import;

// Load application
System.import("main");
