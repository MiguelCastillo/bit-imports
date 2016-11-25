var fallback = require("connect-history-api-fallback");
var livereload = require("connect-livereload");

module.exports = {
  "test": {
    "options": {
      "port": 8012,
      "hostname": "localhost"
    }
  },
  "site": {
    "options": {
      "protocol": "http", //http2
      "port": 8015,
      "hostname": "localhost",
      "keepalive": true,
      "open": "http://localhost:8015/_site/index.html",
      "middleware": function(connect, options, middlewares) {
        middlewares.unshift(fallback({ index: "/_site/index.html" }));
        middlewares.unshift(livereload({ port: 32012 }));
        return middlewares;
      }
    }
  },
  "dev": {
    "options": {
      "protocol": "http",
      "port": 8010,
      "host": "localhost",
      "keepalive": true,
      "open": "http://localhost:8010/test/SpecRunner.html",
      "middleware": function(connect, options, middlewares) {
        middlewares.unshift(livereload({ port: 32011 }));
        return middlewares;
      }
    }
  },
  "docs": {
    "options": {
      "port": 8017,
      "host": "localhost",
      "keepalive": true,
      "base": "_docs/",
      "open": "http://localhost:8017/global.html"
    }
  }
};