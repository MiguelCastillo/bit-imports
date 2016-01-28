/* jshint unused: false, undef: false */
var System = bitimports
  .config({
    "paths": {
      "babel-bits": "node_modules/babel-bits/dist/index.min",
      "loadstyle-bits": "node_modules/loadstyle-bits/dist/index.min",
      "three": "node_modules/three/three.min",
      "CanvasRenderer": "node_modules/three/examples/js/renderers/CanvasRenderer",
      "Projector": "node_modules/three/examples/js/renderers/Projector"
    },
    "extensions": ["css"]
  })
  // Setup js pipeline with babel
  .plugin("js", {
    match: { path: /\.(js)$/ },
    transform: {
      handler: "babel-bits",
      options: {
        sourceMap: "inline",
        presets: ["es2015"]
      }
    }
  })
  // Setup style pipeline
  .plugin("style", {
    match: { path: /\.(css)$/ },
    transform: "loadstyle-bits"
  });

// Load application
System.import("main");
