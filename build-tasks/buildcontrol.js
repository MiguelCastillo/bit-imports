module.exports = {
  "options": {
    "dir": "_site",
    "commit": true,
    "push": true,
    "message": "Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%"
  },
  "pages": {
    "options": {
      "remote": "https://github.com/MiguelCastillo/bit-imports.git",
      "branch": "gh-pages"
    }
  },
  "local": {
    "options": {
      "remote": "../",
      "branch": "gh-pages"
    }
  }
};