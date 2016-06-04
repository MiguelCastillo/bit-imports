var bitimports = require("./bitimports");
var chalk = require("chalk");
var ora = require("ora");

module.exports = function(grunt) {
  grunt.task.registerMultiTask("bitimports", "bit-imports grunt plugin", function() {
    var done = this.async();
    var spinner = ora({
      text: "Loading modules",
      spinner: "bouncingBall"
    }).start();

    bitimports.runTask(this.files, this.data)
      .then(function(modules) {
        spinner.stop();

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

        done();
      }, function(err) {
        bitimports.logError(err);
        done(err);
      });
  });
};
