/*
 * grunt-bitimports
 * https://github.com/MiguelCastillo/bit-imports
 *
 * Copyright (c) 2016 Miguel Castillo
 * Licensed under the MIT license.
 */

"use strict";


var utils = require("belty");
var types = require("dis-isa");
var File = require("src-dest");
var bitimports = require("../index");
var Context = require("./context");
var logError = require("./logError");


function createLoder(settings) {
  var loader = bitimports.config(settings);
  configureLog(loader.logger, settings.log);
  return loader;
}


function createContext(file, settings) {
  return new Context({
    file: file,
    loader: createLoder(utils.extend({ baseUrl: file.cwd }, settings))
  });
}


function loadFiles(files, settings) {
  settings = settings || {};
  files = File.list(files, settings.cwd);

  return new Promise(function(resolve, reject) {
    try {
      var contexts = files.map(function(file) {
        return createContext(file, settings.options);
      });

      Promise
        .all(contexts.map(function(context) {
          return context.execute(context.file.src)
        }))
        .then(function(contexts) {
          resolve(contexts);
        }, reject);
    }
    catch(err) {
      reject(err);
    }
  });
}

function configureLog(logger, level) {
  if (level) {
    if (level === true) {
      level = "info";
    }

    logger.enable();
    logger.level(logger.levels[level]);
  }
  else {
    logger.disable();
  }
}


module.exports = loadFiles;
