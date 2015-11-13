var fileReader = require("./fileReader");
var logger     = require("./logger").create("bitimports/fetch");

/**
 * @class
 *
 * FileReader that loads files from storage
 */
function Fetcher() {
}


/**
 * Reads file content from storage
 */
Fetcher.prototype.fetch = function(moduleMeta) {
  logger.log(moduleMeta.name, moduleMeta, location);

  function fileRead(source) {
    return {source: source};
  }

  return fileReader(moduleMeta.path).then(fileRead, logger.error);
};


module.exports = Fetcher;
