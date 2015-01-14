(function(root) {
  "use strict";

  var Fetcher      = require("./fetchxhr"),
      Define       = require('./define'),
      Require      = require('./require'),
      cjsTransform = require('./transforms/cjs'),
      amdTransform = require('./transforms/amd'),
      Bitloader    = require('bit-loader'),
      Utils        = Bitloader.Utils;

  var defaults = {
    baseUrl    : "",
    paths      : {},
    shim       : {},
    deps       : [],
    packages   : [],
    transforms : [{name: "amd", handler: amdTransform, ignore: ["chai", "dist/bit-importer", "bit-loader", "cjsbit-transform"]}, {name: "cjs", handler: cjsTransform, ignore: ["chai", "dist/bit-importer", "bit-loader", "amdbit-transform"]}]
  };

  function Bitimporter(options) {
    if (options && options.transforms) {
      options.transforms = defaults.transforms.concat(options.transforms);
    }

    this.settings = Utils.extend({}, defaults, options);
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
    Bitloader.Utils.extend(this.settings, options);
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
  module.exports = Bitimporter;
})(typeof(window) !== 'undefined' ? window : this);
