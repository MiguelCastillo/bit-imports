var logger = require("./logger").create("bitimports/fetch");
var promjax = require("promjax");
var fetchProvider = null;

// Register method to load file content from storage
if (window.fetch) {
  fetchProvider = function(path) {
    return window
      .fetch(path)
      .then(function(response) {
        return response.text();
      });
  };
}
else {
  fetchProvider = promjax;
}

/**
 * @class
 *
 * FileReader that loads files from storage
 */
function Fetcher() {
  this._provider = fetchProvider;
}


/**
 * Reads file content from storage
 */
Fetcher.prototype.fetch = function(moduleMeta) {
  logger.log(moduleMeta.name, moduleMeta);

  function setSource(source) {
    return { source: source };
  }

  return this
    ._provider(moduleMeta.path)
    .then(setSource, logger.error);
};


module.exports = Fetcher;
