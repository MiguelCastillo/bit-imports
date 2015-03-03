var Fetcher      = require("./fetchxhr"),
    Define       = require('./define'),
    Require      = require('./require'),
    dependencies = require('deps-bits'),
    acorn        = require('acorn'),
    acornWalker  = require('acorn/util/walk'),
    Bitloader    = require('bit-loader');


var defaultTransform = [{
    name: "deps",
    handler: dependencies
  }];


/**
 * Default options for bit imports instances
 * @private
 * @memberof Bitimports
 * @property {string} baseUrl - Url modules are relative to
 * @property {Object} paths - Map of module names to module locations
 * @property {Object} shim - Definition of modules that are loaded into the global space that need to be used a modules
 * @property {Array.<string>} deps - List of dependencies to be loaded before the first module is loaded.
 * @property {Array.<Object>} packages - List of package definition to map module names to directory structures
 * @property {Array.<string|Function|Object>} transforms - List of transformations that process module source files.
 */
var defaults = {
  baseUrl    : ".",
  paths      : {},
  shim       : {},
  deps       : [],
  packages   : [],
  transforms : []
};


/**
 * Bitimports is a facade that exposes an interface for module management.
 *
 * @class
 * @private
 *
 * @param {Object} options - Configuration settings to create bit imports
 *  instance.
 *  Please take a look over at [amd resolver]{@link https://github.com/MiguelCastillo/amd-resolver}
 *  for details on the options.
 * @param {string} options.baseUrl - Is the root URL that all modules are
 *  relative to.
 * @param {Object} options.paths - Is a map of module names to module locations
 *  This really useful for setting up module names that are more legible and
 *  easier to maintain.
 * @param {Array.<(string|Function|Object)>} options.transforms[] - Collection of
 *  transforms to be applied to module meta sources.
 * @param {string} options.transforms[] - Transform to be loaded as a named
 *  module.
 * @param {Function} options.transforms[] - Anonymous transformation that
 *  transforms module meta source.
 * @param {Object} options.transforms[] - More specific transform configuration
 *  where either a name or handler function must be provided.
 * @param {string} options.transforms[].name - If item.handler isn't present,
 *  then bit imports will load the transform as a module. Otherwise, it is
 *  pretty much only used for logging purposes.
 * @param {Function} options.transforms[].handler - If item.name isn't present,
 *  then the handler is considered an anonymous transform, otherwise it is
 *  considered a named transformed. Named transforms are very useful when
 *  debugging because transforms' names are logged
 */
function Bitimports(options) {
  options = options || {};
  options.transforms = (options.transforms || []).concat(defaultTransform);

  this.settings = Bitimports.Utils.merge({}, defaults, options);
  this.loader   = new Bitloader(this.settings, {fetch: fetchFactory(this)});

  this.import   = this.loader.import;
  this.register = this.loader.register;

  this._require = new Require(this);
  this.require  = this._require.require.bind(this._require);

  this._define  = new Define(this);
  this.define   = this._define.define.bind(this._define);

  // Add `amd` for compliance
  this.define.amd = {};
}


/** Promise constructor */
Bitimports.Promise = Bitimports.prototype.Promise = Bitloader.Promise;

/** Module constructor */
Bitimports.Module = Bitimports.prototype.Module = Bitloader.Module;

/** Logger singleton and factory */
Bitimports.Logger = Bitimports.prototype.Logger = Bitloader.Logger;

/** Helper Utilities */
Bitimports.Utils = Bitimports.prototype.Utils = Bitloader.Utils;


/**
 * Method to asynchronously load modules
 *
 * @function
 *
 * @param {string|Array.<string>} names - Module or list of modules names to
 *  load. These names map back to the paths settings Bitimports was created
 *  with.
 *
 * @returns {Promise} That when resolved, all the imported modules are passed
 *  back as arguments.
 */
Bitimports.prototype.import = function(){};


/**
 * Method to define a module to be asynchronously loaded via the
 * [import]{@link Bitimports#import} method
 *
 * @param {string} name - Name of the module to register
 * @param {Array.<string>} deps - Collection of dependencies to be loaded and
 *  passed into the factory callback method.
 * @param {Function} factory - Function to be called in order to instantiate
 *  (realize) the module
 */
Bitimports.prototype.register = function(){};


/**
 * Method to get modules.
 *
 * @param {string | Array.<string>} names - module name(s) to be loaded. When
 *  array is provided, the ready callback is always called to get the
 *  resulting modules.
 * @param {Function} ready - Callback function, which is called when the
 *  module(s) are loaded and ready for the application to consume.
 * @param {Object} options - Configuration settings specific to the
 *  [require]{@link Bitimports#require} call. For example, you can specify a
 *  `modules` map to tell bit imports to use those modules before loading
 *  them from storage or cache.
 *  This is particularly useful for unit tests where dependency injection of
 *  mocked modules is needed.
 *
 * @returns {Promise|Module} When `require` is called with a single string and
 *  the module has already been loaded, then the actual module is returned.
 *  This is to follow `CJS` module format. If more than one module is
 *  `require`d, then a Promise is returned that when resolved, all the
 *  `require`d modules are passed in.
 */
