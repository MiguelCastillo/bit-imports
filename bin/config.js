var subarg = require("subarg");
var extend = require("belty/src/extend");
var types = require("dis-isa");


function config(options) {
  var args = subarg(options);
  var files = args._;

  if (args.files) {
    files = files.concat(parseSubArgs(args.files));
  }

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
  return data.map(parseObject);
}


function parseObject(data) {
  if (!types.isPlainObject(data)) {
    return data;
  }

  if (data._.length) {
    if (Object.keys(data).length !== 1) {
      data._.push(extend({}, data, { _: [] }));
    }

    return parseArray(data._);
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


function toArray(data) {
  if (!types.isArray(data)) {
    data = [data];
  }
  return data;
}


module.exports = config;
