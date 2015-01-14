(function(root) {
  "use strict";

  var Fetcher      = require("./fetchxhr"),
      Define       = require('./define'),
      Require      = require('./require'),
      cjsTransform = require('./transforms/cjs'),
      amdTransform = require('./transforms/amd'),
      Bitloader    = require('bit-loader'),
      Utils        = Bitloader.Utils;

  var defaultTransform = [{
      name: "amd",
      handler: amdTransform
    }, {
      name: "cjs",
      handler: cjsTransform,
      ignore: ["amd"]
    }];

  var defaults = {
    baseUrl    : "",
    paths      : {},
    shim       : {},
    deps       : [],
    packages   : [],
    transforms : []
  };

  function Bitimporter(options) {
    options = options || {};
    options.transforms = (options.transforms || []).concat(defaultTransform);

    this.settings = Utils.merge({}, defaults, options);
    this.loader   = new Bitloader(this.settings, {fetch: fetchFactory(this)});
    this.import   = this.loader.import;

    // Setup require interface
    var require  = new Require(this);
    this.require = require.require.bind(require);

    // Setup define interface
    var define  = new Define(this);
    this.define = define.define.bind(define);
    this.define.instance = define;

    // Add `amd` for compliance
    this.define.amd = {};
  }

  Bitimporter.prototype.config = function(options) {
    Bitloader.Utils.merge(this.settings, options);
    return this.factory(options);
  };

  Bitimporter.prototype.factory = function(options) {
    return new Bitimporter(options);
  };

  /**
   * fetchFactory is the hook for Bitloader to get a hold of a fetch provider
   */
  function fetchFactory(importer) {
    return function fetch(loader) {
      return new Fetcher(loader, importer);
    };
  }

  var options;
  if (Utils.isPlainObject(root.require || root.requirejs)) {
    options = root.require || root.requirejs;
  }

  root.Bitimporter = new Bitimporter(options);
  root.Bitimporter.Logger = Bitloader.Logger;
  module.exports = Bitimporter;
})(typeof(window) !== 'undefined' ? window : this);
