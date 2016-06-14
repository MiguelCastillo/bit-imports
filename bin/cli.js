#!/usr/bin/env node

var config = require("./config")(process.argv.slice(2));
var utils = require("belty");
var bitimports = require("../tasks/index");
var watch = require("../tasks/watch");
var logError = require("../tasks/logError");

var settings = {
  watch: config.watch,
  options: utils.omit(config, ["cwd", "out", "files", "watch"])
};

bitimports
  .runTask([{
    cwd: config.cwd,
    dest: config.out || process.stdout,
    src: config.files,
  }], settings)
  .then(function(contexts) {
    contexts.forEach(function(context) {
      processContext(context, settings)
    });

    if (settings.watch) {
      process.stdin.resume();
    }
  }, logError);


function processContext(context, settings) {
  if (settings.watch) {
    console.log("watch");
    watch(context, settings.watch);
  }

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