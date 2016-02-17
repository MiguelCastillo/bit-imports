var fs = require("fs");
var pstream = require("p-stream");
var isBinaryFile = require("isbinaryfile");


/**
 * Function that reads file from disk
 *
 * @param {object} moduleMeta - Module meta with information about the module being loaded
 */
function fileReader(moduleMeta) {
  function setSource(text) {
    return {
      source: text
    };
  }

  return pstream(readFile(moduleMeta.path)).then(setSource);
}


/**
 * Read file from storage. You can very easily replace this with a routine
 * that loads data using XHR.
 *
 * @private
 *
 * @param {string} filePath - Full path for the file to be read
 *
 * @returns {Promise}
 */
function readFile(filePath) {
  var stream = fs.createReadStream(filePath);
  return isBinaryFile.sync(filePath) ? stream : stream.setEncoding("utf8");
}


module.exports = fileReader;