Bitimports.prototype.require = function(){};


/**
 * Method to define a Module using AMD format, which can be dynamically
 * imported.
 *
 * @param {string} [name] - is the name of the module to define. If no name
 *  is present, then the last anonymous `define` is coerced to be the named
 *  module definition. An anonymous module is one with no name.
 * @param {Array.<string>} [dependencies] - list of module names to be loaded
 *  before the module definition is processed and executed (evaluated).
 * @param {*} factory - When factory is a function, it is called when the
 *  module is executed (evaluated) to define the module code. Whatever is
 *  returned from calling factory becomes the actual module code that's
 *  returned when the module is imported.
 *  When dependencies are defined, those are passed to factory as arguments.
 *  If factory is not a function, then that is the actual module code that is
 *  returned when the module is imported.
 */
Bitimports.prototype.define = function(){};


/**
 * Method to configure an instance of bit imports.
 *
 * config applies configuration settings to the particular instance of bit
 * imports. It will also create and return a new instance of bit imports with
 * the configuration settings passed in. The config method is generally your
 * primary way of configuring bit imports.
 *
 * @param {Object} [options] - Configuration settings used for creating the
 *  instance of bit imports.
 *
 * @see [imports settings]{@link Bitimports} options for more details.
 *
 * @returns {Bitimports} Instance of bit imports
 */
Bitimports.prototype.config = function(options) {
  Bitimports.Utils.merge(this.settings, options);
  return this.factory(options);
};


/**
 * Method that creates bit import instances. Options is the same as
 * [config]{@link Bitimports#config}, so please refer to that for details.
 *
 * @param {Object} options - Configuration settings used for creating the
 *  instance of bit imports.
 *
 * @see [imports settings]{@link Bitimports} options for more details.
 *
 * @returns {Bitimports} Instance of bit imports
 */
Bitimports.prototype.factory = function(options) {
  return new Bitimports(options);
};


/**
 * Convenience method to run the input string through the transformation
 * workflow
 *
 * @param {string} source - Source string to be processed by the transformation
 *  workflow.
 *
 * @returns {Promise} That when resolved, the processed text is returned.
 */
Bitimports.prototype.transform = function(source) {
  return this.loader.providers.loader
    .transform({source: source})
    .then(function(moduleMeta) {
      return moduleMeta.source;
    }, Bitimports.Utils.forwardError);
};


/**
 * Convenience method to create an AST (Abstract Syntax Tree) from the input
 * source string. The ast is built with [acorn]{@link http://marijnhaverbeke.nl/acorn/},
 * so please feel free to check it out for details on how it works and its
 * options.
 *
 * @param {string} source - Source string to create the AST from.
 * @param {Object} options - Configuration settings passed directly into acorn.
 *  Please refer to [acorn]{@link http://marijnhaverbeke.nl/acorn/} for all
 *  valid options.
 *
 * @returns {{ast: Object, walk: Function}} Object with built ast and a helper
 *  function called walk, which is provider by acorn to help in the tree
 *  traversal process.
 */
Bitimports.prototype.AST = function(source, options) {
  return {
    ast: acorn.parse(source, options),
    walk: acornWalker
  };
};


/**
 * fetchFactory is the hook for Bitloader to get a hold of a fetch provider
 *
 * @ignore
 * @private
 *
 * @param {Bitimports} importer - Instance of Bitimports
 *
 * @returns {Function} Factory function that creates instances of Fetcher; the
 *  fetch provider
 */
function fetchFactory(importer) {
  return function fetch(loader) {
    return new Fetcher(loader, importer);
  };
}


/**
 * `bitimports` is the default Bitimports instance available. All you need to
 * do if configure it with the [config]{@link Bitimports#config} method to
 * define how your application is structured. The goal of the configuration
 * step is to help you make your code simple and readable when importing and
 * exporting modules.
 *
 * When the bit-imports module is loaded via script tag, which is the more
 * common use case in the browser, `bitimports` is automatically added to the
 * global object.  But since bit-imports is a [UMD]{@link https://github.com/umdjs/umd}
 * module, feel free to load it as an [AMD]{@link https://github.com/amdjs/amdjs-api/wiki/AMD}
 * or [CJS]{@link http://wiki.commonjs.org/wiki/Modules/1.1.1} module.
 *
 * `bitimports` exposes methods such as [require]{@link Bitimports#require},
 * [define]{@link Bitimports#define}, [import]{@link Bitimports#import}, and
 * [register]{@link Bitimports#register} to provide a comprehensive system for
 * loading modules synchronously and asynchronously in `AMD` and `CJS` module
 * formats.
 *
 * @global
 * @name bitimports
 * @type Bitimports
 * @see {@link Bitimports}
 */
module.exports = new Bitimports();
