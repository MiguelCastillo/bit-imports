var MetaFactory = require('./metaFactory'),
    fileReader  = require('./fileReader');

/**
 * @class
 *
 * FileReader that loads files from storage
 */
function Fetch(loader, settings) {
  settings         = loader.Utils.merge({}, settings);
  this.loader      = loader;
  this.metaFactory = new MetaFactory(settings);
  this.logger      = loader.Logger.factory("Bitimporter/Fetch");
}


/**
 * Reads file content from storage
 */
Fetch.prototype.fetch = function(name, parentMeta) {
  var loader     = this.loader,
      moduleMeta = this.metaFactory.create(name, getWorkingDirectory(parentMeta)),
      url        = moduleMeta.url.href;

  this.logger.log(moduleMeta.name, moduleMeta, url);

  return fileReader(url).then(function(source) {
    moduleMeta.source = source;
    return moduleMeta;
  }, loader.Utils.forwardError);
};


/*
 * Gets the url form the module data if it exists.
 */
function getWorkingDirectory(moduleMeta) {
  return (moduleMeta && moduleMeta.url) ? moduleMeta.url.href : '';
}

module.exports = Fetch;
