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
        context = Define.getGlobalDefinitions();

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
      name: name,
      deps: deps
    };

    if (typeof(factory) === "function") {
      mod.factory = factory;
    }
    else {
      mod.code = factory;
    }

    return new manager.Module(mod);
  };


  Define.getGlobalDefinitions = function() {
    if (!root.__globalDefinitions) {
      root.__globalDefinitions = {
        modules: {},
        anonymous: []
      };
    }

    return root.__globalDefinitions;
  };


  Define.clearGlobalDefinitions = function() {
    var definitions = root.__globalDefinitions;
    delete root.__globalDefinitions;
    return definitions;
  };


  Define.compileDefinitions = function(moduleMeta, definitions) {
    definitions = definitions;

    if (!definitions) {
      return;
    }

    var anonymous = definitions.anonymous,
        modules   = definitions.modules,
        mod       = modules[moduleMeta.name];

    if (!mod && anonymous.length) {
      mod      = anonymous.shift();
      mod.name = moduleMeta.name;
      modules[mod.name] = mod;
    }

    mod.modules = modules;
    return mod;
  };


  /**
   * This is a table for quickly detecting the signature that `define` was called
   * with.  This is just a much more direct execution path than building blocks
   * of if statements.
   */
  Define.adapters["/string/object/function"]        = function (name, deps, factory) { return Define.adapters.create.call(this, name, deps, factory); };
  Define.adapters["/string/function/undefined"]     = function (name, factory)       { return Define.adapters.create.call(this, name, [], factory); };
  Define.adapters["/object/function/undefined"]     = function (deps, factory)       { return Define.adapters.create.call(this, undefined, deps, factory); };
  Define.adapters["/object/undefined/undefined"]    = function (data)                { return Define.adapters.create.call(this, undefined, [], data); };
  Define.adapters["/string/object/undefined"]       = Define.adapters["/string/function/undefined"];
  Define.adapters["/function/undefined/undefined"]  = Define.adapters["/object/undefined/undefined"];
  Define.adapters["/string/undefined/undefined"]    = Define.adapters["/object/undefined/undefined"];
  Define.adapters["/number/undefined/undefined"]    = Define.adapters["/object/undefined/undefined"];
  Define.adapters["/undefined/undefined/undefined"] = Define.adapters["/object/undefined/undefined"];

  module.exports = Define;
})(typeof(window) !== 'undefined' ? window : this);
