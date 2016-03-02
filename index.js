var promjax = require("promjax");
var fileReader = require("./src/fileReader");

// Register method to load file content from storage
if (window.fetch) {
  fileReader.register(function(path) {
    return window
      .fetch(path)
      .then(function(response) {
        return response.text();
      });
  });
}
else {
  fileReader.register(promjax);
}

// Export bit imports!
module.exports = require("./src/bit-imports");
