var markdown = require("marked");

module.exports = {
  "site": {
    "files": [{
      "cwd": "site",
      "src": [ "main.js", "img/**/*", "style/**/*", "*.html", ".nojekyll" ],
      "dest": "_site"
    }],
    "options": {
      "ignore": [ "three" ],
      "plugins": [{
        "name": "js",
        "extensions": [ "js" ],
        "transform": {
          "handler": "babel-bits",
          "options": {
            "presets": [ "es2015" ],
            "sourceMap": "inline"
          }
        }
      }, {
        "name": "md",
        "extensions": [ "md" ],
        "transform": function(meta) {
          return {
            source: "module.exports = (" + JSON.stringify(markdown(meta.source)) + ");"
          };
        }
      }]
    }
  }
};
