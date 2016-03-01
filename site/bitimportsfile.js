var System = (function (global) {
  /** dependency mapping */
  var paths = {
    "loadstyle-bits": "node_modules/loadstyle-bits/dist/index",
    "three": "node_modules/three/three",
    "three/examples/js/renderers/CanvasRenderer": "node_modules/three/examples/js/renderers/CanvasRenderer",
    "three/examples/js/renderers/Projector": "node_modules/three/examples/js/renderers/Projector"
  };

  /** known file extensions that bitimports won't convert to .js */
  var extensions = ["css"];

  return bitimports
    .config({
      paths: paths,
      extensions: extensions
    })
    // Setup js pipeline with babel
    .plugin("js", {
      match: { path: /\.(js)$/ }
    })
    // Setup style pipeline
    .plugin("style", {
      match: { path: /\.(css)$/ },
      transform: "loadstyle-bits"
    });
})();

System.import(["main"]);
