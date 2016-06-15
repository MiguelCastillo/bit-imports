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
var bitimports = require("../index");
var Context = require("./context");
var logError = require("./logError");
var fileFactory = require("./file");


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


function createContext(file, settings) {
  return new Context({
    file: file,
    loader: createLoder(utils.extend({ baseUrl: file.baseDir }, settings))
  });
}


function loadFiles(files, settings) {
  settings = settings || {};
  files = fileFactory(files, settings.cwd);

  return new Promise(function(resolve, reject) {
    try {
      var contexts = files.map(function(file) {
        return createContext(file, settings.options);
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


module.exports = loadFiles;
