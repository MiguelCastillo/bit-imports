var Fetcher     = require("./fetcher");
var Resolver    = require("./resolver");
var logger      = require("./logger");
var dependency  = require("deps-bits");
var Bitloader   = require("bit-loader");
var utils       = require("belty");


/**
 * Default options for Bitimports instances
 *
 * @private
 * @memberof Bitimports
 *
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
 * Bitimports extends Bitloader's functionality to provide support for AMD and
 * CJS. It implements a fetch provider to load files from storage. It also adds
 * the `define` and `require` methods to facilitte defining and loading modules
 *
 * @class
 * @private
 * @lends Bitloader.prototype
 *
 * @param {Object} options - Configuration settings to create Bitimports
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
 *  then Bitimports will load the transform as a module. Otherwise, it is
 *  pretty much only used for logging purposes.
 * @param {Function} options.transforms[].handler - If item.name isn't present,
 *  then the handler is considered an anonymous transform, otherwise it is
 *  considered a named transformed. Named transforms are very useful when
 *  debugging because transforms' names are logged
 */
function Bitimports(options) {
  var settings = utils.merge({}, defaults, options);
  var resolver = new Resolver(settings);
  var fetcher  = new Fetcher(this, settings);

  settings.resolve = settings.resolve || resolver.resolve.bind(resolver);
  settings.fetch   = settings.fetch   || fetcher.fetch.bind(fetcher);

  Bitloader.call(this, settings);

  this.plugin("js", {
    "dependency": dependency
  });

  // Make this option a bit obtuse - I wanna make it a lil difficult for people to
  // enable processing of node_modules since it can be rather difficult to tweak
  // configurations to properly excluce modules to be processed.
  if (settings.doNotIgnoreNodeModules !== true) {
    this.services.transform.ignore("path", /node_modules\//);
    this.services.dependency.ignore("path", /node_modules\//);
  }
}


// Setup prototypal inheritance.
Bitimports.prototype = Object.create(Bitloader.prototype);
Bitimports.prototype.constructor = Bitimports;

// Add these contructs to the prototype so that bit import instances can have
// access to them.
Bitimports.prototype.logger = logger;
Bitimports.prototype.Module = Bitloader.Module;
Bitimports.prototype.Rule   = Bitloader.Rule;


/**
 * Bitimports factory
 *
 * @returns {Bitimports} Instance of Bitimports
 */
Bitimports.prototype.create = function(options) {
  return new Bitimports(options);
};


/**
 * Method to configure an instance of Bitimports.
 *
 * config applies the configuration settings to `this` instance of Bitimports.
 * It will also create and return a new instance of Bitimports with the
 * configuration settings passed in. The config method is generally your
 * primary way of configuring and creating instances of Bitimports.
 *
 * @param {Object} [options] - Configuration settings used for creating the
 *  instance of Bitimports.
 *
 * @returns {Bitimports} Instance of Bitimports
 */
Bitimports.prototype.config = function(options) {
  utils.merge(this.settings, options);
  return this.create(options);
};


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
