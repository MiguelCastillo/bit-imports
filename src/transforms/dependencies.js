var pullDeps = require('pulling-deps/src/index');

function dependencies(moduleMeta) {
  if (!moduleMeta.hasOwnProperty("source")) {
     return;
  }

  if (!ignoreModule(moduleMeta, this.ignore)) {
    loadDependencies(moduleMeta, pullDeps(moduleMeta.source, this.options).dependencies);
  }
}

function loadDependencies(moduleMeta, deps) {
  if (deps.length) {
    moduleMeta.deps = moduleMeta.deps.concat(deps);
  }
}

function ignoreModule(moduleMeta, ignoreList) {
  return ignoreList && ignoreList.length && ignoreList.indexOf(moduleMeta.name) !== -1;
}

module.exports = dependencies;
