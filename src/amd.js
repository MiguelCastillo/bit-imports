(function(root) {
  "use strict";

  var Fetcher   = require("./fetchxhr"),
      Define    = require('./define'),
      Require   = require('./require'),
      Bitloader = require('bit-loader'),
      Utils     = Bitloader.Utils;

  var defaults = {
    baseUrl    : "",
    paths      : {},
    shim       : {},
    deps       : [],
    packages   : [],
    transforms : []
  };

  function AMDLoader(options) {
    this.settings   = Utils.extend({}, defaults, options);
    Bitloader.Fetch = fetchFactory(this);

    var bitloader = new Bitloader(this.settings),
        define    = new Define(bitloader),
        require   = new Require(bitloader);

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
    return function fetch(manager) {
      return new Fetcher(manager, amdLoader.settings);
    };
  }

  var options;
  if (Utils.isPlainObject(root.require || root.requirejs)) {
    options = root.require || root.requirejs;
  }

  root.Bitloader = new AMDLoader(options);
  module.exports = AMDLoader;
})(typeof(window) !== 'undefined' ? window : this);
