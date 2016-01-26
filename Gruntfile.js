//
// http://24ways.org/2013/grunt-is-not-weird-and-hard/
//
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var pkg = grunt.file.readJSON("package.json");


  grunt.initConfig({
    pkg: pkg,
    connect: {
      test: {
        options: {
          port: 8012,
          hostname: "localhost"
        }
      },
      site: {
        options: {
          port: 8015,
          hostname: "localhost",
          keepalive: true,
          open: "http://localhost:8015/_site/index.html"
        }
      },
      dev: {
        options: {
          port: 8010,
          host: "localhost",
          keepalive: true,
          open: "http://localhost:8010/test/SpecRunner.html"
        }
      },
      doc: {
        options: {
          port: 8017,
          host: "localhost",
          keepalive: true,
          open: "http://localhost:8017/doc/index.html"
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
          urls: ["http://localhost:8012/test/SpecRunner.html"]
        }
      }
    },
    watch: {
      doc: {
        files: ["src/**/*.js"],
        tasks: ["jshint:all", "jsdoc:build"],
        options: {
          livereload: 32010
        }
      },
      build: {
        files: ["src/**/*.js", "test/**/*.js", "*.js"],
        tasks: ["build"],
        options: {
          livereload: 32011
        }
      },
      site: {
        files: ["src/**/*.js", "site/**/*"],
        tasks: ["build-site"],
        options: {
          livereload: 32012
        }
      }
    },
    jshint: {
      all: {
        options: {
          jshintrc: true,
          reporter: require("jshint-stylish")
        },
        src: ["src/**/*.js", "test/**/*.js", "*.js"]
      }
    },
    concurrent: {
      build: {
        tasks: ["connect:dev", "watch:build"],
        options: {
          logConcurrentOutput: true
        }
      },
      doc: {
        tasks: ["connect:doc", "watch:doc"],
        options: {
          logConcurrentOutput: true
        }
      },
      site: {
        tasks: ["connect:site", "watch:site"],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    jsdoc: {
      build: {
        src: ["src/**/*.js", "README.md"],
        options: {
          destination: "doc",
          verbose: true
        }
      }
    },
    browserify: {
      build: {
        src: ["browser.js"],
        dest: "dist/<%= pkg.name %>.js",
        options: {
          banner: "/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today() %>. (c) <%= grunt.template.today('yyyy') %> Miguel Castillo. Licensed under MIT */",
          browserifyOptions: {
            "detectGlobals": true,
            "ignoreMissing": true,
            "standalone": "bitimports"
          }
        }
      }
    },
    uglify: {
      build: {
        options: {
          preserveComments: "some",
          sourceMap: true
        },
        files: {
          "dist/<%= pkg.name %>.min.js": ["<%= browserify.build.dest %>"]
        }
      }
    },
    release: {
      options: {
        tagName: "v<%= version %>",
        tagMessage: "Version <%= version %>",
        commitMessage: "Release v<%= version %>",
        afterBump: ["build"]
      }
    },
    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'https://github.com/MiguelCastillo/bit-imports.git',
          branch: 'gh-pages'
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'gh-pages'
        }
      }
    },
    copy: {
      site: {
        cwd: "site/",
        expand: true,
        src: ["**"],
        dest: "_site/"
      },
      sitedeps: {
        expand: true,
        src: ["site/node_modules/babel-bits/dist/**", "site/node_modules/bit-imports/dist/**", "site/node_modules/spromise/dist/**"],
        dest: "_site/"
      },
      siteignore: {
        src: ".site-gitignore",
        dest: "_site/.gitignore"
      }
    },
    clean: {
      site: {
        src: ["_site"]
      }
    }
  });

  grunt.registerTask("build", ["jshint:all", "browserify:build", "uglify:build"]);
  grunt.registerTask("test", ["connect:test", "mocha:test"]);
  grunt.registerTask("doc", ["concurrent:doc"]);
  grunt.registerTask("serve", ["concurrent:build"]);
  grunt.registerTask("build-site", ["clean:site", "build", "copy:siteignore", "copy:site", "copy:sitedeps"]);
  grunt.registerTask("publish-site", ["build-site", "buildcontrol:pages"]);
  grunt.registerTask("serve-site", ["build-site", "concurrent:site"]);
};
