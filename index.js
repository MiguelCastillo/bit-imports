var resolvePath = require("bit-bundler-utils/resolvePath");
var fileReader = require("bit-bundler-utils/fileReader");

module.exports = require("./src/bit-imports")
  .create({
    fetch: fileReader,
    resolve: resolvePath,
    doNotIgnoreNodeModules: true
  });
