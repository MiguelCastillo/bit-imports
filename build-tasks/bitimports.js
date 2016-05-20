module.exports = {
  "site": {
    "cwd": "site",
    "src": [
      "main.js",
      "img/**/*",
      "style/**/*",
      "*.html",
      ".nojekyll"
    ],
    "dest": "_site",
    "options": {
      "ignore": [
        "three"
      ],
      "plugins": [
        {
          "name": "js",
          "extensions": [
            "js"
          ],
          "transform": {
            "handler": "babel-bits",
            "options": {
              "presets": [
                "es2015"
              ],
              "sourceMap": "inline"
            }
          }
        }
      ]
    }
  }
};
