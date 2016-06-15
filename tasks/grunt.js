var bitimports = require("./index");
var watch = require("./watch");
var logError = require("./logError");
var chalk = require("chalk");
var ora = require("ora");
var utils = require("belty");

function gruntTask(grunt) {
  grunt.task.registerMultiTask("bitimports", "bit-imports grunt plugin", function() {
    var done = this.async();
    var files = this.files;
    var settings = utils.merge({}, this.data);
    settings.options = settings.options || utils.omit(settings, ["cwd", "files", "watch"]);

    var spinner = ora({
      text: "Loading modules",
      spinner: "bouncingBall"
    }).start();

    function processContext(context, settings) {
      var modules = Object
        .keys(context.cache)
        .map(function(id) {
          return context.cache[id];
        });

      var paths = modules.forEach(function(m) {
        grunt.verbose.writeln("Module", chalk.cyan(m.path));

        var deps = m.deps.forEach(function(dep) {
          grunt.verbose.writeln(" + Dependency", chalk.cyan(dep.path));
        });

        if (m.deps.length) {
          grunt.verbose.writeln();
        }
      });

      grunt.log.writeln("Processed", chalk.cyan(modules.length), "files");

      if (settings.watch) {
        watch(context, settings.watch);
      }
    }

    bitimports
      .runTask(files, settings)
      .then(function(contexts) {
        spinner.stop();

        contexts.forEach(function(context) {
          processContext(context, settings);
        });

        done();
      }, function(err) {
        logError(err);
        done(err);
      });
  });
};

module.exports = gruntTask;
