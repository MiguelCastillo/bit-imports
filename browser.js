var Fetcher  = require("./src/fetcher");
var Resolver = require("./src/resolver");
var Dependency = require("./src/dependency");
var factory  = require("./src/factory");

factory.register("fetcher", Fetcher);
factory.register("resolver", Resolver);
factory.register("dependency", Dependency);

module.exports = require("./src/bit-imports").create({ doNotIgnoreNodeModules: false });
