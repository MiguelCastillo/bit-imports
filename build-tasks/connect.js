module.exports = {
  "test": {
    "options": {
      "port": 8012,
      "hostname": "localhost"
    }
  },
  "site": {
    "options": {
      "protocol": "http2",
      "port": 8015,
      "hostname": "localhost",
      "keepalive": true,
      "open": "https://localhost:8015/_site/index.html"
    }
  },
  "dev": {
    "options": {
      "protocol": "http2",
      "port": 8010,
      "host": "localhost",
      "keepalive": true,
      "open": "https://localhost:8010/test/SpecRunner.html"
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