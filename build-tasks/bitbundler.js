var jsPlugin = require("bit-loader-js");
var builtins = require("bit-loader-builtins");

module.exports = {
  build: {
    files: [{
      src: "browser.js",
      dest: "dist/<%= pkg.name %>.js"
    }],
    loader: {
      plugins: [
        jsPlugin(),
        builtins()
      ]
    },
    bundler: {
      umd: "bitimports"
    }
  }
};
