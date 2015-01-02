(function() {
  "use script";

  function Require(manager) {
    this.manager = manager;
    this.context = manager.context;
  }

  Require.prototype.require = function(name, ready, options) {
    var manager = this.manager,
        context = this.context;

    if (context.modules.hasOwnProperty(name)) {
      return context.modules[name];
    }
    else {
      return manager.import(name, options).done(ready || manager.Utils.noop);
    }
  };

  module.exports = Require;
})();
