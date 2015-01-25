(function() {
  "use strict";

  var Ajax     = require('promjax'),
      Resolver = require('amd-resolver');

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
        url        = moduleMeta.file.url.href;

    var logger = this.loader.Logger.factory("Bitimporter/Fetch");
    logger.log(moduleMeta.name, moduleMeta, url);

    return (new Ajax(url)).then(function(source) {
      moduleMeta.source  = source;
      moduleMeta.compile = compileModuleMeta(fetcher, moduleMeta, parentMeta);
      return moduleMeta;
    });
  };


  function compileModuleMeta(fetcher, moduleMeta /*, parentMeta*/) {
    var importer = fetcher.importer,
        loader   = fetcher.loader;

    return function compile() {
      var __module = {exports: {}},
          url      = moduleMeta.file.url.href,
          logger   = loader.Logger.factory("Bitimporter/Compile");

      logger.log(moduleMeta.name, moduleMeta);

      /* jshint -W061, -W054 */
      var result = (new Function("define", "require", "module", "exports", (moduleMeta.source) + getSourceUrl(url)))(importer.define, importer.require, __module, __module.exports);
      /* jshint +W061, +W054 */

      var mod = importer.define.instance.compileDefinitions(moduleMeta);

      // If `compileGlobalDefitions` does not return a module that means there were no calls
      // to `define`.  So we will build a module from either the return of the execution of
      // the module factory, or module.exports.
      if (!mod) {
        // If `define` was not called, the we will try to assign the result of the function
        // call to support IEFF, or exports.
        mod = new loader.Module({
          type: result ? loader.Module.Type.IEFF : loader.Module.Type.CJS,
          name: moduleMeta.name,
          code: result || __module.exports
        });
      }

      return mod;
    };
  }

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
    return moduleMeta ? moduleMeta.file.url.href : "";
  }

  /**
   * Builds a `//# sourceURL` string from the provided URL.
   */
  function getSourceUrl(url) {
    return "\n//# sourceURL=" + url;
  }

  module.exports = Fetcher;
})();
