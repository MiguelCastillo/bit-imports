#!/usr/bin/env node

var path = require("path");
var config = require("./config")(process.argv.slice(2));
var bitimports = require("../index").config(config);


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


function sourceFiles(files) {
  return files.map(function(file) {
    return path.resolve(file);
  });
}


function writeOut(cache) {
  Object.keys(cache).forEach(function(item) {
    console.log(JSON.stringify(cache[item]));
  });
}


function reportError() {
  console.log(arguments);
}


bitimports
  .fetch(sourceFiles(config.files))
  .then(flattenModules(bitimports), reportError)
  .then(writeOut, reportError);
