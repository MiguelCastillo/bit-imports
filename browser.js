var streamProvider = require('promjax');
var FileStream     = require('./src/fileStream');

// Register method to load file content from storage
FileStream.register(streamProvider);

// Export bit imports!
module.exports = require('./src/bit-imports');
