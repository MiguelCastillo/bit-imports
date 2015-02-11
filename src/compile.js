(function() {
  'user strict';

  function compileModuleMeta(fetcher, moduleMeta, parentMeta) {
    var importer = fetcher.importer,
        loader   = fetcher.loader;

    return function compile() {
      var url      = moduleMeta.url.href,
          logger   = loader.Logger.factory("Bitimporter/Compile"),
          __module = {exports: {}, url: url, parent: parentMeta};

      logger.log(moduleMeta.name, moduleMeta);

      /* jshint -W061, -W054 */
      var result = (new Function("System", "define", "require", "module", "exports", "meta", (moduleMeta.source) + getSourceUrl(url)))(importer, importer.define, importer.require, __module, __module.exports, moduleMeta);
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
   * Builds a `//# sourceURL` string from the provided URL.
   */
  function getSourceUrl(url) {
    return "\n//# sourceURL=" + url;
  }


  module.exports = compileModuleMeta;
})();
