#!/usr/bin/env node

var config = require("./config")(process.argv.slice(2));
var utils = require("belty");
var bitimports = require("../tasks/bitimports");

bitimports
  .runTask([{
    cwd: config.cwd,
    dest: config.out || process.stdout,
    src: config.files
  }], {
    options: utils.omit(config, ["cwd", "out", "files"])
  })
  .then(function() {}, function(err) {
    bitimports.logError(err);
  });
