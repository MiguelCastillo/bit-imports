var subarg = require("subarg");
var extend = require("belty/src/extend");
var types = require("dis-isa");


function config(options) {
  var args = subarg(options);
  var files = [].concat(args._).concat(flattenUnderscore(args.files || []));

  return Object
    .keys(args)
    .filter(function(key) {
      return key !== "_" && key !== "files";
    })
    .reduce(function(container, key) {
      container[key] = parseSubArgs(args[key]);
      return container;
    }, { files: files });
}


function parseSubArgs(data) {
  return types.isArray(data) ?
    parseArray(data) :
    parseObject(data);
}


function parseArray(data) {
  return data.reduce(function(container, item) {
    container.push(parseObject(item));
    return container;
  }, []);
}


function parseObject(data) {
  if (!types.isPlainObject(data)) {
    return data;
  }

  if (data._ && data._.length) {
    return flattenUnderscore(data);
  }

  return Object
    .keys(data)
    .filter(function(key) {
      return key !== "_";
    })
    .reduce(function(container, key) {
      if (types.isPlainObject(data[key]) || types.isArray(data[key])) {
        container[key] = parseSubArgs(data[key]);
      }
      else {
        container[key] = data[key];
      }
      return container;
    }, {})
}


function flattenUnderscore(data) {
  return toArray(data)
    .reduce(function(container, item) {
      if (types.isPlainObject(item)) {
        container = container.concat(item._);

        if (Object.keys(item).length !== 1) {
          container.push(parseSubArgs(extend({}, item, { _: [] })));
        }
      }
      else {
        container.push(item);
      }

      return container;
    }, []);
}


function toArray(data) {
  if (!types.isArray(data)) {
    data = [data];
  }
  return data;
}


module.exports = config;
