(function() {
  "use script";

  function Require(importer) {
    this.importer = importer;
    this.loader   = importer.loader;
    this.context  = importer.loader.context;
  }

  Require.prototype.require = function(name, ready, options) {
    var loader = this.loader,
        logger = loader.Logger.factory("Bitimporter/require");

    logger.log(name, loader.context._id);

    if (loader.hasModule(name)) {
      return loader.getModuleCode(name);
    }
    else {
      return loader.import(name, options).done(ready || loader.Utils.noop);
    }
  };

  module.exports = Require;
})();
