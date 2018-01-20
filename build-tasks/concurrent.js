module.exports = {
  "dev": {
    "tasks": [
      "pakit:dev",
      "connect:dev",
      "watch:dev"
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
