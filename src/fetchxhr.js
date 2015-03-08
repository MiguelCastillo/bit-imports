var Ajax           = require('promjax'),
    Resolver       = require('amd-resolver'),
    compileFactory = require('./compile');

/**
 * @class
 *
 * XHR fetch provider to load source files from storage
 */
function Fetcher(loader, importer) {
  var settings     = importer.Utils.merge({}, importer.settings);
  settings.baseUrl = getBaseUrl(settings.baseUrl);

  this.importer = importer;
  this.loader   = loader;
  this.resolver = new Resolver(settings);
  this.logger   = importer.Logger.factory("Bitimporter/Fetch");
}


/**
 * Reads file via XHR from storage
 */
Fetcher.prototype.fetch = function(name, parentMeta) {
  var fetcher    = this,
      importer   = this.importer,
      loader     = this.loader,
      moduleMeta = this.resolver.resolve(name, getWorkingDirectory(parentMeta)),
      url        = moduleMeta.url.href;

  this.logger.log(moduleMeta.name, moduleMeta, url);

  moduleMeta.loader   = loader;
  moduleMeta.importer = importer;

  return (new Ajax(url)).then(function(source) {
    moduleMeta.source  = source;
    moduleMeta.compile = compileFactory(fetcher, moduleMeta, parentMeta);
    return moduleMeta;
  }, importer.Utils.forwardError);
};


/*
 * This will adjust the baseUrl in the settings so that requests get the absolute
 * url so that browsers can better handle `# sourceURL`.  In chrome for example,
 * the files are added to the developer tools' source tree, which let's you put
 * break points directly from the developer tools.
 */
function getBaseUrl(url) {
  return Resolver.URL.parser.resolve(window.location.href, url || "");
}

/*
 * Gets the url form the module data if it exists.
 */
function getWorkingDirectory(moduleMeta) {
  return moduleMeta && moduleMeta.url ? moduleMeta.url.href : "";
}


module.exports = Fetcher;
