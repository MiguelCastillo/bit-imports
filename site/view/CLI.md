## CLI

bit-imports provides you with a CLI to help you prebuild your assets, which is a good option for production deployments.

The CLI uses subarg syntax to configure input files, plugins, output directory, and all the other settings available via the JavaScript API.


### Configure

| Param | Default | Description |
|-------|---------|-------------|
| files    |       | Input files to be processed.
| out      | process.stdout | Can be a string for a directory to write proccessed assets to or a stream. If you don't specify an output directory then each module will be written to process.stdout as JSON lines
| watch    | false | Enable file watching for automatically reprocessing *only* changed files. The value can be a boolean for enabling the feature or a configuration object for fine tuning the file watcher. Internally the file watcher is [chokidar](https://github.com/paulmillr/chokidar), and all configurations provided will be passed right along to it. By default, chokidar is configured to *not* follow symlinks. Also, by default dot files, dot directories, and node_modules are all excluded from the watcher
| ignores  |       | Modules to exlcude from the transform and dependency pipelines
| excludes |       | Modules to exclude from output if not found
| plugins  |       | List of plugins for processing your assets

> All options besides `files`, `out`, and `watch` are passed right along to bit-imports. So please checkout the JavaScript API to see more details about each available option.

#### Basic example

```
$ bitimports site/bitimportsfile.js
```

#### Example with ignore and multiple files

In this example we are loading two JavaScript files and all html files in the `site` directory. The configuration also excludes the module with name `three` and the module with fileName `bitimportsfiles.js` from the processing pipelines. The processed assets are written to the `build` directory.

```
$ bitimports --files [ site/bitimportsfile.js site/main.js site/*.html ] --ignores [ --name three --fileName bitimportsfile.js ] --out build
```

#### Example with a plugin defition

Building on the previous example, we are now going to configure a plugin for processing files with `js` extension using babeljs. We use `babel-bits` to facilitate bit-imports and babeljs interop.

```
$ bitimports --files [ site/bitimportsfile.js site/main.js site/*.html ] --ignores [ --name three --fileName bitimportsfile.js ] --plugins [ --name js --extensions js --transform babel-bits ] --out build
```

#### Example processing the output with [json](http://trentm.com/json/) command line tool

When an output directory is not specified each module is written to process.stdout as JSON. This way each module can be piped to other utilities such as this [json](http://trentm.com/json/) tool to process the output. In the example below the result is piped to the [json](http://trentm.com/json/) tool and extract all the file names from the modules.

```
$ bitimports --files [ site/bitimportsfile.js site/main.js site/*.html ] --ignore [ --name three --fileName bitimportsfile.js ] --plugins [ --name js --extensions js --transform babel-bits ] | json -ga fileName
```
