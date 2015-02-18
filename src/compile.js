(function() {
  'user strict';

  function compileModuleMeta(fetcher, moduleMeta, parentMeta) {
    var importer = fetcher.importer;

    function evaluate() {
      var url     = moduleMeta.url.href;
      var source  = moduleMeta.source + getSourceUrl(url);
      var _module = {exports: {}, url: url, meta: moduleMeta, parent: parentMeta};

      /* jshint -W061, -W054 */
      var execute = new Function("System", "define", "require", "module", "exports", source);
      /* jshint +W061, +W054 */

      var result = execute(importer, importer.define, importer.require, _module, _module.exports);

      return {
        result: result,
        module: _module
      };
    }

    function compile() {
      var logger = importer.Logger.factory("Bitimporter/Compile");
      logger.log(moduleMeta.name, moduleMeta);

      // Evaluation will execute the module meta source, which might call `define`.
      // When that happens, `getDefinitions` will get us the proper module definitions.
      var evaluated   = evaluate();
      var definitions = importer._define.getDefinitions(moduleMeta.name);

      if (definitions) {
        definitions.type = importer.Module.Type.AMD;
        return new importer.Module(definitions);
      }

      // If `define` was not called, the we will try to assign the result of the function
      // call to support IEFF, or exports.
      moduleMeta.type = evaluated.result ? importer.Module.Type.IEFF : importer.Module.Type.CJS;
      moduleMeta.code = evaluated.result || evaluated.module.exports;
      return new importer.Module(moduleMeta);
    }

    return compile;
  }

  /**
   * Builds a `//# sourceURL` string from the provided URL.
   */
  function getSourceUrl(url) {
    return "\n//# sourceURL=" + url;
  }


  module.exports = compileModuleMeta;
})();
