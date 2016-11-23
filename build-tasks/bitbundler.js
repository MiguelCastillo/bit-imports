var Bitbundler = require("bit-bundler");
var jsPlugin = require("bit-loader-js");
var eslintPlugin = require("bit-eslint");
var builtins = require("bit-loader-builtins");
var minifyjs = require("bit-bundler-minifyjs");
var extractsm = require("bit-bundler-extractsm");

module.exports = {
  build: {
    Bitbundler: Bitbundler,
    files: [{
      src: "browser.js",
      dest: "dist/<%= pkg.name %>.min.js"
    }],
    loader: {
      plugins: [
        eslintPlugin(),
        jsPlugin(),
        builtins()
      ]
    },
    bundler: {
      umd: "bitimports",
      plugins: [
        minifyjs({ banner: buildBannerString() }),
        extractsm()
      ]
    }
  }
};


function buildBannerString() {
  var grunt = require("grunt");
  var package = require("../package");
  return grunt.template.process("/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today() %>. (c) <%= grunt.template.today('yyyy') %> Miguel Castillo. Licensed under MIT */", { data: { pkg: package }});
}
