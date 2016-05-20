module.exports = {
  "build": {
    "src": [
      "src/bit-imports.js",
      "node_modules/bit-loader/src/bit-loader.js",
      "node_modules/bit-loader/src/module.js",
      "README.md"
    ],
    "options": {
      "destination": "_docs",
      "verbose": true,
      "private": true,
      "plugins": [
        "plugins/markdown"
      ],
      "template": "./docs/template",
      "configure": "./docs/site.conf.json"
    }
  }
};