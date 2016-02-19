(function (context) {
  /** modules to load when everything is ready to go */
  var entries = ["main"];

  /** bit imports module path */
  var bitimportsPath = "node_modules/bit-imports/dist/bit-imports.js";

  /** dependency mapping */
  var paths = {
    "loadstyle-bits": "node_modules/loadstyle-bits/dist/index",
    "three": "node_modules/three/three",
    "three/examples/js/renderers/CanvasRenderer": "node_modules/three/examples/js/renderers/CanvasRenderer",
    "three/examples/js/renderers/Projector": "node_modules/three/examples/js/renderers/Projector"
  };

  /** known file extensions that bitimports won't convert to .js */
  var extensions = ["css"];

  loadBitimports().then(function (bitimports) {
    return bitimports.config({
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
  })
  .then(function (System) {
    context.System = System;
    System.import(entries);
  });

  function loadScript(t){var e=document.getElementsByTagName("head")[0]||document.documentElement,a=document.createElement("script");return a.setAttribute("async","true"),a.setAttribute("charset","utf-8"),a.setAttribute("type","text/javascript"),a.setAttribute("src",t),new Promise(function(t){var n=!1;a.onload=a.onreadystatechange=function(){n||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(n=!0,a.onload=a.onreadystatechange=null,e&&a.parentNode&&e.removeChild(a),t())},e.appendChild(a)})}
  function loadBitimports() {return loadScript(bitimportsPath).then(function () {return context.bitimports;});}
})(this);
