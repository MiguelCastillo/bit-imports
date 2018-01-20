module.exports = {
  build: {
    files: [{
      src: "browser.js",
      dest: "dist/<%= pkg.name %>.min.js"
    }],
    umd: "bitimports"
  },
  dev: {
    watch: true,
    files: [{
      src: "test/SpecRunner.js",
      dest: "test/bundle.js"
    }]
  },
  test: {
    files: [{
      src: "test/SpecRunner.js",
      dest: "test/bundle.js"
    }]
  }
};
