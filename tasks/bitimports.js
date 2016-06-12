/*
 * grunt-bitimports
 * https://github.com/MiguelCastillo/bit-imports
 *
 * Copyright (c) 2015 Miguel Castillo
 * Licensed under the MIT license.
 */

"use strict";


var utils = require("belty");
var fs = require("fs");
var glob = require("glob");
var types = require("dis-isa");
var path = require("path");
var mkdirp = require("mkdirp");
var stream = require("stream");
var chokidar = require("chokidar");
var bitimports = require("../index");

var _cwd = process.cwd();


function confgureFiles(files, cwd) {
  return files.map(function(file) {
    var currCwd = file.cwd || cwd || "";
    var baseDir = path.join(_cwd, currCwd);

    return {
      cwd: currCwd,
      baseDir: baseDir,
      dest: dest(file.dest, _cwd),
      src: src(file.src, baseDir)
    };
  });
}


function src(files, cwd) {
  if (!types.isArray(files)) {
    files = [files];
  }

  return files.reduce(function(result, file) {
    var globResult = glob.sync(file, { cwd: cwd, realpath: true });
    return result.concat(globResult);
  }, []);
}


function dest(file, cwd) {
  if (types.isString(file)) {
    return path.isAbsolute(file) ? file : path.join(cwd, file);
  }

  return file;
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


function logError(err) {
  var errStr = err && err.stack || err;
  console.error(errStr);
  return err;
}


function createLoder(settings) {
  var loader = bitimports.config(settings);

  if (settings.log) {
    loader.logger.enable();

    switch(settings.log) {
      case "info": {
        loader.logger.level(1);
        break;
      }
      case "warn": {
        loader.logger.level(2);
        break;
      }
      case "error": {
        loader.logger.level(3);
        break;
      }
    }
  }

  return loader;
}


function fileWriter(dest, moduleMeta) {
  var outpath = path.join(dest, moduleMeta.path.replace(baseDir, ""));
  mkdirp.sync(path.dirname(outpath));
  var file = fs.createWriteStream(outpath);

  return new Promise(function(resolve) {
    file.write(moduleMeta.source, null, resolve);
  });
}


function streamWriter(dest, moduleMeta, done) {
  return new Promise(function(resolve) {
    dest.write(JSON.stringify(moduleMeta) + "\n", null, resolve);
  });
}


function buildContext(file, settings) {
  return {
    file: file,
    loader: createLoder(utils.extend({ baseUrl: file.baseDir }, settings))
  };
}


function executeContext(context, src) {
  return context.loader
    .fetch(src ? src : context.file.src)
    .then(function(modules) {
      return utils.merge({}, context, {
        cache: flattenModules(context.loader, modules)
      });
    })
    .then(function(context) {
      return writeModules(context.file, context.cache).then(function() {
        return context;
      });
    })
    .then(function(context) {
      return context;
    });
}


function writeModules(file, modules) {
  var baseDir = file.baseDir;
  var dest = file.dest;
  var writer = types.isString(dest) ? fileWriter : streamWriter;

  var deferreds = Object
    .keys(modules)
    .map(function(modulePath) {
      return writer(dest, modules[modulePath]);
    });

  return Promise.all(deferreds);
}


function watchModules(context, settings) {
  var watcher = chokidar.watch(context.file.baseDir, {
    followSymlinks: false
  });

  watcher
    .on("add", function(path) {
      // console.log("File", path, "has been added");
    })
    .on("change", function(path) {
      // console.log("File", path, "has been changed");
    })
    .on("unlink", function(path) {
      // console.log("File", path, "has been removed");
    });
}


function loadFiles(files, settings) {
  settings = settings || {};
  files = confgureFiles(files, settings.cwd);

  return new Promise(function(resolve, reject) {
    try {
      var contexts = files.map(function(file) {
        return buildContext(file, settings.options)
      });

      return Promise
        .all(contexts.map(executeContext))
        .then(function(contexts) {
          if (settings.watch) {
            contexts.forEach(function(context) {
              watchModules(context, settings.watch);
            });

            process.stdin.resume();
          }

          return contexts;
        });
    }
    catch(err) {
      reject(err);
    }
  });
}


module.loadFiles = loadFiles;
module.exports.runTask = loadFiles;
module.exports.confgureFiles = confgureFiles;
module.exports.createLoder = createLoder;
module.exports.flattenModules = flattenModules;
module.exports.writeModules = writeModules;
module.exports.executeContext = executeContext;
module.exports.logError = logError;
