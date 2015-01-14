var importer = Bitimporter.config({
  "baseUrl": "../",
  "paths": {
    "mocha": "../node_modules/mocha/mocha",
    "chai": "../node_modules/chai/chai",
    "cjs": "../node_modules/cjsbit-transform/dist/cjs",
    "amd": "../node_modules/amdbit-transform/dist/amd"
  },
  "shim": {
    "mocha": {
      "exports": "mocha"
    }
  }//,
  //"transforms": [{name: "amd", ignore:["chai", "dist/amd-bits"]}, {name:"cjs", ignore:["chai", "amd", "dist/amd-bits"]}],
  //,
  //"urlArgs": 'bust=' + (new Date()).getTime()
});

//var define  = importer.define;
var require = importer.require;
