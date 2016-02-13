(function(context) {
  loadScript("node_modules/bit-imports/dist/bit-imports.min.js").then(function() {
    /** paths for mapping node dependencies */
    var paths = {
      "babel-bits": "node_modules/babel-bits/dist/index.min",
      "loadstyle-bits": "node_modules/loadstyle-bits/dist/index.min",
      "three": "node_modules/three/three.min",
      "CanvasRenderer": "node_modules/three/examples/js/renderers/CanvasRenderer",
      "Projector": "node_modules/three/examples/js/renderers/Projector"
    };

    /* jshint unused: false, undef: false */
    var System = context.bitimports
      .config({
        "paths": paths,
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
    context.System = System;
  });


function loadScript(t){var e=document.getElementsByTagName("head")[0]||document.documentElement,a=document.createElement("script");return a.setAttribute("async","true"),a.setAttribute("charset","utf-8"),a.setAttribute("type","text/javascript"),a.setAttribute("src",t),new Promise(function(t){var n=!1;a.onload=a.onreadystatechange=function(){n||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(n=!0,a.onload=a.onreadystatechange=null,e&&a.parentNode&&e.removeChild(a),t())},e.appendChild(a)})}

})(this);
