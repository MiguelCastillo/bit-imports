!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.amdLoader=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.amdResolver=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  "use strict";

  function File (fileUri, baseUri) {
    var fileName, mergedPath;
    baseUri = baseUri || "";
    fileUri = File.parseUri(fileUri);

    if (fileUri.protocol || !baseUri) {
      fileName = File.parseFileName(fileUri.path);
    }
    else {
      baseUri    = File.parseUri(baseUri);
      mergedPath = File.mergePaths(fileUri.path, baseUri ? baseUri.path : "/");
      fileName   = File.parseFileName(mergedPath);
    }

    this._file    = fileUri;
    this.protocol = fileUri.protocol ? fileUri.protocol + fileUri.protocolmark : undefined;
    this.name     = fileName.name;
    this.path     = fileName.path;
  }

  File.prototype.toUrl = function () {
    var file = this;
    return (file.protocol || "") + (file.path || "") + file.name;
  };

  /**
   * Parses out uri
   */
  File.parseUri = function(uriString) {
    if (!uriString) {
      throw new Error("Must provide a string to parse");
    }

    if (File.isHttpProtocol(uriString)) {
      return File.parseHttpProtocol(uriString);
    }
    else {
      return File.parseFileProtocol(uriString);
    }
  };

  /**
   * Parses out the string into file components
   * return {object} file object
   */
  File.parseFileProtocol = function (uriString) {
    var uriParts = /^(?:(file:)(\/\/\/?))?(([A-Za-z-]+:)?[/\\d\w\.\s-]+)/gmi.exec(uriString);
    uriParts.shift();

    // Make sure we sanitize the slashes
    if (uriParts[2]) {
      uriParts[2] = File.normalize(uriParts[2]);
    }

    return {
      protocol: uriParts[0],
      protocolmark: uriParts[1],
      path: uriParts[2],
      drive: uriParts[3],
      href: uriString,
      uriParts: uriParts
    };
  };

  /**
   * Parses out a string into an http url
   * @return {object} url object
   */
  File.parseHttpProtocol = function (uriString) {
    var uriParts = /^((https?:)(\/\/)([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gmi.exec(uriString);
    uriParts.shift();

    // Make sure we sanitize the slashes
    if (uriParts[5]) {
      uriParts[5] = File.normalize(uriParts[5]);
    }

    return {
      origin: uriParts[0],
      protocol: uriParts[1],
      protocolmark: uriParts[2],
      hostname: uriParts[3],
      port: uriParts[4],
      path: uriParts[5],
      search: uriParts[6],
      hash: uriParts[7],
      href: uriString,
      uriParts: uriParts
    };
  };

  /**
   * Tests if a uri has a protocol
   * @return {boolean} if the uri has a protocol
   */
  File.hasProtocol = function (path) {
    return /^(?:(https?|file)(:\/\/\/?))/g.test(path) === false;
  };

  /**
   * Test is the input constains the file protocol delimiter.
   * @return {boolean} True is it is a file protocol, othterwise false
   */
  File.isFileProtocol = function (protocolString) {
    return /^file:/gmi.test(protocolString);
  };

  /**
   * Test is the input constains the http/https protocol delimiter.
   * @return {boolean} True is it is an http protocol, othterwise false
   */
  File.isHttpProtocol = function (protocolString) {
    return /^https?:/gmi.test(protocolString);
  };

  /**
   * Build and file object with the important pieces
   */
  File.parseFileName = function (fileString) {
    var fileName;
    var pathName = fileString.replace(/([^/]+)$/gmi, function(match) {
      fileName = match;
      return "";
    });

    return {
      name: fileName,
      path: pathName
    };
  };

  /**
   * Method to add an extension if one does not exist in the fileString.  It does NOT replace
   * the file extension if one already exists in `fileString`.
   *
   * @param {string} fileString - File string to add the extension to if one does not exist
   * @param {string} extension - Extension to add if one does not exist in `fileString`. The
   *   value is the extension without the `.`. E.g. `js`, `html`.  Not `.js`, `.html`.
   * @returns {string} New fileString with the new extension if one did not exist
   */
  File.addExtension = function(fileString, extension) {
    var fileName  = File.parseFileName(fileString),
        fileParts = fileName.name.split(".");

    if (fileParts.length === 1 && extension) {
      fileParts.push(extension);
    }

    return fileName.path + fileParts.join(".");
  };

  /**
   * Removes all forward and back slashes to forward slashes as well as all duplicates slashes
   * and resolve all . and .. in the path.
   * @param {string} path - Path to normalize
   * @return {string} path with only one forward slash a path delimters
   */
  File.normalize = function (path) {
    var pathParts = path.replace(/[\\/]+/g, "/").split("/"),
        pathCount = pathParts.length - 1,
        skip      = 0,
        newPath   = [];

    while (pathCount >= 0) {
      if (pathCount > 0) {
        if (pathParts[pathCount] === "..") {
          pathCount -= 1; skip++; continue;
        }
        else if (pathParts[pathCount] === ".") {
          pathCount -= 1; continue;
        }
      }

      if (skip) {
        pathCount -= skip;
        skip = 0;
      }

      newPath.unshift(pathParts[pathCount]);
      pathCount--;
    }

    return newPath.join('/');
  };

  /**
   * Merges a path with a base.  This is used for handling relative paths.
   * @return {string} Merge path
   */
  File.mergePaths = function (path, base) {
    if (path[0] === '/') {
      return File.normalize(path);
    }

    if (base && path) {
      path = base + "/" + path;
    }
    else {
      path = path || base;
    }

    return File.normalize(path);
  };

  module.exports = File;
})();

},{}],2:[function(require,module,exports){
(function() {
  "use strict";

  var File = require('./file');

  /**
   * @constructor Resolver - provides a way to take a configuration such as one
   * from requirejs to convert module names/ids to module meta objects. Module meta
   * objects contain information such as the url for the module, which can be used
   * for retrieving the corresponding file from a remote sever.
   */
  function Resolver(options) {
    this.settings = options || {};
  }

  /**
   * Creates a module meta from a module name/id.
   *
   * @param {string} name - Module name/id
   *
   * @returns {{name: string, file: File, urlArgs: string, shim: object}}
   */
  Resolver.prototype.resolve = function(name) {
    var i, length, pkg, pkgParts, pkgName, pkgTarget, shim;
    var settings = this.settings,
        shims    = settings.shim || {},
        packages = settings.packages || [],
        fileName = (settings.paths && settings.paths[name]) || name,
        plugins  = name.split("!");

    // The last item is the actual module name.
    name      = plugins.pop();
    pkgParts  = name.replace(/[\/\\]+/g, "/").split("/");
    pkgName   = pkgParts.shift();
    pkgTarget = pkgParts.join("/");

    // Go through the packages and figure if the module is actually configured as such.
    for (i = 0, length = packages.length; i < length; i++) {
      pkg = packages[i];

      if (pkg === pkgName) {
        fileName = pkgName + "/" + "main";
        break;
      }
      else if (pkg.name === pkgName) {
        fileName = pkg.location ? (pkg.location + "/") : "";
        fileName += pkgName + "/" + (pkgTarget || (pkg.main || "main"));
        break;
      }
    }

    if (shims.hasOwnProperty(name)) {
      shim = {
        name: shims[name].exports || shims[name].name || name,
        deps: shims[name].imports || shims[name].deps || []
      };
    }

    return {
      name: name,
      file: new File(File.addExtension(fileName, "js"), settings.baseUrl),
      urlArgs: settings.urlArgs,
      shim: shim,
      plugins: plugins
    };
  };

  Resolver.File = File;
  module.exports = Resolver;
})();

},{"./file":1}]},{},[2])(2)
});
},{"./file":undefined}],2:[function(require,module,exports){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.mloader=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/spromise
 */

/**
 * @license almond 0.3.0 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */

(function(e,t){typeof require=="function"&&typeof exports=="object"&&typeof module=="object"?module.exports=t():typeof define=="function"&&define.amd?define(t):e.spromise=t()})(this,function(){var e,t,n;return function(r){function v(e,t){return h.call(e,t)}function m(e,t){var n,r,i,s,o,u,a,f,c,h,p,v=t&&t.split("/"),m=l.map,g=m&&m["*"]||{};if(e&&e.charAt(0)===".")if(t){v=v.slice(0,v.length-1),e=e.split("/"),o=e.length-1,l.nodeIdCompat&&d.test(e[o])&&(e[o]=e[o].replace(d,"")),e=v.concat(e);for(c=0;c<e.length;c+=1){p=e[c];if(p===".")e.splice(c,1),c-=1;else if(p===".."){if(c===1&&(e[2]===".."||e[0]===".."))break;c>0&&(e.splice(c-1,2),c-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((v||g)&&m){n=e.split("/");for(c=n.length;c>0;c-=1){r=n.slice(0,c).join("/");if(v)for(h=v.length;h>0;h-=1){i=m[v.slice(0,h).join("/")];if(i){i=i[r];if(i){s=i,u=c;break}}}if(s)break;!a&&g&&g[r]&&(a=g[r],f=c)}!s&&a&&(s=a,u=f),s&&(n.splice(0,u,s),e=n.join("/"))}return e}function g(e,t){return function(){var n=p.call(arguments,0);return typeof n[0]!="string"&&n.length===1&&n.push(null),s.apply(r,n.concat([e,t]))}}function y(e){return function(t){return m(t,e)}}function b(e){return function(t){a[e]=t}}function w(e){if(v(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!v(a,e)&&!v(c,e))throw new Error("No "+e);return a[e]}function E(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function S(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice,d=/\.js$/;o=function(e,t){var n,r=E(e),i=r[0];return e=r[1],i&&(i=m(i,t),n=w(i)),i?n&&n.normalize?e=n.normalize(e,y(t)):e=m(e,t):(e=m(e,t),r=E(e),i=r[0],e=r[1],i&&(n=w(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return g(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:S(e)}}},i=function(e,t,n,i){var s,l,h,p,d,m=[],y=typeof n,E;i=i||e;if(y==="undefined"||y==="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(d=0;d<t.length;d+=1){p=o(t[d],i),l=p.f;if(l==="require")m[d]=u.require(e);else if(l==="exports")m[d]=u.exports(e),E=!0;else if(l==="module")s=m[d]=u.module(e);else if(v(a,l)||v(f,l)||v(c,l))m[d]=w(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,g(i,!0),b(l),{}),m[d]=a[l]}}h=n?n.apply(a[e],m):undefined;if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!E)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){if(typeof e=="string")return u[e]?u[e](t):w(o(e,t).f);if(!e.splice){l=e,l.deps&&s(l.deps,l.callback);if(!t)return;t.splice?(e=t,t=n,n=null):e=r}return t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s},s.config=function(e){return s(e)},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!v(a,e)&&!v(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("lib/almond/almond",function(){}),n("src/async",[],function(){function n(e){t(e)}var e=this,t;return e.setImmediate?t=e.setImmediate:e.process&&typeof e.process.nextTick=="function"?t=e.process.nextTick:t=function(t){e.setTimeout(t,0)},n.delay=function(t,n,r){e.setTimeout(t.apply.bind(t,this,r||[]),n)},n}),n("src/promise",["src/async"],function(e){function r(e,n){function o(e,t){return n.then(e,t)}function u(){return n.transition(t.resolved,this,arguments),s}function a(){return n.transition(t.rejected,this,arguments),s}if(this instanceof r==0)return new r(e,n);var s=this;n instanceof i==0&&(n=new i),o.constructor=r,o.stateManager=n,s.resolve=u,s.reject=a,s.then=o,s.promise={then:o,always:this.always,done:this.done,"catch":this.fail,fail:this.fail,notify:this.notify,state:this.state},s.promise.promise=s.promise,typeof e=="function"&&e.call(s,s.resolve,s.reject)}function i(e){this.state=t.pending,e&&e.state&&this.transition(e.state,e.context,e.value)}function s(e){this.promise=e||new r}var t={pending:0,always:1,resolved:2,rejected:3,notify:4},n=["pending","","resolved","rejected",""];return r.prototype.delay=function(t){var n=this;return new r(function(r,i){n.then(function(){e.delay(r.bind(this),t,arguments)},i.bind(this))})},r.prototype.always=function(n){return this.then.stateManager.enqueue(t.always,n),this.promise},r.prototype.done=function(n){return this.then.stateManager.enqueue(t.resolved,n),this.promise},r.prototype.fail=r.prototype.catch=function(n){return this.then.stateManager.enqueue(t.rejected,n),this.promise},r.prototype.notify=function(n){return this.then.stateManager.enqueue(t.notify,n),this.promise},r.prototype.state=function(){return n[this.then.stateManager.state]},r.prototype.isPending=function(){return this.then.stateManager.state===t.pending},r.prototype.isResolved=function(){return this.then.stateManager.state===t.resolved},r.prototype.isRejected=function(){return this.then.stateManager.state===t.resolved},r.defer=function(){return new r},r.reject=function(){return new r(null,new i({context:this,value:arguments,state:t.rejected}))},r.resolve=r.thenable=function(e){return e instanceof r?e:e&&typeof e.then=="function"?new r(e.then):new r(null,new i({context:this,value:arguments,state:t.resolved}))},r.delay=function(n){var i=Array.prototype.slice(arguments,1);return new r(function(t){e.delay(t.bind(this),n,i)})},i.prototype.enqueue=function(n,r,i){var s=this.state;s?s===n||t.always===n?i?r.apply(this.context,this.value):e(r.apply.bind(r,this.context,this.value)):t.notify===n&&(i?r.call(this.context,this.state,this.value):e(r.call.bind(r,this.context,this.state,this.value))):(this.queue||(this.queue=[])).push({state:n,cb:r})},i.prototype.transition=function(e,t,n,r){if(this.state)return;this.state=e,this.context=t,this.value=n;if(this.queue){var i=this.queue,s=i.length,o=0,u;this.queue=null;while(o<s)u=i[o++],this.enqueue(u.state,u.cb,r)}},i.prototype.then=function(e,n){e=typeof e=="function"?e:null,n=typeof n=="function"?n:null;if(!e&&this.state===t.resolved||!n&&this.state===t.rejected)return new r(null,this);var i=new s;return this.enqueue(t.notify,e||n?i.resolve(e,n):i.notify()),i.promise},s.prototype.resolve=function(e,n){var r=this;return function(s,o){var u=s===t.resolved?e||n:n||e;try{r.context=this,r.finalize(s,[u.apply(this,o)])}catch(a){r.promise.reject.call(r.context,a)}}},s.prototype.notify=function(){var e=this;return function(n,r){try{e.context=this,e.finalize(n,r)}catch(i){e.promise.reject.call(e.context,i)}}},s.prototype.chain=function(e){var t=this;return function(){try{t.resolved||(t.resolved=!0,t.context=this,t.finalize(e,arguments))}catch(r){t.promise.reject.call(t.context,r)}}},s.prototype.finalize=function(e,n){var i=n[0],o=i&&i.then,u=this.promise,a=this.context,f,l;if(i===this.promise)throw new TypeError("Resolution input must not be the promise being resolved");if(o&&o.constructor===r){o.stateManager.enqueue(t.notify,this.notify(),!0);return}l=typeof o=="function"?typeof i:null;if(l==="function"||l==="object")try{f=new s(u),o.call(i,f.chain(t.resolved),f.chain(t.rejected))}catch(c){f.resolved||u.reject.call(a,c)}else u.then.stateManager.transition(e,a,n,!0)},r.states=t,r}),n("src/all",["src/promise","src/async"],function(e,t){function n(e,t,n){return typeof e=="function"?e.apply(n,t||[]):e}function r(r){function a(){u--,u||s.resolve.call(o,i)}function f(e){return function(){i[e]=arguments.length===1?arguments[0]:arguments,a()}}function l(){var e,t,o;for(e=0,o=u;e<o;e++)t=r[e],t&&typeof t.then=="function"?t.then(f(e),s.reject):(i[e]=n(t),a())}r=r||[];var i=[],s=e.defer(),o=this,u=r.length;return r.length?(t(l),s):s.resolve(r)}return r}),n("src/when",["src/promise","src/all"],function(e,t){function n(){var n=this,r=arguments;return e(function(e,i){t.call(n,r).then(function(t){e.apply(n,t)},function(e){i.call(n,e)})})}return n}),n("src/spromise",["src/promise","src/async","src/when","src/all"],function(e,t,n,r){return e.async=t,e.when=n,e.all=r,e}),t("src/spromise")});
},{}],2:[function(require,module,exports){
(function() {
  "use strict";

  function Fetch() {
  }

  Fetch.prototype.fetch = function(/*name*/) {
    throw new TypeError("Not implemented");
  };

  module.exports = Fetch;
})();

},{}],3:[function(require,module,exports){
(function(root) {
  "use strict";

  var Promise = require('spromise'),
      Module  = require('./module');

  /**
   * Module importer.  Primary function is to load Module instances and resolving
   * their dependencies in order to make the Module fully consumable.
   */
  function Import(manager) {
    if (!manager) {
      throw new TypeError("Must provide a manager");
    }

    this.manager = manager;
    this.context = manager.context || {};

    if (!this.context.modules) {
      this.context.modules = {};
    }
  }

  /**
   * Import is the interface to load up a Module, fully resolving its dependencies,
   * and caching it to prevent the same module from being processed more than once.
   *
   * @param {Array<string> | string} names - module(s) to import
   *
   * @returns {Promise}
   */
  Import.prototype.import = function(names, options) {
    options = options || {};
    var importer = this,
        manager  = this.manager,
        context  = this.context;

    // Coerce string to array to simplify input processing
    if (typeof(names) === "string") {
      names = [names];
    }

    // This logic figures out if the module's dependencies need to be resolved and if
    // they also need to be downloaded.
    var deps = names.map(function(name) {
      // Search in the options passed in for the module being loaded.  This is how I
      // allow dependency injection to happen.
      if (options.modules && options.modules.hasOwnProperty(name)) {
        return options.modules[name];
      }
      else if (context.modules.hasOwnProperty(name)) {
        return context.modules[name];
      }

      // Workflow for loading a module that has not yet been loaded
      return (context.modules[name] = manager.load(name)
        .then(validate,               passThroughError)
        .then(dependencies(importer), passThroughError)
        .then(finalize(importer),     passThroughError)
        .then(cache(importer),        passThroughError));
    });

    return Promise.when.apply((void 0), deps).catch(function(error) {
      console.error("===> error", error);
    });
  };

  function passThroughError(error) {
    return error;
  }

  function validate(mod) {
    if (mod instanceof(Module) === false) {
      throw new TypeError("input must be an Instance of Module");
    }
    return mod;
  }

  /**
   * Loads up all dependencies for the modules
   *
   * @returns {Function} callback to call with the Module instance with the
   *   dependencies to be resolved
   */
  function dependencies(importer) {
    return function(mod) {
      // If the module has a property `code` that means the module has already
      // been fully resolved.
      if (!mod.deps.length || mod.hasOwnProperty("code")) {
        return mod;
      }

      return new Promise(function(resolve /*, reject*/) {
        importer.import(mod.deps).then(function() {
          resolve(mod, arguments);
        });
      });
    };
  }

  /**
   * Finalizes the module by calling the `factory` method with any dependencies
   *
   * @returns {Function} callback to call with the Module instance to finalize
   */
  function finalize() {
    return function(mod, deps) {
      if (mod.factory && !mod.hasOwnProperty("code")) {
        mod.code = mod.factory.apply(root, deps);
      }
      return mod;
    };
  }

  /**
   * Adds module to the context to cache it
   */
  function cache(importer) {
    return function(mod) {
      return (importer.context.modules[name] = mod.code);
    };
  }

  module.exports = Import;
})(typeof(window) !== 'undefined' ? window : this);

},{"./module":6,"spromise":1}],4:[function(require,module,exports){
(function() {
  "use strict";

  var Promise = require('spromise');

  /**
   * The purpose of Loader is to return full instances of Module.  Module instances
   * are stored in the context to avoid loading the same module multiple times.
   * If the module is loaded, then we just return that.  If it has not bee loaded yet,
   * then we:
   *
   * 1. Fetch its source; remote server, local file system... You must specify a fetch
   *      provider to define how source files are retrieved
   * 2. Transform the source that was fetched.  This step enables processing of the
   *      source before it is compiled into an instance of Module.
   * 3. Compile the source that was fetched and transformed into a proper instance
   *      of Module
   */
  function Loader(manager) {
    if (!manager) {
      throw new TypeError("Must provide a manager");
    }

    this.manager = manager;
    this.context = manager.context || {};

    if (!this.context.loaded) {
      this.context.loaded = {};
    }
  }

  /**
   * Handles the process of returning the instance of the Module if one exists, otherwise
   * the workflow for creating the instance is kicked off.
   *
   * The workflow is to take in a module name that needs to be loaded.  If a module with
   * the given name isn't loaded, then we fetch it.  The fetch call returns a promise, which
   * when resolved returns a moduleMeta. The moduleMeta is an intermediate object that contains
   * the module source from fetch and a compile method used for converting the source to an
   * instance of Module. The purporse for moduleMeta is to allows to process the raw source
   * with a tranformation pipeline before compiling it to the final product.  The transformation
   * pipeline allows us to do things like convert coffeescript to javascript.
   *
   * Primary workflow:
   * fetch     -> module name {string}
   * transform -> module meta {compile:fn, source:string}
   * compile   -> module meta {compile:fn, source:string}
   * Module: {deps:array, name:string}
   *
   * @param {string} name - The name of the module to load.
   */
  Loader.prototype.load = function(name) {
    var loader  = this,
        manager = this.manager,
        context = this.context;

    if (!name) {
      throw new TypeError("Must provide the name of the module to load");
    }

    // If the context does not have a module with the given name, then we go on to
    // fetch the source and put it through the workflow to create a Module instance.
    if (!context.loaded.hasOwnProperty(name)) {
      // This is where the workflow for fetching, transforming, and compiling happens.
      // It is designed to easily add more steps to the workflow.
      context.loaded[name] = manager.fetch(name)
        .then(validate,          passThroughError)
        .then(transform(loader), passThroughError)
        .then(compile(loader),   passThroughError);
    }

    return Promise.resolve(context.loaded[name]);
  };


  function passThroughError(error) {
    return error;
  }

  /**
   * Method to ensure we have a valid module meta object before we continue on with
   * the rest of the pipeline.
   */
  function validate(moduleMeta) {
    if (!moduleMeta) {
      throw new TypeError("Must provide a ModuleMeta");
    }

    if (!moduleMeta.compile) {
      throw new TypeError("ModuleMeta must provide have a `compile` interface");
    }

    return moduleMeta;
  }

  /**
   * The transform enables transformation providers to process the moduleMeta
   * before it is compiled into an actual Module instance.  This is where steps
   * such as linting and processing coffee files can take place.
   */
  function transform(/*loader*/) {
    return function(moduleMeta) {
      return moduleMeta;
    };
  }

  /**
   * The compile step is to convert the moduleMeta to an instance of Module. The
   * fetch provider is in charge of adding the compile interface in the moduleMeta
   * as that is the place with the most knowledge about how the module was loaded
   * from the server/local file system.
   */
  function compile(loader) {
    return function(moduleMeta) {
      var mod     = moduleMeta.compile(),
          modules = moduleMeta.loaded ? moduleMeta.loaded.modules : {};

      // Copy modules over to the loaded bucket if it does not exist. Anything
      // that has already been loaded will get ignored.
      for (var item in modules) {
        if (modules.hasOwnProperty(item) && !loader.context.loaded.hasOwnProperty(item)) {
          loader.context.loaded[item] = modules[item];
        }
      }

      mod.meta = moduleMeta;
      return (loader.context.loaded[mod.name] = mod);
    };
  }

  module.exports = Loader;
})(typeof(window) !== 'undefined' ? window : this);

},{"spromise":1}],5:[function(require,module,exports){
(function () {
  "use strict";

  var Promise  = require('spromise'),
      Utils    = require('./utils'),
      Import   = require('./import'),
      Loader   = require('./loader'),
      Module   = require('./module'),
      Registry = require('./registry'),
      Fetch    = require('./fetch');

  function MLoader() {
    this.middlewares = {};
    this.context     = Registry.getById();

    // Override any of these constructors if you need specialized implementation
    var providers = {
      fetch   : new MLoader.Fetch(this),
      loader  : new MLoader.Loader(this),
      import  : new MLoader.Import(this)
    };

    // Expose interfaces
    this.providers = providers;
    this.fetch     = providers.fetch.fetch.bind(providers.fetch);
    this.load      = providers.loader.load.bind(providers.loader);
    this.import    = providers.import.import.bind(providers.import);
  }

  MLoader.prototype.use = function(name, provider) {
    if (!provider || !provider.handler) {
      throw new TypeError("Must provide a providers with a `handler` interface");
    }

    var middleware = this.middlewares[name] || (this.middlewares[name] = []);

    if (typeof(provider) === "function") {
      provider = {handler: provider};
    }

    middleware.push(provider);
  };

  MLoader.prototype.run = function(name) {
    var middleware = this.middlewares[name],
        data = Array.prototype.slice.call(arguments, 1),
        result, i, length;

    if (!middleware) {
      return;
    }

    for (i = 0, length = middleware.legnth; i < length; i++) {
      result = middleware[i].handler.apply(middleware[i], data);

      if (result !== (void 0)) {
        return result;
      }
    }
  };

  MLoader.prototype.clear = function() {
    return Registry.clearById(this.context._id);
  };


  MLoader.prototype.Promise = Promise;
  MLoader.prototype.Module  = Module;
  MLoader.prototype.Utils   = Utils;

  // Expose constructors and utilities
  MLoader.Promise  = Promise;
  MLoader.Utils    = Utils;
  MLoader.Registry = Registry;
  MLoader.Loader   = Loader;
  MLoader.Import   = Import;
  MLoader.Module   = Module;
  MLoader.Fetch    = Fetch;
  module.exports   = MLoader;
})();

},{"./fetch":2,"./import":3,"./loader":4,"./module":6,"./registry":7,"./utils":8,"spromise":1}],6:[function(require,module,exports){
(function() {
  "use strict";

  var Utils = require('./utils');

  var Type = {
    "AMD" : "AMD", //Asynchronous Module Definition
    "CJS" : "CJS", //CommonJS
    "IEFF": "IEFF" //Immediately Executed Factory Function
  };

  function Module(options) {
    if (!options) {
      throw new TypeError("Must provide options to create the module");
    }

    if (!Type[options.type]) {
      throw new TypeError("Must provide a valid module type. E.g. 'AMD', 'CJS', 'IEFF'.");
    }

    if (options.hasOwnProperty("code")) {
      this.code = options.code;
    }

    if (options.hasOwnProperty("factory")) {
      this.factory = options.factory;
    }

    this.type     = options.type;
    this.name     = options.name;
    this.deps     = options.deps ? options.deps.slice(0) : [];
    this.settings = Utils.merge({}, options);
  }

  Module.Type = Type;
  module.exports = Module;
})();

},{"./utils":8}],7:[function(require,module,exports){
(function() {
  "use strict";

  var storage = {};

  function Registry() {
  }

  Registry.getById = function(id) {
    if (!id) {
      id = (new Date()).getTime().toString();
    }

    return storage[id] || (storage[id] = {
      _id       : id,
      loaded    : {},
      modules   : {},
    });
  };

  Registry.clearById = function(id) {
    var _item;
    if (storage.hasOwnProperty(id)) {
      _item = storage[id];
      delete storage[id];
    }
    return _item;
  };

  module.exports = Registry;
})();

},{}],8:[function(require,module,exports){
(function() {
  "use strict";

  function noop() {}

  function isNull(item) {
    return item === null || item === undefined;
  }

  function isArray(item) {
    return item instanceof(Array);
  }

  function isObject(item) {
    return typeof(item) === "object";
  }

  function isPlainObject(item) {
    return !!(item && (item).toString() === "[object Object]");
  }

  function isFunction(item) {
    return !isNull(item) && item.constructor === Function;
  }

  function isDate(item) {
    return item instanceof(Date);
  }

  function result(input, args, context) {
    if (isFunction(input) === "function") {
      return input.apply(context, args||[]);
    }
    return input[args];
  }

  /**
   * Copies all properties from sources into target
   */
  function extend(target) {
    var source, length, i;
    var sources = Array.prototype.slice.call(arguments, 1);
    target = target || {};

    // Allow n params to be passed in to extend this object
    for (i = 0, length  = sources.length; i < length; i++) {
      source = sources[i];
      for (var property in source) {
        if (source.hasOwnProperty(property)) {
          target[property] = source[property];
        }
      }
    }

    return target;
  }

  /**
   * Deep copy of all properties insrouces into target
   */
  function merge(target) {
    var source, length, i;
    var sources = Array.prototype.slice.call(arguments, 1);
    target = target || {};

    // Allow `n` params to be passed in to extend this object
    for (i = 0, length  = sources.length; i < length; i++) {
      source = sources[i];
      for (var property in source) {
        if (source.hasOwnProperty(property)) {
          if (isPlainObject(source[property])) {
            target[property] = merge(target[property], source[property]);
          }
          else {
            target[property] = source[property];
          }
        }
      }
    }

    return target;
  }

  module.exports = {
    isNull: isNull,
    isArray: isArray,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isFunction: isFunction,
    isDate: isDate,
    noop: noop,
    result: result,
    extend: extend,
    merge: merge
  };
})();

},{}]},{},[5])(5)
});
},{"./fetch":undefined,"./import":undefined,"./loader":undefined,"./module":undefined,"./registry":undefined,"./utils":undefined,"spromise":undefined}],3:[function(require,module,exports){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.promjax=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/spromise
 */

/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */

(function(e,t){typeof require=="function"&&typeof exports=="object"&&typeof module=="object"?module.exports=t():typeof define=="function"&&define.amd?define(t):e.spromise=t()})(this,function(){var e,t;return function(){function i(e){return typeof e.factory=="function"?t(e.deps,e.factory):e.factory}function s(e,t){var n,s,o,u,a=[];for(n=0,s=e.length;n<s;n++){o=e[n],u=r[o]||t[o];if(!u)throw new TypeError("Module "+o+" has not yet been loaded");r[o]?(u.hasOwnProperty("code")||(u.code=i(u)),a[n]=u.code):a[n]=u}return a}var n=this,r={};t=function o(e,t){var i,u,a={};return a.require=o,a.exports={},a.module={exports:a.exports},typeof e=="string"&&(i=e,e=[e]),e.length&&(e=s(e.slice(0),a)),typeof t=="function"?u=t.apply(n,e):u=r[i]?r[i].code:t,u===void 0?a.module.exports:u},e=function(t,n,i){r[t]={name:t,deps:n,factory:i}}}.call(this),e("src/samdy",function(){}),e("src/async",["require","exports","module"],function(e,t,n){function i(e){r(e)}var r;i.delay=function(e,t,n){setTimeout(e.apply.bind(e,this,n||[]),t)},typeof process=="object"&&typeof process.nextTick=="function"?r=process.nextTick:typeof setImmediate=="function"?r=setImmediate:r=function(e){setTimeout(e,0)},i.nextTick=r,n.exports=i}),e("src/promise",["require","exports","module","src/async"],function(e,t,n){function o(e,t){t=t||new u;var n=this;n.then=function(e,n){return t.then(e,n)},n.resolve=function(){return t.transition(i.resolved,arguments,this),n},n.reject=function(){return t.transition(i.rejected,arguments,this),n},n.promise={then:n.then,always:n.always,done:n.done,"catch":n.fail,fail:n.fail,notify:n.notify,state:n.state,constructor:o},n.promise.promise=n.promise,n.then.stateManager=t,e&&e.call(n,n.resolve,n.reject)}function u(e){this.state=i.pending,e&&e.state&&this.transition(e.state,e.value,e.context)}function a(e){this.promise=e.promise}function l(e){c.debug&&(console.error(e),e&&e.stack&&console.log(e.stack))}function c(e){return new o(e)}var r=e("src/async"),i={pending:0,resolved:1,rejected:2,always:3,notify:4},s=["pending","resolved","rejected"];o.prototype.done=function(e){return this.then.stateManager.enqueue(i.resolved,e),this.promise},o.prototype.catch=o.prototype.fail=function(e){return this.then.stateManager.enqueue(i.rejected,e),this.promise},o.prototype.finally=o.prototype.always=function(e){return this.then.stateManager.enqueue(i.always,e),this.promise},o.prototype.notify=function(e){return this.then.stateManager.enqueue(i.notify,e),this.promise},o.prototype.state=function(){return s[this.then.stateManager.state]},o.prototype.isPending=function(){return this.then.stateManager.state===i.pending},o.prototype.isResolved=function(){return this.then.stateManager.state===i.resolved},o.prototype.isRejected=function(){return this.then.stateManager.state===i.resolved},o.prototype.delay=function(t){var n=this;return new o(function(e,i){n.then(function(){r.delay(e.bind(this),t,arguments)},i.bind(this))})},u.prototype.enqueue=function(e,t){function r(){n.state===e||i.always===e?t.apply(n.context,n.value):i.notify===e&&t.call(n.context,n.state,n.value)}this.state?f.asyncTask(r):(this.queue||(this.queue=[])).push(r);var n=this},u.prototype.transition=function(e,t,n){if(this.state)return;this.state=e,this.context=n,this.value=t;var r=this.queue;r&&(this.queue=null,f.asyncQueue(r))},u.prototype.then=function(e,t){var n=this;e=e&&typeof e=="function"?e:null,t=t&&typeof t=="function"?t:null;if(!e&&n.state===i.resolved||!t&&n.state===i.rejected)return new o(null,n);var r=new o;return n.enqueue(i.notify,function(s,o){var f=s===i.resolved?e||t:t||e;f&&(o=u.runHandler(s,o,this,r,f)),o!==!1&&(new a({promise:r})).finalize(s,o,this)}),r},u.runHandler=function(e,t,n,r,i){try{t=i.apply(n,t)}catch(s){return l(s),r.reject.call(n,s),!1}return t===undefined?[]:[t]},a.prototype.finalize=function(e,t,n){var r=this,s=this.promise,u,a;if(t.length){u=t[0];if(u===s)a=s.reject.call(n,new TypeError("Resolution input must not be the promise being resolved"));else if(u&&u.constructor===o)a=u.notify(function(t,n){r.finalize(t,n,this)});else if(u!==undefined&&u!==null)switch(typeof u){case"object":case"function":a=this.runThenable(u,n)}}a||(e===i.resolved?s.resolve.apply(n,t):s.reject.apply(n,t))},a.prototype.runThenable=function(e,t){var n=this,r=!1;try{var s=e.then;if(typeof s=="function")return s.call(e,function(){r||(r=!0,n.finalize(i.resolved,arguments,this))},function(){r||(r=!0,n.promise.reject.apply(this,arguments))}),!0}catch(o){return r||n.promise.reject.call(t,o),!0}return!1};var f={_asyncQueue:[],asyncTask:function(e){f._asyncQueue.push(e)===1&&r(f.taskRunner(f._asyncQueue))},asyncQueue:function(e){e.length===1?f.asyncTask(e[0]):f.asyncTask(f.taskRunner(e))},taskRunner:function(e){return function(){var n;while(n=e[0])f._runTask(n),e.shift()}},_runTask:function(e){try{e()}catch(t){l(t)}}};c.prototype=o.prototype,c.defer=function(){return new o},c.reject=function(){return new o(null,new u({context:this,value:arguments,state:i.rejected}))},c.resolve=c.thenable=function(e){if(e){if(e.constructor===o)return e;if(typeof e.then=="function")return new o(e.then)}return new o(null,new u({context:this,value:arguments,state:i.resolved}))},c.delay=function(t){var n=Array.prototype.slice(arguments,1);return new o(function(e){r.delay(e.bind(this),t,n)})},c.states=i,c.debug=!1,n.exports=c}),e("src/all",["require","exports","module","src/promise","src/async"],function(e,t,n){function s(e,t,n){return typeof e=="function"?e.apply(n,t||[]):e}function o(e){function a(){u--,u||n.resolve.call(o,t)}function f(e){return function(){t[e]=arguments.length===1?arguments[0]:arguments,a()}}function l(){var r,i,o;for(r=0,o=u;r<o;r++)i=e[r],i&&typeof i.then=="function"?i.then(f(r),n.reject):(t[r]=s(i),a())}e=e||[];var t=[],n=r.defer(),o=this,u=e.length;return e.length?(i(l),n):n.resolve(e)}var r=e("src/promise"),i=e("src/async");n.exports=o}),e("src/when",["require","exports","module","src/promise","src/all"],function(e,t,n){function s(){var e=this,t=arguments;return new r(function(n,r){i.call(e,t).then(function(t){n.apply(e,t)},function(t){r.call(e,t)})})}var r=e("src/promise"),i=e("src/all");n.exports=s}),e("src/race",["require","exports","module","src/promise"],function(e,t,n){function i(e){return e?new r(function(t,n){function o(){s||(s=!0,t.apply(this,arguments))}function u(){s||(s=!0,n.apply(this,arguments))}var r,i,s=!1;for(r=0,i=e.length;r<i;r++)e[r].then(o,u)}):r.resolve()}var r=e("src/promise");n.exports=i}),e("src/spromise",["require","exports","module","src/promise","src/async","src/when","src/all","src/race"],function(e,t,n){var r=e("src/promise");r.aync=e("src/async"),r.when=e("src/when"),r.all=e("src/all"),r.race=e("src/race"),n.exports=r}),t("src/spromise")});
},{}],2:[function(require,module,exports){
/**
 * Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */

(function() {
  "use strict";

  var Promise = require('spromise');

  var readyStates = {
    UNSENT           : 0, // open()has not been called yet.
    OPENED           : 1, // send()has not been called yet.
    HEADERS_RECEIVED : 2, // send() has been called, and headers and status are available.
    LOADING          : 3, // Downloading; responseText holds partial data.
    DONE             : 4  // The operation is complete.
  };

  function Ajax(options) {
    if (typeof(options) === "string") {
      options = {url: options};
    }

    var deferred = Promise.defer();
    var request  = new XMLHttpRequest(),
        url      = options.url,
        method   = options.method  || "GET",
        async    = options.async   || true,
        data     = options.data    || null,
        headers  = options.headers || {};

    if (!url) {
      throw new TypeError("Must provide a URL");
    }

    for (var header in headers) {
      if (headers.hasOwnProperty(header)) {
        request.setRequestHeader(header, headers[header]);
      }
    }

    if (async) {
      request.onreadystatechange = StateChanged.bind(request, options, deferred);
    }

    // Send request
    request.open(method, url, async, options.user, options.password);
    request.send(data);

    if (!async) {
      StateChanged.call(request, options, deferred);
    }

    return deferred.promise;
  }

  function StateChanged(options, deferred) {
    var request = this,
        state   = request.readyState;

    if (state === readyStates.DONE) {
      if (request.status === 200) {
        var result = (options.transform || transform)(request.responseText, options.responseType);
        deferred.resolve(result, request);
      }
      else {
        deferred.reject(request);
      }
    }
  }

  function transform(text, type) {
    if (type === 'json') {
      return JSON.parse(text);
    }

    return text;
  }

  module.exports = Ajax;
})();

},{"spromise":1}]},{},[2])(2)
});
},{"spromise":4}],4:[function(require,module,exports){
/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 *
 * https://github.com/MiguelCastillo/spromise
 */

/**
 * spromise Copyright (c) 2014 Miguel Castillo.
 * Licensed under MIT
 */

(function(e,t){typeof require=="function"&&typeof exports=="object"&&typeof module=="object"?module.exports=t():typeof define=="function"&&define.amd?define(t):e.spromise=t()})(this,function(){var e,t;return function(){function i(e){return typeof e.factory=="function"?t(e.deps,e.factory):e.factory}function s(e,t){var n,s,o,u,a=[];for(n=0,s=e.length;n<s;n++){o=e[n],u=r[o]||t[o];if(!u)throw new TypeError("Module "+o+" has not yet been loaded");r[o]?(u.hasOwnProperty("code")||(u.code=i(u)),a[n]=u.code):a[n]=u}return a}var n=this,r={};t=function o(e,t){var i,u,a={};return a.require=o,a.exports={},a.module={exports:a.exports},typeof e=="string"&&(i=e,e=[e]),e.length&&(e=s(e.slice(0),a)),typeof t=="function"?u=t.apply(n,e):u=r[i]?r[i].code:t,u===void 0?a.module.exports:u},e=function(t,n,i){r[t]={name:t,deps:n,factory:i}}}.call(this),e("src/samdy",function(){}),e("src/async",["require","exports","module"],function(e,t,n){function i(e){r(e)}var r;i.delay=function(e,t,n){setTimeout(e.apply.bind(e,this,n||[]),t)},typeof process=="object"&&typeof process.nextTick=="function"?r=process.nextTick:typeof setImmediate=="function"?r=setImmediate:r=function(e){setTimeout(e,0)},i.nextTick=r,n.exports=i}),e("src/promise",["require","exports","module","src/async"],function(e,t,n){function o(e,t){t=t||new u;var n=this;n.then=function(e,n){return t.then(e,n)},n.resolve=function(){return t.transition(i.resolved,arguments,this),n},n.reject=function(){return t.transition(i.rejected,arguments,this),n},n.promise={then:n.then,always:n.always,done:n.done,"catch":n.fail,fail:n.fail,notify:n.notify,state:n.state,constructor:o},n.promise.promise=n.promise,n.then.stateManager=t,e&&e.call(n,n.resolve,n.reject)}function u(e){this.state=i.pending,e&&e.state&&this.transition(e.state,e.value,e.context)}function a(e){this.promise=e.promise}function l(e){c.debug&&(console.error(e),e&&e.stack&&console.log(e.stack))}function c(e){return new o(e)}var r=e("src/async"),i={pending:0,resolved:1,rejected:2,always:3,notify:4},s=["pending","resolved","rejected"];o.prototype.done=function(e){return this.then.stateManager.enqueue(i.resolved,e),this.promise},o.prototype.catch=o.prototype.fail=function(e){return this.then.stateManager.enqueue(i.rejected,e),this.promise},o.prototype.finally=o.prototype.always=function(e){return this.then.stateManager.enqueue(i.always,e),this.promise},o.prototype.notify=function(e){return this.then.stateManager.enqueue(i.notify,e),this.promise},o.prototype.state=function(){return s[this.then.stateManager.state]},o.prototype.isPending=function(){return this.then.stateManager.state===i.pending},o.prototype.isResolved=function(){return this.then.stateManager.state===i.resolved},o.prototype.isRejected=function(){return this.then.stateManager.state===i.resolved},o.prototype.delay=function(t){var n=this;return new o(function(e,i){n.then(function(){r.delay(e.bind(this),t,arguments)},i.bind(this))})},u.prototype.enqueue=function(e,t){function r(){n.state===e||i.always===e?t.apply(n.context,n.value):i.notify===e&&t.call(n.context,n.state,n.value)}this.state?f.asyncTask(r):(this.queue||(this.queue=[])).push(r);var n=this},u.prototype.transition=function(e,t,n){if(this.state)return;this.state=e,this.context=n,this.value=t;var r=this.queue;r&&(this.queue=null,f.asyncQueue(r))},u.prototype.then=function(e,t){var n=this;e=e&&typeof e=="function"?e:null,t=t&&typeof t=="function"?t:null;if(!e&&n.state===i.resolved||!t&&n.state===i.rejected)return new o(null,n);var r=new o;return n.enqueue(i.notify,function(s,o){var f=s===i.resolved?e||t:t||e;f&&(o=u.runHandler(s,o,this,r,f)),o!==!1&&(new a({promise:r})).finalize(s,o,this)}),r},u.runHandler=function(e,t,n,r,i){try{t=i.apply(n,t)}catch(s){return l(s),r.reject.call(n,s),!1}return t===undefined?[]:[t]},a.prototype.finalize=function(e,t,n){var r=this,s=this.promise,u,a;if(t.length){u=t[0];if(u===s)a=s.reject.call(n,new TypeError("Resolution input must not be the promise being resolved"));else if(u&&u.constructor===o)a=u.notify(function(t,n){r.finalize(t,n,this)});else if(u!==undefined&&u!==null)switch(typeof u){case"object":case"function":a=this.runThenable(u,n)}}a||(e===i.resolved?s.resolve.apply(n,t):s.reject.apply(n,t))},a.prototype.runThenable=function(e,t){var n=this,r=!1;try{var s=e.then;if(typeof s=="function")return s.call(e,function(){r||(r=!0,n.finalize(i.resolved,arguments,this))},function(){r||(r=!0,n.promise.reject.apply(this,arguments))}),!0}catch(o){return r||n.promise.reject.call(t,o),!0}return!1};var f={_asyncQueue:[],asyncTask:function(e){f._asyncQueue.push(e)===1&&r(f.taskRunner(f._asyncQueue))},asyncQueue:function(e){e.length===1?f.asyncTask(e[0]):f.asyncTask(f.taskRunner(e))},taskRunner:function(e){return function(){var n;while(n=e[0])f._runTask(n),e.shift()}},_runTask:function(e){try{e()}catch(t){l(t)}}};c.prototype=o.prototype,c.defer=function(){return new o},c.reject=function(){return new o(null,new u({context:this,value:arguments,state:i.rejected}))},c.resolve=c.thenable=function(e){if(e){if(e.constructor===o)return e;if(typeof e.then=="function")return new o(e.then)}return new o(null,new u({context:this,value:arguments,state:i.resolved}))},c.delay=function(t){var n=Array.prototype.slice(arguments,1);return new o(function(e){r.delay(e.bind(this),t,n)})},c.states=i,c.debug=!1,n.exports=c}),e("src/all",["require","exports","module","src/promise","src/async"],function(e,t,n){function s(e,t,n){return typeof e=="function"?e.apply(n,t||[]):e}function o(e){function a(){u--,u||n.resolve.call(o,t)}function f(e){return function(){t[e]=arguments.length===1?arguments[0]:arguments,a()}}function l(){var r,i,o;for(r=0,o=u;r<o;r++)i=e[r],i&&typeof i.then=="function"?i.then(f(r),n.reject):(t[r]=s(i),a())}e=e||[];var t=[],n=r.defer(),o=this,u=e.length;return e.length?(i(l),n):n.resolve(e)}var r=e("src/promise"),i=e("src/async");n.exports=o}),e("src/when",["require","exports","module","src/promise","src/all"],function(e,t,n){function s(){var e=this,t=arguments;return new r(function(n,r){i.call(e,t).then(function(t){n.apply(e,t)},function(t){r.call(e,t)})})}var r=e("src/promise"),i=e("src/all");n.exports=s}),e("src/race",["require","exports","module","src/promise"],function(e,t,n){function i(e){return e?new r(function(t,n){function o(){s||(s=!0,t.apply(this,arguments))}function u(){s||(s=!0,n.apply(this,arguments))}var r,i,s=!1;for(r=0,i=e.length;r<i;r++)e[r].then(o,u)}):r.resolve()}var r=e("src/promise");n.exports=i}),e("src/spromise",["require","exports","module","src/promise","src/async","src/when","src/all","src/race"],function(e,t,n){var r=e("src/promise");r.aync=e("src/async"),r.when=e("src/when"),r.all=e("src/all"),r.race=e("src/race"),n.exports=r}),t("src/spromise")});
},{}],5:[function(require,module,exports){
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

},{"./define":6,"./fetchxhr":7,"./require":8,"mloader":2}],6:[function(require,module,exports){
(function(root) {
  "use strict";

  function Define(manager) {
    this.manager = manager;
  }

  /**
   * Defines a module to be loaded and consumed by other modules.  Two types of
   * modules come through here, named and anonymous.
   */
  Define.prototype.define = function () {
    var mod     = Define.adapters.apply(this, arguments),
        context = Define.getGlobalModule();

    if (mod.name) {
      // Do no allow modules to override other modules...
      if (context.modules.hasOwnProperty(mod.name)) {
        throw new Error("Module " + mod.name + " is already defined");
      }
      else {
        context.modules[mod.name] = mod;
      }
    }
    else {
      context.anonymous.push(mod);
    }
  };

  /**
   * Adapter interfaces to define modules
   */
  Define.adapters = function (name, deps, factory) {
    var signature = ["", typeof name, typeof deps, typeof factory].join("/");
    var adapter   = Define.adapters[signature];

    if (!adapter) {
      throw new TypeError("Module define signature isn't valid: " + signature);
    }

    return adapter.apply(this, arguments);
  };

  Define.adapters.create = function (name, deps, factory) {
    var manager = this.manager;

    var mod = {
      type: manager.Module.Type.AMD,
      cjs: [],
      name: name,
      deps: deps
    };

    if (typeof(factory) === "function") {
      mod.factory = factory;
      mod.source  = factory.toString();
    }
    else {
      mod.code = factory;
    }

    return new manager.Module(mod);
  };

  Define.adapters["/string/object/function"]        = function (name, deps, factory) { return Define.adapters.create.call(this, name, deps, factory); };
  Define.adapters["/string/function/undefined"]     = function (name, factory)       { return Define.adapters.create.call(this, name, [], factory); };
  Define.adapters["/object/function/undefined"]     = function (deps, factory)       { return Define.adapters.create.call(this, undefined, deps, factory); };
  Define.adapters["/object/undefined/undefined"]    = function (data)                { return Define.adapters.create.call(this, undefined, [], data); };
  Define.adapters["/string/object/undefined"]       = Define.adapters["/string/function/undefined"];
  Define.adapters["/function/undefined/undefined"]  = Define.adapters["/object/undefined/undefined"];
  Define.adapters["/string/undefined/undefined"]    = Define.adapters["/object/undefined/undefined"];
  Define.adapters["/number/undefined/undefined"]    = Define.adapters["/object/undefined/undefined"];
  Define.adapters["/undefined/undefined/undefined"] = Define.adapters["/object/undefined/undefined"];

  Define.getGlobalModule = function() {
    if (!root.DefineGlobalModule) {
      root.DefineGlobalModule = {
        modules: {},
        anonymous: []
      };
    }

    return root.DefineGlobalModule;
  };

  Define.clearGlobalModule = function() {
    var _module = root.DefineGlobalModule;
    root.DefineGlobalModule = null;
    return _module;
  };

  Define.compile = function(moduleMeta) {
    var loaded  = moduleMeta.loaded,
        modules = loaded.modules,
        mod     = modules[moduleMeta.name];

    // Check if the module was loaded as a named module or an anonymous module.
    // If it was loaded as an anonymous module, then we need to manually add it
    // the list of named modules
    if (!mod && loaded.anonymous && loaded.anonymous.length) {
      mod      = loaded.anonymous.shift();
      mod.name = moduleMeta.name;

      // Make module available as pending resolution so that it can be loaded
      // whenever it is requested as dependency.
      modules[mod.name] = mod;
    }

    return modules[mod.name];
  };

  module.exports = Define;
})(typeof(window) !== 'undefined' ? window : this);

},{}],7:[function(require,module,exports){
(function() {
  "use strict";

  var Ajax     = require('promjax'),
      Resolver = require('amd-resolver'),
      Define   = require('./define');

  function Fetcher(options) {
    this.resolver = new Resolver(options);
  }

  Fetcher.prototype.fetch = function(name) {
    var moduleMeta = this.resolver.resolve(name),
        _url       = moduleMeta.file.toUrl();

    return (new Ajax(_url)).then(function(source) {
      moduleMeta.source  = source;
      moduleMeta.compile = function() {
        var __header = "",
            __footer = "",
            __module = {exports: {}};

        //__header += "'use strict';"; // Make this optional
        //__header += "debugger;";     // Make this optional
        __footer += ";//# sourceURL=" + _url;

        /* jshint -W061, -W054 */
        (new Function("module", __header + source + __footer))(__module);
        //(new Function("module", "exports", __header + source + __footer))(__module, __module.exports);
        /* jshint +W061, +W054 */

        moduleMeta.loaded = Define.clearGlobalModule();
        return Define.compile(moduleMeta);
      };

      return moduleMeta;
    });
  };

  module.exports = Fetcher;
})();

},{"./define":6,"amd-resolver":1,"promjax":3}],8:[function(require,module,exports){
(function() {
  "use script";

  function Require(manager) {
    this.manager = manager;
    this.context = manager.context;
  }

  Require.prototype.require = function(name, ready, options) {
    var manager = this.manager,
        context = this.context;

    if (context.modules.hasOwnProperty(name)) {
      return context.modules[name];
    }
    else {
      return manager.import(name, options).done(ready || manager.Utils.noop);
    }
  };

  module.exports = Require;
})();

},{}]},{},[5])(5)
});