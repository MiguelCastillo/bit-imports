var pullDeps = require("pulling-deps");

function Dependency() {}

Dependency.prototype.run = function(moduleMeta, handler) {
  return {
    deps: pullDeps(moduleMeta.source, handler.options).dependencies
  };
};

module.exports = Dependency;
