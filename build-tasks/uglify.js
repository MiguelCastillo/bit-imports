// https://github.com/gruntjs/grunt-contrib-uglify/issues/366
// preserveComment: "some" isn't working.

module.exports = {
  "build": {
    "options": {
      "preserveComments": /(?:^!|@(?:license|preserve|cc_on))/,
      "sourceMap": true
    },
    "files": {
      "dist/<%= pkg.name %>.min.js": [
        "dist/<%= pkg.name %>.js"
      ]
    }
  },
  "browserify": {
    "options": {
      "preserveComments": /(?:^!|@(?:license|preserve|cc_on))/,
      "sourceMap": true
    },
    "files": {
      "dist/browserify-<%= pkg.name %>.min.js": [
        "<%= browserify.build.dest %>"
      ]
    }
  }
};
