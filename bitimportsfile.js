System = (function () {
  /** dependency mapping */
  var paths = {
    "loadstyle-bits": "node_modules/loadstyle-bits/dist/index",
    "three": "node_modules/three/three",
    "three/examples/js/renderers/CanvasRenderer": "node_modules/three/examples/js/renderers/CanvasRenderer",
    "three/examples/js/renderers/Projector": "node_modules/three/examples/js/renderers/Projector"
  };

  /** known file extensions that bitimports won't convert to .js */
  var extensions = ["css", "js", "md"];

  return bitimports
    .config({
      paths: paths,
      extensions: extensions
    })
    // Setup js pipeline
    .plugin("js", {
      extensions: ["js", "md"]
    })
    // Setup style pipeline
    .plugin("style", {
      extensions: ["css"],
      transform: "loadstyle-bits"
    });
})();

System.logger.enable();
System.import(["main"]);
