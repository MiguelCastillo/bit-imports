//
// http://24ways.org/2013/grunt-is-not-weird-and-hard/
//
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
      test: {
        options: {
          port: 8612,
          hostname: 'localhost'
        }
      },
      keepalive: {
        options: {
          port: 8619,
          host: "localhost",
          keepalive: true,
          open: "http://localhost:8619/test/SpecRunner.html"
        }
      }
    },
    mocha: {
      test: {
        options: {
          log: true,
          logErrors: true,
          reporter: "Spec",
          run: false,
          timeout: 10000,
          urls: ["http://localhost:8612/test/SpecRunner.html"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-mocha");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.registerTask("server", ["connect:keepalive"]);
  grunt.registerTask("test", ["connect:test", "mocha:test"]);
};
