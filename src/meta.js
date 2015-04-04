var MetaFactory = require('./metaFactory'),
    fileReader  = require('./fileReader');

/**
 * @class
 *
 * FileReader that loads files from storage
 */
function Meta(loader, importer) {
  var settings  = importer.Utils.merge({}, importer.settings);
  this.importer = importer;
  this.loader   = loader;
  this.factory  = new MetaFactory(settings);
  this.logger   = importer.Logger.factory("Bitimporter/Fetch");
}


/**
 * Reads file content from storage
 */
Meta.prototype.fetch = function(name, parentMeta) {
  var importer   = this.importer,
      moduleMeta = this.factory.create(name, getWorkingDirectory(parentMeta)),
      url        = moduleMeta.url.href;

  this.logger.log(moduleMeta.name, moduleMeta, url);

  return fileReader(url).then(function(source) {
    moduleMeta.source = source;
    return moduleMeta;
  }, importer.Utils.forwardError);
};


/*
 * Gets the url form the module data if it exists.
 */
function getWorkingDirectory(moduleMeta) {
  return (moduleMeta && moduleMeta.url) ? moduleMeta.url.href : '';
}

module.exports = Meta;
