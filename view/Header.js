"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <header>\n        <nav id=\"nav\">\n          <ul class=\"nav-left\">\n            <li>\n              <a href=\"home\">\n                Home\n              </a>\n            </li>\n            <li>\n              <a href=\"docs\">\n                Docs\n              </a>\n            </li>\n        </ul>\n        <ul class=\"nav-middle\">\n            <li>\n              <a href=\"home\">\n                <img id=\"bit-imports-mini\" src=\"img/bit-imports.svg\" alt=\"bit imports\" class=\"mini-logo\">\n              </a>\n            </li>\n        </ul>\n        <ul class=\"nav-right\">\n            <li>\n              <a href=\"https://twitter.com/bitsjs\" target=\"_blank\">\n                <img src=\"img/twitter.svg\" alt=\"Twitter @bitsjs\">\n              </a>\n            </li>\n            <li>\n              <a href=\"https://github.com/MiguelCastillo/bit-imports\" target=\"_blank\">\n                <img src=\"img/github.svg\" alt=\"GitHub bit imports\">\n              </a>\n            </li>\n            <li>\n              <a href=\"https://gitter.im/MiguelCastillo/bit-imports\" target=\"_blank\">\n                <img src=\"img/gitter.svg\" alt=\"Gitter bit imports\">\n              </a>\n            </li>\n          </ul>\n        </nav>\n      </header>\n    "], ["\n      <header>\n        <nav id=\"nav\">\n          <ul class=\"nav-left\">\n            <li>\n              <a href=\"home\">\n                Home\n              </a>\n            </li>\n            <li>\n              <a href=\"docs\">\n                Docs\n              </a>\n            </li>\n        </ul>\n        <ul class=\"nav-middle\">\n            <li>\n              <a href=\"home\">\n                <img id=\"bit-imports-mini\" src=\"img/bit-imports.svg\" alt=\"bit imports\" class=\"mini-logo\">\n              </a>\n            </li>\n        </ul>\n        <ul class=\"nav-right\">\n            <li>\n              <a href=\"https://twitter.com/bitsjs\" target=\"_blank\">\n                <img src=\"img/twitter.svg\" alt=\"Twitter @bitsjs\">\n              </a>\n            </li>\n            <li>\n              <a href=\"https://github.com/MiguelCastillo/bit-imports\" target=\"_blank\">\n                <img src=\"img/github.svg\" alt=\"GitHub bit imports\">\n              </a>\n            </li>\n            <li>\n              <a href=\"https://gitter.im/MiguelCastillo/bit-imports\" target=\"_blank\">\n                <img src=\"img/gitter.svg\" alt=\"Gitter bit imports\">\n              </a>\n            </li>\n          </ul>\n        </nav>\n      </header>\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

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
      return this.content(_templateObject);
    }
  }]);

  return Header;
}(_Component3.default);

exports.default = Header;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHTTs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUFPLEtBQUssT0FBTCxpQkFBUCxDQURPOzs7O1NBREw7OztrQkErQ1MiLCJmaWxlIjoiSGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vanMvQ29tcG9uZW50XCI7XG5cblxuY2xhc3MgSGVhZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGhlYWRlcj5cbiAgICAgICAgPG5hdiBpZD1cIm5hdlwiPlxuICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdi1sZWZ0XCI+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJob21lXCI+XG4gICAgICAgICAgICAgICAgSG9tZVxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8YSBocmVmPVwiZG9jc1wiPlxuICAgICAgICAgICAgICAgIERvY3NcbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgPHVsIGNsYXNzPVwibmF2LW1pZGRsZVwiPlxuICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICA8YSBocmVmPVwiaG9tZVwiPlxuICAgICAgICAgICAgICAgIDxpbWcgaWQ9XCJiaXQtaW1wb3J0cy1taW5pXCIgc3JjPVwiaW1nL2JpdC1pbXBvcnRzLnN2Z1wiIGFsdD1cImJpdCBpbXBvcnRzXCIgY2xhc3M9XCJtaW5pLWxvZ29cIj5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgICAgPHVsIGNsYXNzPVwibmF2LXJpZ2h0XCI+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL2JpdHNqc1wiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nL3R3aXR0ZXIuc3ZnXCIgYWx0PVwiVHdpdHRlciBAYml0c2pzXCI+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vTWlndWVsQ2FzdGlsbG8vYml0LWltcG9ydHNcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cImltZy9naXRodWIuc3ZnXCIgYWx0PVwiR2l0SHViIGJpdCBpbXBvcnRzXCI+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdHRlci5pbS9NaWd1ZWxDYXN0aWxsby9iaXQtaW1wb3J0c1wiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiaW1nL2dpdHRlci5zdmdcIiBhbHQ9XCJHaXR0ZXIgYml0IGltcG9ydHNcIj5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L25hdj5cbiAgICAgIDwvaGVhZGVyPlxuICAgIGA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xuIl19