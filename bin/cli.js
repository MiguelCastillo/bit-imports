#!/usr/bin/env node

var config = require("./config")(process.argv.slice(2));
var bitimports = require("../index").config(config);

bitimports
  .import(config.files)
  .then(flattenModules(bitimports))
  .then(writeOut);

function flattenModules(importer) {
  return function(modules) {
    var i = 0;
    var stack = modules.slice(0);
    var id, mod, cache = {};

    while (stack.length !== i) {
      if (!stack[i].id) {
        console.warn("not found:", stack[i]);
      }

      id = stack[i++].id;

      if (!id || cache.hasOwnProperty(id)) {
        continue;
      }

      mod = importer.getModule(id);
      stack = stack.concat(mod.deps);
      cache[mod.id] = mod;
    }

    return cache;
  };
}

function writeOut(cache) {
  process.stdout.write(cache);
}
