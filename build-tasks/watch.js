module.exports = {
  "docs": {
    "files": [
      "src/**/*.js"
    ],
    "tasks": [
      "jshint:all",
      "jsdoc:build"
    ],
    "options": {
      "livereload": 32010
    }
  },
  "build": {
    "files": [
      "src/**/*.js",
      "test/**/*.js",
      "*.js"
    ],
    "tasks": [
      "build"
    ],
    "options": {
      "livereload": 32011
    }
  },
  "site": {
    "files": [
      "_site/**/*"
    ],
    "tasks": [
    ],
    "options": {
      "livereload": 32012
    }
  }
};