var logger     = require("./logger");
var factory    = require("./factory");
var dependency = require("deps-bits");
var Bitloader  = require("bit-loader");
var utils      = require("belty");


/*
 * Default options for Bitimports instances
 *
 * @private
 * @memberof Bitimports
 */
var defaults = {
  baseUrl  : ".",
  packages : [],
  paths    : {}
};


/**
 * Bitimports is a module loader for the browser. It has flexible and powerful
 * processing pipelines that allow you to load your modules the way you want.
 * This module loader supports the System module loading interface for loading
 * modules as well as CJS dependency processing. This combination enables the
 * use of transpilers like [babel]{@link http://babeljs.io/} so that you can
 * write ES6 (and later), write in the browser. [bit-loader]{@link Bitloader}
 *
 * @class
 * @private
 * @augments Bitloader
 */
function Bitimports(options) {
  var settings = utils.merge({}, defaults, options);

  if (!settings.resolve) {
    var resolver = factory.create("resolver", settings);
    settings.resolve = resolver.resolve.bind(resolver);
  }

  if (!settings.fetch) {
    var fetcher = factory.create("fetcher", settings);
    settings.fetch = fetcher.fetch.bind(fetcher);
  }

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


// Setup inheritance.
Bitimports.prototype = Object.create(Bitloader.prototype);
Bitimports.prototype.constructor = Bitimports;

// Add these contructs to the prototype so that bit import instances can have
// access to them.

/**
 * Global logger instance.
 */
Bitimports.prototype.logger = logger;

/*
 * Module constructor
 */
Bitimports.prototype.Module = Bitloader.Module;

/*
 * Rule matching engine constructor
 */
Bitimports.prototype.Rule = Bitloader.Rule;


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
 * @param {Object} options - Configuration settings for Bitimports instance.
 *  Please take a look over at [amd resolver]{@link https://github.com/MiguelCastillo/amd-resolver}
 *  for details on the options.
 * @param {string} options.baseUrl - Root URL for resolving modules names.
 * @param {Object} options.paths - A map of module names to module paths.
 *  The resolution pipeline will use the configured paths when loading modules
 *  for the matching names.
 * @param {string[]} options.extensions - List of known extensions. Files with
 *  extensions in this list will not get `.js` appended.
 * @param {string[]} options.packages - List of module names to be treated as packages.
 *  Module names matching items in this list will resolve to URLs `packagename/main.js`.
 *  That is to say that loading a module called `machine` will generate the URL `machine/main.js`.
 * @param {Object[]} options.packages - List of package configuration settings.
 *  Package objects allow you to granuarly configure what URLs are generated when
 *  resolving module names.
 * @param {string} options.packages[].location - Location of the module on disk
 * @param {string} options.packages[].main - File name. Defaults to `main.js`.
 * @param {string} options.packages[].name - Package name. This is what the resolution
 *  matches module names against.
 *
 * @returns {Bitimports} Instance of Bitimports
 */
Bitimports.prototype.config = function(options) {
  return this.create(utils.merge({}, this.settings, { fetch: null, resolve: null }, options));
};


/**
 * `bitimports` is the default instance available in the environtment.
 * Generally speaking, you configure it with the [config]{@link Bitimports#config} method
 * to define how your application needs to be processed.
 *
 * When the bit-imports module is loaded via script tag, which is the more
 * common use case in the browser, `bitimports` is automatically added to the
 * global object.  But since bit-imports is a [UMD]{@link https://github.com/umdjs/umd}
 * module, feel free to load it as an [AMD]{@link https://github.com/amdjs/amdjs-api/wiki/AMD}
 * or [CJS]{@link http://wiki.commonjs.org/wiki/Modules/1.1.1} module.
 *
 *
 * @example
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <script type="text/javascript" src="node_modules/bit-imports/dist/bit-imports.min.js" defer></script>
 *     <script type="text/javascript" src="config.js" defer></script>
 *   </head>
 * </html>
 *
 * @example
 * var System = bitimports
 *  // Configure bitimports
 *  .config({
 *    paths: {
 *      babel: "node_modules/babel-bits/dist/index.min"
 *    }
 *  })
 *  // Setup js pipeline with babel-bits
 *  .plugin("js", {
 *    match: { path: /\.(js)$/ },
 *    transform: {
 *      handler: "babel",
 *      options: {
 *        sourceMap: "inline",
 *        presets: ["es2015"]
 *      }
 *    }
 *  });
 *
 * // Import "main" module.
 * System.import("main");
 *
 * @global
 * @name bitimports
 * @type Bitimports
 * @see {@link Bitimports}
 */
module.exports = new Bitimports();
