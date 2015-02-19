(function() {
  "use strict";

  var Fetcher      = require("./fetchxhr"),
      Define       = require('./define'),
      Require      = require('./require'),
      dependencies = require('./transforms/dependencies'),
      acorn        = require('acorn'),
      acornWalker  = require('acorn/util/walk'),
      Bitloader    = require('bit-loader');

  var defaultTransform = [{
      name: "deps",
      handler: dependencies
    }];

  var defaults = {
    baseUrl    : "",
    paths      : {},
    shim       : {},
    deps       : [],
    packages   : [],
    transforms : []
  };


  /**
   * @constructor
   */
  function Bitimports(options) {
    options = options || {};
    options.transforms = (options.transforms || []).concat(defaultTransform);

    this.settings = Bitimports.Utils.merge({}, defaults, options);
    this.loader   = new Bitloader(this.settings, {fetch: fetchFactory(this)});

    // Expose primary interface for importing/registering modules
    this.import   = this.loader.import;
    this.register = this.loader.register;

    // Setup require interface
    var require   = new Require(this);
    this.require  = require.require.bind(require);
    this._require = require;

    // Setup define interface
    var define   = new Define(this);
    this.define  = define.define.bind(define);
    this._define = define;

    // Add `amd` for compliance
    this.define.amd = {};
  }


  Bitimports.prototype.config = function(options) {
    Bitimports.Utils.merge(this.settings, options);
    return this.factory(options);
  };


  Bitimports.prototype.factory = function(options) {
    return new Bitimports(options);
  };


  Bitimports.prototype.transform = function(source) {
    return this.loader.providers.loader
      .transform({source: source})
      .then(function(moduleMeta) {
        return moduleMeta.source;
      }, Bitimports.Utils.forwardError);
  };


  Bitimports.prototype.AST = function(source, options) {
    return {
      ast: acorn.parse(source, options),
      walk: acornWalker
    };
  };


  /**
   * Copy a few things over to make things a bit more accessible.
   */
  Bitimports.prototype.Promise = Bitloader.Promise;
  Bitimports.prototype.Module  = Bitloader.Module;
  Bitimports.prototype.Logger  = Bitloader.Logger;
  Bitimports.prototype.Utils   = Bitloader.Utils;

  Bitimports.Promise = Bitloader.Promise;
  Bitimports.Module  = Bitloader.Module;
  Bitimports.Logger  = Bitloader.Logger;
  Bitimports.Utils   = Bitloader.Utils;


  /**
   * fetchFactory is the hook for Bitloader to get a hold of a fetch provider
   */
  function fetchFactory(importer) {
    return function fetch(loader) {
      return new Fetcher(loader, importer);
    };
  }

  module.exports = new Bitimports();
})();
