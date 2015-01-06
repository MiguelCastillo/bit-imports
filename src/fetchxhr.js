(function() {
  "use strict";

  var Ajax     = require('promjax'),
      Resolver = require('amd-resolver'),
      Define   = require('./define');

  function Fetcher(manager, options) {
    this.manager  = manager;
    this.resolver = new Resolver(options);
  }

  Fetcher.prototype.fetch = function(name) {
    var manager    = this.manager,
        moduleMeta = this.resolver.resolve(name),
        _url       = moduleMeta.file.toUrl();

    return (new Ajax(_url)).then(function(source) {
      moduleMeta.source  = source;
      moduleMeta.compile = compileModuleMeta(manager, moduleMeta);
      return moduleMeta;
    });
  };


  function compileModuleMeta(manager, moduleMeta) {
    return function compile() {
      var __header = "",
          __footer = "",
          __module = {exports: {}};

      //__header += "'use strict';"; // Make this optional
      //__header += "debugger;";     // Make this optional
      __footer += ";//# sourceURL=" + moduleMeta.file.toUrl();

      /* jshint -W061, -W054 */
      var result = (new Function("module", "exports", __header + (moduleMeta.source) + __footer))(__module, __module.exports);
      /* jshint +W061, +W054 */

      var mod = Define.compileDefinitions(moduleMeta, Define.clearGlobalDefinitions());

      // If `compileGlobalDefitions` does not return a module that means there were no calls
      // to `define`.  So we will build a module from either the return of the execution of
      // the module factory, or module.exports.
      if (!mod) {
        // If `define` was not called, the we will try to assign the result of the function
        // call to support IEFF, or exports.
        mod = new manager.Module({
          type: result ? manager.Module.Type.IEFF : manager.Module.Type.CJS,
          name: moduleMeta.name,
          code: result || __module.exports
        });
      }

      return mod;
    };
  }

  module.exports = Fetcher;
})();
