var Fetcher  = require("./src/fetcher");
var Resolver = require("./src/resolver");
var factory  = require("./src/factory");

factory.register("fetcher", Fetcher);
factory.register("resolver", Resolver);


module.exports = require("./src/bit-imports").create({ doNotIgnoreNodeModules: false });
