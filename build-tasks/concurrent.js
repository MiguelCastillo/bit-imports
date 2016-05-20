module.exports = {
  "build": {
    "tasks": [
      "connect:dev",
      "watch:build"
    ],
    "options": {
      "logConcurrentOutput": true
    }
  },
  "docs": {
    "tasks": [
      "connect:docs",
      "watch:docs"
    ],
    "options": {
      "logConcurrentOutput": true
    }
  },
  "site": {
    "tasks": [
      "connect:site",
      "watch:site"
    ],
    "options": {
      "logConcurrentOutput": true
    }
  }
};