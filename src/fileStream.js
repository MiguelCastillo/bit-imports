var _provider;
function register(provider) {
  _provider = provider;
}

function fileReader(file) {
  return _provider(file);
}

fileReader.register = register;
module.exports = fileReader;
