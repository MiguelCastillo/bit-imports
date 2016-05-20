/*
 * grunt-bitimports
 * https://github.com/MiguelCastillo/bit-imports
 *
 * Copyright (c) 2015 Miguel Castillo
 * Licensed under the MIT license.
 */

"use strict";


var types = require("dis-isa");
var path = require("path");
var mkdirp = require("mkdirp");
var bitimports = require("../index");


module.exports = function(grunt) {
  function sources(files) {
    return files.map(function(file) {
      return file.src;
    });
  }


  function dest(files) {
    return files.map(function(file) {
      return file.dest;
    });
  }


  function resolveFiles(cwd) {
    return function(files) {
      return files.map(function(file) {
        return path.resolve(cwd, file);
      });
    };
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
    grunt.log.error(errStr);
    return err;
  }


  function loadModules(settings) {
    var importer = bitimports.config(settings);

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

    return function(files) {
      return importer
        .fetch(files)
        .then(flattenModules(importer));
    };
  }


  function writeFiles(outdir, baseDir) {
    outdir = path.join(process.cwd(), outdir[0]);

    return function(modules) {
      modules = modules[0];

      Object
        .keys(modules)
        .forEach(function(modulePath) {
          var outpath = path.join(outdir, modulePath.replace(baseDir, ""));
          mkdirp.sync(path.dirname(outpath));
          grunt.file.write(outpath, modules[modulePath].source);
        });
    };
  }


  function runTask() {
    var settings = this.data || {};
    var done = this.async();
    var cwd = settings.cwd || "";
    var baseDir = path.join(process.cwd(), cwd);

    try {
      Promise
        .all(
          sources(this.files)
            .map(resolveFiles(cwd))
            .map(loadModules(settings.options))
        )
        .then(writeFiles(dest(this.files), baseDir))
        .then(function() { done(); }, function(err) { logError(err); done(err); });
    }
    catch(err) {
      logError(err);
    }
  }


  grunt.task.registerMultiTask("bitimports", "bit-imports grunt plugin", runTask);
};
