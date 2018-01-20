module.exports = {
  build: {
    files: [{
      src: "browser.js",
      dest: "dist/<%= pkg.name %>.min.js"
    }],
    umd: "bitimports"
  },
  dev: {
    files: [{
      src: "test/SpecRunner.js",
      dest: "test/bundle.js"
    }],
    minify: false,
    watch: true
  },
  test: {
    files: [{
      src: "test/SpecRunner.js",
      dest: "test/bundle.js"
    }],
    minify: false
  }
};
