var resolvePath = require("bit-bundler-utils/resolvePath");
var readFile    = require("bit-bundler-utils/readFile");
var factory     = require("./src/factory");

function Resolver() {}
Resolver.prototype.resolve = function(moduleMeta) {
  return resolvePath(moduleMeta);
};

function Fetcher() {}
Fetcher.prototype.fetch = function(moduleMeta) {
  return readFile(moduleMeta);
};

factory.register("fetcher", Fetcher);
factory.register("resolver", Resolver);


module.exports = require("./src/bit-imports").create({ doNotIgnoreNodeModules: true });
