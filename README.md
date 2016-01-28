
<img src="img/bit-imports_white.png" width="100%"></img>

[![Build Status](https://travis-ci.org/MiguelCastillo/bit-imports.svg)](https://travis-ci.org/MiguelCastillo/bit-imports)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MiguelCastillo/bit-imports?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Stories in Ready](https://badge.waffle.io/MiguelCastillo/bit-imports.png?label=ready&title=Ready)](https://waffle.io/MiguelCastillo/bit-imports)

> module loader for the browser

System.import and CJS dependencies in the browser. And because it is built on top of [bit-loader](https://github.com/MiguelCastillo/bit-loader), you get a flexible and powerful plugin system that let's you tap into the power of tools like [babel](http://babeljs.io/) - right in the browser - with no bundling tools.

### Motivation

> A workflow that works really well is one in which your web application does not have an out of band build step during development, and all external dependencies consumed by your application are prebundled with bit-bundler, browserify, or similar tool. The key is in the separation of what is application code vs external dependencies. Your code vs someone else's code. Your application needs to load dependencies without needing an out of band build step for every change. Only when the application is ready for deployment are you encouraged to bundle your application up.


### Install
```
$ npm install bit-imports
```

### Usage

#### index.html

Include `bit-imports` to load `bitimports` in the globa object. Load `config.js` to setup your `bit-imports` instance.

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="text/javascript" src="node_modules/bit-imports/dist/bit-imports.min.js" defer></script>
    <script type="text/javascript" src="config.js" defer></script>
  </head>
</html>
```

#### config.js

Configure babel via [babel-bits](https://github.com/MiguelCastillo/babel-bits).

``` javascript
var System = bitimports
  // Configure bitimports
  .config({
    paths: {
      babel: "node_modules/babel-bits/dist/index.min"
    }
  })
  // Setup js pipeline with babel-bits
  .plugin("js", {
    match: { path: /\.(js)$/ },
    transform: {
      handler: "babel",
      options: {
        sourceMap: "inline",
        presets: ["es2015"]
      }
    }
  });

// Import "main" module.
System.import("main");
```

### API

[Full API documentation](./api)

#### bitimports
- Global instance of `bit-imports`

#### config( object ) : bit-imports
- Method to configure `bit-imports`. This method creates and returns a new instance of `bit-imports`.

#### plugin( plugin-name?, options? ) : bit-imports
- Method to configure plugins. `plugin-name` is optional unless you intend to configure the same plugin multiple times.

#### import( name | url ) : Promise
- Method to load modules and return the module exports.

#### load( name ) : Promise
- Method to load modules and return the module instances.

#### register( name, exports ) : bit-imports
- Method to register module exports to the internal cache.

#### ignore( names ) : bit-imports
- Method to exclude modules from the transform and dependency pipelines.

#### trasform( source ) : Promise
- Method to push source code through the transform pipeline.

#### resolve( name ) : Promise
- Method to get the full path for a module.

#### getModule( id ) : Module
- Method to get a module instance from the internal cachce. If module isn't loaded, an exception is raised.

#### deleteModule( id ) : Module
- Method to delete a module instance from the internal cache. If module isn't loaded, an exception is raised.

#### hasModule( id ) : boolean
- Method to check if a module is loaded into the cache.

#### clear() : bit-imports
- Method to delete all the modules from the internal cache.


### License

Licensed under MIT
