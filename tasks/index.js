/*
 * grunt-bitimports
 * https://github.com/MiguelCastillo/bit-imports
 *
 * Copyright (c) 2016 Miguel Castillo
 * Licensed under the MIT license.
 */

"use strict";


var utils = require("belty");
var glob = require("glob");
var types = require("dis-isa");
var path = require("path");
var bitimports = require("../index");
var Context = require("./context");
var logError = require("./logError");

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


function buildContext(file, settings) {
  return new Context({
    file: file,
    loader: createLoder(utils.extend({ baseUrl: file.baseDir }, settings))
  });
}


function loadFiles(files, settings) {
  settings = settings || {};
  files = confgureFiles(files, settings.cwd);

  return new Promise(function(resolve, reject) {
    try {
      var contexts = files.map(function(file) {
        return buildContext(file, settings.options);
      });

      return Promise
        .all(contexts.map(function(context) {
          return context.execute(context.file.src)
        }))
        .then(function(contexts) {
          resolve(contexts);
        });
    }
    catch(err) {
      reject(err);
    }
  });
}


module.loadFiles = loadFiles;
module.exports.runTask = loadFiles;
