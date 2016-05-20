module.exports = {
  "site": {
    "cwd": "site",
    "expand": true,
    "src": [
      "bitimportsfile.js",
      "node_modules/loadstyle-bits/dist/**/*",
      "node_modules/bit-imports/dist/**/*",
      "node_modules/spromise/dist/**/*"
    ],
    "dest": "_site"
  },
  "siteignore": {
    "src": ".site-gitignore",
    "dest": "_site/.gitignore"
  },
  "sitedocs": {
    "expand": true,
    "src": "_docs/**",
    "dest": "_site"
  }
};