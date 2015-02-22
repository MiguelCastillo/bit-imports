## [index.html](index.html)

First, we load bit imports via a traditional script tag. When bit imports is loaded that way, `Bitimports` is available in the global object. Then we load `config.js` to configure bit imports with relevant information to run the example page.  And finally we load `main.js` by calling `require('main');`.

## [config.js](config.js)

In the code below we are configuring bit imports in a self executing function to prevent setup *stuff* from leaking into the global space. We only expose `require` to load modules, since that's the common method for loading `CJS` and `AMD` modules.  We have configured a `baseUrl` to make sure all modules have the proper root url when they are loaded.  `paths` allows us map module names to file location and finally `transforms`. `transforms` allow us to configure processors for source files as they are loaded. An example of a transform is a CoffeScript or [babel](https://github.com/babel/babel) transform.  In this particular example, we are keeping things simple so we are setting up a transform to add `use strict;` to every module that is loaded.

``` javascript
var require;
require = (function() {
  var importer = Bitimports.config({
    "baseUrl": ".",
    "paths": {
      "addStrict": "transform/addStrict"
    },
    "transforms": [{
      name: "ignore",
      handler: ignore,
      ignore:["addStrict"]
    },
    "addStrict"]
  });

  /**
   * Simple filter for excluding particular modules from being processed by the transformation pipeline.
   */
  function ignore(moduleMeta) {
    var ignoreList = this.ignore;
    return !(ignoreList && ignoreList.length && ignoreList.indexOf(moduleMeta.name) !== -1);
  }

  return importer.require;
})();
```

## Modules - [main](main.js) and others in the [js](js) folder

The example loads a combination of `AMD` and `CJS` modules simply to illustrate how both of these module formats can actually coexist. Please take a look at [main.js](main.js) and other modules in the [js](js) folder.
