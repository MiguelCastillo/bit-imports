(function() {
  "use strict";

  var Ajax           = require('promjax'),
      Resolver       = require('amd-resolver'),
      compileFactory = require('./compile');

  function Fetcher(loader, importer) {
    var settings     = loader.Utils.merge({}, importer.settings);
    settings.baseUrl = getBaseUrl(settings.baseUrl);

    this.importer = importer;
    this.loader   = loader;
    this.resolver = new Resolver(settings);
  }


  Fetcher.prototype.fetch = function(name, parentMeta) {
    var fetcher    = this,
        cwd        = getWorkingDirectory(parentMeta),
        moduleMeta = this.resolver.resolve(name, cwd),
        url        = moduleMeta.url.href;

    var logger = this.loader.Logger.factory("Bitimporter/Fetch");
    logger.log(moduleMeta.name, moduleMeta, url);

    return (new Ajax(url)).then(function(source) {
      moduleMeta.source  = source;
      moduleMeta.compile = compileFactory(fetcher, moduleMeta, parentMeta);
      return moduleMeta;
    });
  };


  /**
   * This will adjust the baseUrl in the settings so that requests get the absolute
   * url so that browsers can better handle `# sourceURL`.  In chrome for example,
   * the files are added to the developer tools' source tree, which let's you put
   * break points directly from the developer tools.
   */
  function getBaseUrl(url) {
    return Resolver.URL.parser.resolve(window.location.href, url || "");
  }

  /**
   * Gets the url form the module data if it exists.
   */
  function getWorkingDirectory(moduleMeta) {
    return moduleMeta && moduleMeta.url ? moduleMeta.url.href : "";
  }


  module.exports = Fetcher;
})();
