requirejs.config({
  "baseUrl": "../",
  "paths": {
    "mocha": "../node_modules/mocha/mocha",
    "chai": "../node_modules/chai/chai"
  },
  "shim": {
    "mocha": {
      "exports": "mocha"
    }
  }//,
  //"urlArgs": 'bust=' + (new Date()).getTime()
});
