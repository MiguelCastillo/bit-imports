module.exports = {
  "build": {
    "src": [
      "browser.js"
    ],
    "dest": "dist/<%= pkg.name %>.js",
    "options": {
      "banner": "/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today() %>. (c) <%= grunt.template.today('yyyy') %> Miguel Castillo. Licensed under MIT */",
      "browserifyOptions": {
        "detectGlobals": true,
        "ignoreMissing": true,
        "standalone": "bitimports"
      }
    }
  }
};