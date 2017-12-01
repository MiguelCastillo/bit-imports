module.exports = {
  build: {
    files: [{
      src: "browser.js",
      dest: "dist/<%= pkg.name %>.min.js"
    }],
    loader: [
      "bit-loader-eslint",
      "bit-loader-builtins"
    ],
    bundler: {
      umd: "bitimports",
      plugins: [
        ["bit-bundler-minifyjs", {
          output: {
            beautify: false,
            preamble: buildBannerString()
          }
        }],
        "bit-bundler-extractsm"
      ]
    }
  },
  dev: {
    watch: true,
    files: [{
      src: "test/SpecRunner.js",
      dest: "test/bundle.js"
    }],
    loader: [
      "bit-loader-eslint",
      "bit-loader-builtins"
    ]
  },
  test: {
    files: [{
      src: "test/SpecRunner.js",
      dest: "test/bundle.js"
    }],
    loader: [
      "bit-loader-eslint",
      "bit-loader-builtins"
    ]
  }
};


function buildBannerString() {
  var grunt = require("grunt");
  var package = require("../package");
  return grunt.template.process("/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today() %>. (c) <%= grunt.template.today('yyyy') %> Miguel Castillo. Licensed under MIT */", { data: { pkg: package }});
}
