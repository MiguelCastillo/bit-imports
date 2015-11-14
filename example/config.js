/* jshint unused: false, undef: false */
var System = (function() {

  // Get the extension rule matches
  var extension = bitimports.Rule.matcher.extension;

  // Create instance of bitimports
  var importer = bitimports.config({
    "paths": {
      "babel": "../node_modules/babel-bits/dist/index.min.js",
      "loadstyle": "../node_modules/loadstyle-bits/dist/index.js",
      "threejs": "effects/three.min.js"
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
  importer.plugin("style", {
    match: {
      path: extension("css")
    },
    transform: "loadstyle",
    compile: function(meta) {
      return {
        exports: meta.source
      };
    }
  });

  return importer;
})();

// Expose `require` globally
var require = System.import;

// Load application
System.import("main");
