(function() {
  "use strict";

  var Promise  = require("spromise"),
      Resolver = require('amd-resolver'),
      Define   = require("./define");

  function Fetcher(options) {
    this.resolver = new Resolver(options);
  }

  Fetcher.prototype.fetch = function(name) {
    var moduleMeta = this.resolver.resolve(name);
    var deferred   = Promise.defer();
    var head       = document.getElementsByTagName("head")[0] || document.documentElement;
    var script     = document.createElement("script");
    var _url       = moduleMeta.file.toUrl();

    if (moduleMeta.urlArgs) {
      _url += "?" + moduleMeta.urlArgs;
    }

    script.setAttribute("async",   "true");
    script.setAttribute("charset", "utf-8");
    script.setAttribute("type",    "text/javascript");
    script.setAttribute("src",     _url);

    //
    // Code for detecting when the script is done loading was extracted from:
    // http://stackoverflow.com/questions/4845762/onload-handler-for-script-tag-in-internet-explorer
    // http://stevesouders.com/efws/script-onload.php
    //

    // Handle Script loading
    var done = false;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
      if (!done && (!this.readyState ||
            this.readyState === "loaded" ||
            this.readyState === "complete")) {

        // We are done...
        done = true;

        // Collect module information and clear it from the registry.
        moduleMeta.loaded  = Define.clearGlobalModule();
        moduleMeta.compile = function() {
          return Define.compile(moduleMeta);
        };

        // Resolve with emtpty string so that moduleMeta can be processed
        deferred.resolve(moduleMeta);

        // Handle memory leak in IE
        script.onload = script.onreadystatechange = null;
        if (head && script.parentNode) {
          head.removeChild(script);
        }
      }
    };

    head.appendChild(script);
    return deferred.promise;
  };

  module.exports = Fetcher;
})();
