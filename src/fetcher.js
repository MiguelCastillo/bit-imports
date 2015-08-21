var fileReader  = require('./fileReader');
var log2console = require('log2console');

/**
 * @class
 *
 * FileReader that loads files from storage
 */
function Fetcher(loader) {
  this.loader = loader;
  this.logger = loader.Logger.factory("Bitimporter/Fetch");
}


/**
 * Reads file content from storage
 */
Fetcher.prototype.fetch = function(moduleMeta) {
  this.logger.log(moduleMeta.name, moduleMeta, location);

  function fileRead(source) {
    return {source: source};
  }

  return fileReader(moduleMeta.path).then(fileRead, log2console);
};


module.exports = Fetcher;
