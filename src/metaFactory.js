var Resolver = require('amd-resolver');


function MetaFactory(settings) {
  settings = settings || {};
  settings.baseUrl = getBaseUrl(settings.baseUrl);
  this.resolver = new Resolver(settings);
}


MetaFactory.prototype.create = function(file, root) {
  var moduleMeta       = this.resolver.resolve(file, root);
  var pathInfo         = Resolver.File.parseParts(moduleMeta.url.href);
  moduleMeta.directory = pathInfo.directory;
  moduleMeta.path      = pathInfo.path;
  return moduleMeta;
};


/*
 * This will adjust the baseUrl in the settings so that requests get the absolute
 * url so that browsers can better handle `# sourceURL`.  In chrome for example,
 * the files are added to the developer tools' source tree, which let's you put
 * break points directly from the developer tools.
 */
function getBaseUrl(url) {
  var base = typeof(window) !== 'undefined' ? window.location.href : '';
  return Resolver.URL.parser.resolve(base, url || "");
}


module.exports = MetaFactory;
