module.exports = function(grunt) {
  require("bit-imports/tasks/grunt")(grunt);
  require("load-grunt-tasks")(grunt);

  var taskConfig = require("config-grunt-tasks")(grunt, "./build-tasks");
  taskConfig.pkg = require("./package.json");

  grunt.initConfig(taskConfig);

  grunt.registerTask("build", ["bitbundler:build"]);
  grunt.registerTask("test", ["connect:test", "mocha:test"]);
  grunt.registerTask("serve", ["concurrent:dev"]);
  grunt.registerTask("build-docs", ["jsdoc:build"]);
  grunt.registerTask("serve-docs", ["build-docs", "concurrent:docs"]);
  grunt.registerTask("build-site", ["clean:site", "build", "jsdoc", "bitimports:site", "copy:siteignore", "copy:site", "copy:sitedocs"]);
  grunt.registerTask("publish-site", ["build-site", "buildcontrol:pages"]);
  grunt.registerTask("serve-site", ["build-site", "concurrent:site"]);
};
