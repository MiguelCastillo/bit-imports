var bitimports = require("./bitimports");

module.exports = function(grunt) {
  grunt.task.registerMultiTask("bitimports", "bit-imports grunt plugin", function() {
    var done = this.async();

    bitimports.runTask(this.files, this.data)
      .then(function() {
        done();
      }, function(err) {
        bitimports.logError(err);
        done(err);
      });
  });
};
