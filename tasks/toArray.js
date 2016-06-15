var types = require("dis-isa");

function toArray(data) {
  return types.isArray(data) ? data : [data];
}

module.exports = toArray;
