(function() {
  "use strict";

  var Ajax     = require('promjax'),
      Resolver = require('amd-resolver');

  function Fetcher(loader, importer) {
    this.importer = importer;
    this.loader   = loader;
    this.resolver = new Resolver(importer.settings);
  }

  Fetcher.prototype.fetch = function(name) {
    var fetcher    = this,
        moduleMeta = this.resolver.resolve(name),
        _url       = moduleMeta.file.toUrl();

    var logger = this.loader.Logger.factory("Bitimporter/Fetch");
    logger.log(moduleMeta, _url);

    return (new Ajax(_url)).then(function(source) {
      moduleMeta.source  = source;
      moduleMeta.compile = compileModuleMeta(fetcher, moduleMeta);
      return moduleMeta;
    });
  };


  function compileModuleMeta(fetcher, moduleMeta) {
    var importer = fetcher.importer,
        loader   = fetcher.loader;

    return function compile() {
      var __header = "",
          __footer = "",
          __module = {exports: {}},
          _url     = moduleMeta.file.toUrl(),
          logger   = loader.Logger.factory("Bitimporter/Compile");

      logger.log(moduleMeta, _url);

      //__header += "'use strict';"; // Make this optional
      //__header += "debugger;";     // Make this optional
      __footer += ";//# sourceURL=" + _url;

      /* jshint -W061, -W054 */
      var result = (new Function("define", "require", "module", "exports", __header + (moduleMeta.source) + __footer))(importer.define, importer.require, __module, __module.exports);
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

  module.exports = Fetcher;
})();
