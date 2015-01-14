var deamdify = require('deamdify');

function amdTransform(moduleMeta) {
  if (!moduleMeta.hasOwnProperty("source") || ignoreModule(moduleMeta, this.ignore)) {
     return;
  }

  return new moduleMeta.manager.Promise(function(resolve) {
    deamdify()
      .on("data", function(result) {
        moduleMeta.source = result;
      })
      .on("end", function() {
        resolve();
      })
      .end(moduleMeta.source);
  });
}

function ignoreModule(moduleMeta, ignoreList) {
  return ignoreList && ignoreList.length && ignoreList.indexOf(moduleMeta.name) !== -1;
}

module.exports = amdTransform;
