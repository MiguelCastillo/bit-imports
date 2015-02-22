bit imports
==========

[![Build Status](https://travis-ci.org/MiguelCastillo/bit-imports.svg)](https://travis-ci.org/MiguelCastillo/bit-imports)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/MiguelCastillo/bit-imports?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Module loader and dependency management with support for CJS and AMD.

bit imports supports loading module with CJS and AMD format in the browser. Because it is built on top of [bit loader](https://github.com/MiguelCastillo/bit-loader), you get a full transformation workflow. Bit imports also uses [amd resolver](https://github.com/MiguelCastillo/amd-resolver) as the configuration provider, which is modeled after [requirejs](http://requirejs.org/docs/api.html#config) configuration format to give you a familar environment setup.

Currently bit imports implements an XHR fetch provider to load files, and leverages `# sourceURL` to integrate with debugging capabilities in all major browsers. The plan is to have logic to detect if bit imports is running in the browser or nodejs so that files can be loaded transparently regardless of environment.

So why does bit imports even exist?  Bottom line is to eliminate the *build* step during the development cycles required by tools like *browserify* and such. Also to provide you with a module loading system that allows you to leverage tools like [bable](https://github.com/babel/babel) to unlock access to latest ECMAScript features via transpilation, right in the browser. The key part of all this is that bit imports exists to help you during your development cycles, but you are encouraged to *build* your application with browserify when you are ready to deploy.

bit imports also exposes two core methods from bit loader (`register` and `import`), which you can use to expand module loading format support.
