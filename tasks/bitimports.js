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


function finalizeLoading(contexts, settings) {
  if (settings.watch) {
    contexts.forEach(function(context) {
      watchModules(context, settings.watch);
    });

    process.stdin.resume();

    //
    // TODO: Add simple REPL
    //
    // process.stdin
    //   .on('readable', () => {
    //     var chunk = process.stdin.read();
    //     if (chunk !== null) {
    //       process.stdout.write(chunk);
    //     }
    //   })
    //   .on('end', () => {
    //     process.stdout.write('end');
    //   });
  }

  return contexts;
}


function buildContext(file, settings) {
  return {
    file: file,
    loader: createLoder(utils.extend({ baseUrl: file.baseDir }, settings))
  };
}


function executeContext(context, src) {
  return context.loader.fetch(src)
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
  var writer = types.isString(file.dest) ? fileWriter : streamWriter;

  var deferreds = Object
    .keys(modules)
    .map(function(modulePath) {
      return writer(file, modules[modulePath]);
    });

  return Promise.all(deferreds);
}


function watchModules(context, options) {
  if (options === true) {
    options = {};
  }

  var settings = utils.merge({ followSymlinks: false }, options);

  if (!settings.hasOwnProperty("ignored")) {
    settings.ignored = [/[\/\\]\./, /node_modules\//];
  }

  var filesToWatch = Object.keys(context.cache);
  var watcher = chokidar.watch(filesToWatch, settings);
  console.log("Watching...");

  function onAdd(path) {
    if (context.cache.hasOwnProperty(path)) {
      console.log("[watched]", path);
    }
  }

  function onChange(path) {
    if (context.cache.hasOwnProperty(path)) {
      var module = context.cache[path];
      context.loader.deleteModule(module);

      executeContext(context, [path]).then(function(ctx) {
        context = ctx;
        console.log("[changed]", path);
      }, logError);
    }
  }

  function onDelete(path) {
    if (context.cache.hasOwnProperty(path)) {
      console.warn("[removed]", path);
    }
  }

  watcher
    .on("add", onAdd)
    .on("change", onChange)
    .on("unlink", onDelete);
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
          return executeContext(context, context.file.src)
        }))
        .then(function(contexts) {
          return finalizeLoading(contexts, settings)
        }, logError);
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
