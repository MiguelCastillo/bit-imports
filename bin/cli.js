#!/usr/bin/env node

var settings = require("./config")(process.argv.slice(2));
var utils = require("belty");
var bitimports = require("../tasks/index");
var watch = require("../tasks/watch");
var logError = require("../tasks/logError");

settings.options = utils.omit(settings, ["cwd", "files", "out", "watch"]);

bitimports({
    cwd: settings.cwd,
    dest: settings.out || process.stdout,
    src: settings.files,
  }, settings)
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