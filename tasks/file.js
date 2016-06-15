var glob = require("glob");
var types = require("dis-isa");
var utils = require("belty");
var path = require("path");

var _cwd = process.cwd();

function File(options) {
  utils.merge(this, options);
}

function createFile(file, cwd) {
  var currCwd = file.cwd || cwd || "";
  var baseDir = path.join(_cwd, currCwd);

  return new File({
    cwd: currCwd,
    baseDir: baseDir,
    dest: dest(file.dest, _cwd),
    src: src(file.src, baseDir)
  });
}

function factory(files, cwd) {
  if (!types.isArray(files)) {
    files = [files];
  }

  return files.map(function(file) {
    return createFile(file, cwd);
  });
}

function src(files, cwd) {
  if (!types.isArray(files)) {
    files = [files];
  }

  return files.reduce(function(result, file) {
    var globResult = glob.sync(file, { cwd: cwd, realpath: true });
    return result.concat(globResult);
  }, []);
}

function dest(file, cwd) {
  if (types.isString(file)) {
    return path.isAbsolute(file) ? file : path.join(cwd, file);
  }

  return file;
}

module.exports = factory;
module.exports.File = File;
module.exports.src = src;
module.exports.dest = dest;
