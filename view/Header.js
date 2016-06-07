"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <header>\n        <nav id=\"nav\">\n          <ul class=\"nav-left dropdown\">\n            <li>\n              <a href=\"home\">Home</a>\n            </li>\n            <li>\n              <a>Usage <span class=\"caret\"></span></a>\n              ", "\n            </li>\n        </ul>\n        <ul class=\"nav-right\">\n            <li>\n              <a href=\"https://twitter.com/bitsjs\" target=\"_blank\">\n                <img src=\"img/twitter.svg\" alt=\"Twitter @bitsjs\">\n              </a>\n            </li>\n            <li>\n              <a href=\"https://github.com/MiguelCastillo/bit-imports\" target=\"_blank\">\n                <img src=\"img/github.svg\" alt=\"GitHub bit imports\">\n              </a>\n            </li>\n            <li>\n              <a href=\"https://gitter.im/MiguelCastillo/bit-imports\" target=\"_blank\">\n                <img src=\"img/gitter.svg\" alt=\"Gitter bit imports\">\n              </a>\n            </li>\n          </ul>\n        </nav>\n      </header>\n    "], ["\n      <header>\n        <nav id=\"nav\">\n          <ul class=\"nav-left dropdown\">\n            <li>\n              <a href=\"home\">Home</a>\n            </li>\n            <li>\n              <a>Usage <span class=\"caret\"></span></a>\n              ", "\n            </li>\n        </ul>\n        <ul class=\"nav-right\">\n            <li>\n              <a href=\"https://twitter.com/bitsjs\" target=\"_blank\">\n                <img src=\"img/twitter.svg\" alt=\"Twitter @bitsjs\">\n              </a>\n            </li>\n            <li>\n              <a href=\"https://github.com/MiguelCastillo/bit-imports\" target=\"_blank\">\n                <img src=\"img/github.svg\" alt=\"GitHub bit imports\">\n              </a>\n            </li>\n            <li>\n              <a href=\"https://gitter.im/MiguelCastillo/bit-imports\" target=\"_blank\">\n                <img src=\"img/gitter.svg\" alt=\"Gitter bit imports\">\n              </a>\n            </li>\n          </ul>\n        </nav>\n      </header>\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

var _UsageDropdown = require("./UsageDropdown");

var _UsageDropdown2 = _interopRequireDefault(_UsageDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject, new _UsageDropdown2.default());
    }
  }]);

  return Header;
}(_Component3.default);

exports.default = Header;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTSxNOzs7Ozs7Ozs7Ozs2QkFDSztBQUNQLGFBQU8sS0FBSyxPQUFaLGtCQVNhLDZCQVRiO0FBZ0NEOzs7Ozs7a0JBR1ksTSIsImZpbGUiOiJIZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9qcy9Db21wb25lbnRcIjtcbmltcG9ydCBVc2FnZURyb3Bkb3duIGZyb20gXCIuL1VzYWdlRHJvcGRvd25cIjtcblxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGhlYWRlcj5cbiAgICAgICAgPG5hdiBpZD1cIm5hdlwiPlxuICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdi1sZWZ0IGRyb3Bkb3duXCI+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJob21lXCI+SG9tZTwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxhPlVzYWdlIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+PC9hPlxuICAgICAgICAgICAgICAkeyBuZXcgVXNhZ2VEcm9wZG93bigpIH1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICAgIDx1bCBjbGFzcz1cIm5hdi1yaWdodFwiPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9iaXRzanNcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImltZy90d2l0dGVyLnN2Z1wiIGFsdD1cIlR3aXR0ZXIgQGJpdHNqc1wiPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL01pZ3VlbENhc3RpbGxvL2JpdC1pbXBvcnRzXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCJpbWcvZ2l0aHViLnN2Z1wiIGFsdD1cIkdpdEh1YiBiaXQgaW1wb3J0c1wiPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXR0ZXIuaW0vTWlndWVsQ2FzdGlsbG8vYml0LWltcG9ydHNcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImltZy9naXR0ZXIuc3ZnXCIgYWx0PVwiR2l0dGVyIGJpdCBpbXBvcnRzXCI+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9uYXY+XG4gICAgICA8L2hlYWRlcj5cbiAgICBgO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbiJdfQ==