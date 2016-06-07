module.exports = {
  "docs": {
    "files": {
      "src": [
        "src/**/*.js"
      ]
    },
    "tasks": [
      "jshint:all",
      "jsdoc:build"
    ],
    "options": {
      "livereload": 32010
    }
  },
  "build": {
    "files": {
      "src": [
        "src/**/*.js",
        "test/**/*.js",
        "*.js"
      ]
    },
    "tasks": [
      "build"
    ],
    "options": {
      "livereload": 32011
    }
  },
  "site": {
    "files": {
      "src": [
        "src/**/*.js",
        "site/**/*",
        "!site/node_modules/**/*"
      ]
    },
    "tasks": [
      "build-site"
    ],
    "options": {
      "livereload": 32012
    }
  }
};