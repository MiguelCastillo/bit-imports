var fs = require("fs");
var utils = require("belty");
var types = require("dis-isa");
var mkdirp = require("mkdirp");
var path = require("path");

function Context(options) {
  this.loader = options.loader;
  this.cache = options.cache || {};
  this.file = options.file;
  this.lastUpdatedModules = null;
}

Context.prototype.execute = function(src) {
  var context = this;

  return context.loader.fetch(src)
    .then(function(modules) {
      var updates = flattenModules(context.loader, modules);
      return context.lastUpdatedModules ? onlyChanged(src, updates) : updates;
    })
    .then(function(updates) {
      context.lastUpdatedModules = updates;
      context.cache = utils.merge(context.cache, updates);
      return context;
    })
    .then(function(context) {
      return writeModules(context.file, context.lastUpdatedModules)
        .then(function() {
          return context;
        });
    });
};

function fileWriter(file, moduleMeta) {
  var dest = file.dest;
  var baseDir = file.baseDir;
  var outpath = path.join(dest, moduleMeta.path.replace(baseDir, ""));
  mkdirp.sync(path.dirname(outpath));
  var file = fs.createWriteStream(outpath);

  return new Promise(function(resolve) {
    file.write(moduleMeta.source, null, resolve);
  });
}

function streamWriter(file, moduleMeta) {
  return new Promise(function(resolve) {
    file.dest.write(JSON.stringify(moduleMeta) + "\n", null, resolve);
  });
}

function writeModules(file, modules) {
  var writer = types.isString(file.dest) ? fileWriter : streamWriter;

  var deferreds = Object
    .keys(modules)
    .map(function(modulePath) {
      return writer(file, modules[modulePath]);
    });

  return Promise.all(deferreds);
}

function flattenModules(loader, modules) {
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

    mod = loader.getModule(id);
    stack = stack.concat(mod.deps);
    cache[mod.id] = mod;
  }

  return cache;
}

function onlyChanged(src, cache) {
  return src.reduce(function(changedModules, item) {
    changedModules[item] = cache[item];
    return changedModules;
  }, {})
}

module.exports = Context;
