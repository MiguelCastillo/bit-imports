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
  "dev": {
    "files": [
      "dist/*.js",
    ],
    "options": {
      "livereload": 32011
    }
  },
  "site": {
    "files": [
      "_site/**/*"
    ],
    "options": {
      "livereload": 32012
    }
  }
};