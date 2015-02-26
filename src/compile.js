/**
 * @class
 *
 * Factory to create `compile` method to be used by module meta objects to
 * compile themselves into module instances.
 *
 * @param {Fetcher} fetcher - Instance of fetcher that gives us access to the
 *  importer/loader environment.
 * @param {Object} moduleMeta - Module meta object to be compiled whe the
 *  compile method is called.
 * @param {Object} parentMeta - Parent module meta object to establish a
 *  hierarchy of modules requesting other modules.
 *
 * @returns {Function} Method that compiles the module meta object passed in.
 */
function Compile(fetcher, moduleMeta, parentMeta) {
  var importer = fetcher.importer;

  /**
   * Method that evaluates the module meta source
   *
   * @private
   */
  function evaluate() {
    var url      = moduleMeta.url.href;
    var source   = moduleMeta.source + getSourceUrl(url);
    var pathInfo = getPathInfo(url, fetcher);
    var _module  = {exports: {}, id: moduleMeta.name, url: url, meta: moduleMeta, parent: parentMeta};

    /* jshint -W061, -W054 */
    var execute = new Function("__dirname", "__filename", "System", "define", "require", "module", "exports", source);
    /* jshint +W061, +W054 */

    var result = execute(pathInfo.__dirname, pathInfo.__filename, importer, importer.define, importer.require, _module, _module.exports);

    return {
      result: result,
      module: _module
    };
  }

  /**
   * Method that executes a module meta object in order to generate a final Module product.
   * It does it by first evaluating the module meta source, then collecting any `AMD` define
   * calls, then figuring out what type of Module is created.
   *
   * @returns {Module}
   */
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
    // call to support IIFE, or exports.
    moduleMeta.type = evaluated.result ? importer.Module.Type.IIFE : importer.Module.Type.CJS;
    moduleMeta.code = evaluated.result || evaluated.module.exports;
    return new importer.Module(moduleMeta);
  }

  return compile;
}

/*
 * Builds a `# sourceURL` string from the URL.
 *
 * @private
 */
function getSourceUrl(url) {
  return "\n//# sourceURL=" + url;
}


/**
 * Function that extracts the __dirname and __filename
 *
 * @private
 * @returns {{__dirname: string, __filename: string}}
 */
function getPathInfo(url, fetcher) {
  var pathInfo = fetcher.resolver.File.parseParts(url);
  return {
    __dirname: pathInfo.directory,
    __filename: pathInfo.path
  };
}


module.exports = Compile;
