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
var bitimports = require("../index");

var _cwd = process.cwd();


function confgureFiles(files, cwd) {
  return files.map(function(file) {
    var currCwd = file.cwd || cwd;
    var baseDir = path.join(_cwd, currCwd);
    var destFile = path.join(_cwd, file.dest);

    var srcFiles = file.src.reduce(function(result, item) {
      return result.concat(glob.sync(item, { cwd: baseDir, realpath: true }));
    }, []);

    return {
      cwd: currCwd,
      baseDir: baseDir,
      dest: destFile,
      src: srcFiles
    };
  });
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


function writeFiles(files, cwd) {
  return function(moduleGroups) {
    for (var i = 0; i < moduleGroups.length; i++) {
      var baseDir = files[i].baseDir;
      var currOutdir = files[i].dest;
      var currModules = moduleGroups[i];

      Object
        .keys(currModules)
        .forEach(function(modulePath) {
          var outpath = path.join(currOutdir, modulePath.replace(baseDir, ""));
          mkdirp.sync(path.dirname(outpath));
          fs.writeFileSync(outpath, currModules[modulePath].source);
        });
    }
  };
}


function runTask(files, settings) {
  files = confgureFiles(files, settings.cwd || "");

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


module.exports = function(grunt) {
  grunt.task.registerMultiTask("bitimports", "bit-imports grunt plugin", function() {
    var done = this.async();

    runTask(this.files, this.data)
      .then(function() {
        done();
      }, function(err) {
        logError(err);
        done(err);
      });
  });
};
