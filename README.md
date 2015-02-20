bit-imports
==========

[![Build Status](https://travis-ci.org/MiguelCastillo/bit-imports.svg)](https://travis-ci.org/MiguelCastillo/bit-imports)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MiguelCastillo/bit-imports?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Module loader and dependency management with support for CJS and AMD.

bit imports supports loading module with CJS and AMD format in the browser. Because it is built on top of [bit loader](https://github.com/MiguelCastillo/bit-loader), you get a full transformation workflow. Bit imports also uses [amd resolver](https://github.com/MiguelCastillo/amd-resolver) as the configuration provider, which is modeled after [requirejs](http://requirejs.org/docs/api.html#config) settings that are familiar.

bit imports implements an XHR fetch provider that adds `# sourceURL` to integrate with debugging capabilities in all major browsers. The plan is to have logic to detect if bit imports is running in the browser or in nodejs so that files can be loaded transparently regardless of environment.  Why would we want to do that?  Primarily because bit imports gives you access to the full transformation workflow from bit loader so that you can do fancy things like runtime transformation of ES6 or CoffeeScript in the browser and in nodejs.

So why does bit imports even exist?  Bottom line is to eliminate the *build* step during the development cycles requied for tools like *browserify* and such.

bit imports also exposes two core methods for loading modules; `register` and `import`.  These interfaces allows you to handle dynamic module loading if you really want to get down to low level interface.
