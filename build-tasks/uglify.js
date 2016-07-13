// https://github.com/gruntjs/grunt-contrib-uglify/issues/366
// preserveComment: "some" isn't working.

module.exports = {
  "build": {
    "options": {
      "preserveComments": /(?:^!|@(?:license|preserve|cc_on))/,
      "sourceMap": true
    },
    "files": [{
      "src": "dist/<%= pkg.name %>.js",
      "dest": "dist/<%= pkg.name %>.min.js"
    }]
  },
  "browserify": {
    "options": {
      "preserveComments": /(?:^!|@(?:license|preserve|cc_on))/,
      "sourceMap": true
    },
    "files": [{
      "src": "<%= browserify.build.dest %>",
      "dest": "dist/browserify-<%= pkg.name %>.min.js"
    }]
  }
};
