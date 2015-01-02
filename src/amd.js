(function(root) {
  "use strict";
  var Fetcher = require("./fetchxhr"),
      Define  = require('./define'),
      Require = require('./require'),
      MLoader = require("mloader"),
      Utils   = MLoader.Utils;

  var defaults = {
    global: this,
    baseUrl: "",
    cache: true,
    deps: [],
    paths: {},
    shim: {},
    packages: []
  };

  function AMDLoader(options) {
    this.settings = Utils.merge({}, defaults, options);
    MLoader.Fetch = fetchFactory(this);
    var mloader = new MLoader();
    var define  = new Define(mloader);
    var require = new Require(mloader);

    this.import  = mloader.import;
    this.define  = define.define.bind(define);
    this.require = require.require.bind(require);
  }

  AMDLoader.prototype.config = function(options) {
    MLoader.Utils.merge(this.settings, options);
  };

  AMDLoader.prototype.factory = function(options) {
    return new AMDLoader(options);
  };

  /**
   * fetchFactory is the hook for MLoader to get a hold of a fetch provider
   */
  function fetchFactory(amdLoader) {
    return function fetch(/*manager*/) {
      return new Fetcher(amdLoader.settings);
    };
  }

  root.MLoader = new AMDLoader();
  module.exports = AMDLoader;
})(typeof(window) !== 'undefined' ? window : this);
