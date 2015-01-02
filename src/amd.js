(function(root) {
  "use strict";
  var Fetcher   = require("./fetchxhr"),
      Define    = require('./define'),
      Require   = require('./require'),
      Bitloader = require('bit-loader'),
      Utils     = Bitloader.Utils;

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
    this.settings = Utils.extend({}, defaults, options);
    Bitloader.Fetch = fetchFactory(this);
    var mloader = new Bitloader();
    var define  = new Define(mloader);
    var require = new Require(mloader);

    this.import  = mloader.import;
    this.define  = define.define.bind(define);
    this.require = require.require.bind(require);
  }

  AMDLoader.prototype.config = function(options) {
    Bitloader.Utils.extend(this.settings, options);
  };

  AMDLoader.prototype.factory = function(options) {
    return new AMDLoader(options);
  };

  /**
   * fetchFactory is the hook for Bitloader to get a hold of a fetch provider
   */
  function fetchFactory(amdLoader) {
    return function fetch(/*manager*/) {
      return new Fetcher(amdLoader.settings);
    };
  }

  root.Bitloader = new AMDLoader();
  module.exports = AMDLoader;
})(typeof(window) !== 'undefined' ? window : this);
