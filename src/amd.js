(function(root) {
  "use strict";
  var Fetcher   = require("./fetchxhr"),
      Define    = require('./define'),
      Require   = require('./require'),
      Bitloader = require('bit-loader'),
      Utils     = Bitloader.Utils;

  var defaults = {
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

    var bitloader = new Bitloader();
    var define    = new Define(bitloader);
    var require   = new Require(bitloader);

    this.import  = bitloader.import;
    this.define  = define.define.bind(define);
    this.require = require.require.bind(require);

    // Add `amd` for compliance
    this.define.amd = {};
  }

  AMDLoader.prototype.config = function(options) {
    Bitloader.Utils.extend(this.settings, options);
    return new AMDLoader(options);
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
