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
  else if (file instanceof stream.Writable) {
    return file;
  }

  return file;
}


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


function logError(err) {
  var errStr = err && err.stack || err;
  console.error(errStr);
  return err;
}


function loadModules(settings) {
  return function(file) {
    var importer = bitimports.config(utils.extend({ baseUrl: file.baseDir }, settings));

    if (settings.log) {
      bitimports.logger.enable();

      switch(settings.log) {
        case "info": {
          bitimports.logger.level(1);
          break;
        }
        case "warn": {
          bitimports.logger.level(2);
          break;
        }
        case "error": {
          bitimports.logger.level(3);
          break;
        }
      }
    }

    return importer
      .fetch(file.src)
      .then(flattenModules(importer));
  };
}


function writeFiles(files) {
  return function writeFileDelegate(moduleGroups) {
    var allDeferreds = moduleGroups.reduce(function(all, modules, i) {
      var baseDir = files[i].baseDir;
      var dest = files[i].dest;

      var deferreds = Object
        .keys(modules)
        .map(function(modulePath) {
          return new Promise(function(resolve /*, reject*/) {
            var file;

            if (types.isString(dest)) {
              var outpath = path.join(dest, modulePath.replace(baseDir, ""));
              mkdirp.sync(path.dirname(outpath));
              file = fs.createWriteStream(outpath);
            }
            else if (dest instanceof stream.Writable) {
              file = dest;
            }
            else {
              file = process.stdout;
            }

            file.write(modules[modulePath].source, null, resolve);
          });
        });

      return all.concat(deferreds);
    }, []);

    return Promise.all(allDeferreds);
  };
}


function runTask(files, settings) {
  settings = settings || {};
  files = confgureFiles(files, settings.cwd);

  return new Promise(function(resolve, reject) {
    try {
      return Promise
        .all(
          files.map(loadModules(settings.options))
        )
        .then(writeFiles(files))
        .then(resolve, reject);
    }
    catch(err) {
      reject(err);
    }
  });
}


module.exports.runTask = runTask;
module.exports.confgureFiles = confgureFiles;
module.exports.loadModules = loadModules;
module.exports.flattenModules = flattenModules;
module.exports.logError = logError;