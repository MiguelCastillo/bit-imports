## Grunt Task

bit-imports provisions you with a grunt plugin that allows you to pre-process your web application and save all the processed assets to a folder. This way you can transpile your SASS, coffeescript, ES6 code with Babel, or whatever else have you and deploy the transpiled code. Your application's modules can then be loaded dynamically without transpiling your assets each time they are loaded.


### Configure

| Option | Default | Descrition |
|--------|---------|------------|
| files  |         | Configuration, or array of configurations with src files to be loaded and a dest to write processed assets to.
| files.src  |     | Array of source file to load. Supports [glob](https://github.com/isaacs/node-glob) syntax
| files.cwd  | process.cwd() | Current working directory to read source files relative to
| files.dest | process.cwd() | Directory to copy processed assets to.  If a value isn't provided, then each module is written to process.stdout as JSON lines
| watch    | false | Enable file watching for automatically reprocessing *only* changed files. The value can be a boolean for enabling the feature or a configuration object for fine tuning the file watcher. Internally the file watcher is [chokidar](https://github.com/paulmillr/chokidar), and all configurations provided will be passed right along to it. By default, chokidar is configured to *not* follow symlinks. Also, by default dot files, dot directories, and node_modules are all excluded from the watcher
| ignores  |       | Modules to exlcude from the transform and dependency pipelines
| excludes |       | Modules to exclude from output if not found
| plugins  |       | List of plugins for processing your assets

> All options besides `files` and `watch` are passed right along to bit-imports. So please checkout the JavaScript API to see more details about each available option.


#### Setup with babel-bits

The example below shows a Gruntfile that reads in JavaScript and transpiles it with Babel. It also reads other files that don't have transforms configured, so they are just copied over to the destination directory along with the transpiled JavaScript.

First we gotta install all the deps.

```
$ npm install bit-imports babel-bits --save-dev
```

> babel-bits simplifies bit-imports and babel configuration and interop. But please feel free to setup your own `babel-core` to your liking.

Then we configure the bit-imports Grunt task.

``` javascript
module.exports = function(grunt) {
  var pkg = require("./package.json");

  // Load up bit-imports grunt task and pass it the current grunt instance.
  require("bit-imports/tasks/grunt")(grunt);

  grunt.initConfig({
    pkg: pkg,
    bitimports: {
      site: {
        files: [{
          cwd: "site",
          src: ["main.js", "img/**/*", "style/**/*", "*.html", ".nojekyll"],
          dest: "_site"
        }],
        watch: {
          followSymlinks: true
        },
        plugins: [{
          name: "js",
          extensions: ["js"],
          transform: {
            handler: "babel-bits",
            options: {
              presets: ["es2015"],
              sourceMap: "inline"
            }
          }
        }]
      }
    }
  });

  grunt.registerTask("build", ["bitimports:site"]);
};
```
