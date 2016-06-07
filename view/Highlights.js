"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <div class=\"highlights-view\">\n        <div class=\"wrapper\">\n          <section>\n            <img src=\"./img/formats.svg\" alt=\"Formats\">\n            <h2>Formats</h2>\n            <p>Build applications with System.import semantics and CJS module dependencies.</p>\n          </section>\n          <section>\n            <img src=\"./img/pluggable.svg\" alt=\"Pluggable\">\n            <h2>Pluggable</h2>\n            <p>Powerful plugin system that gives you fine grained control of your application assets.</p>\n          </section>\n          <section>\n            <img src=\"./img/browser.svg\" alt=\"Browser\">\n            <h2>Browser</h2>\n            <p>Remove your bundling step when developing your Application. Only bundle when you really need to - before deploying to production.</p>\n          </section>\n        </div>\n      </div>\n    "], ["\n      <div class=\"highlights-view\">\n        <div class=\"wrapper\">\n          <section>\n            <img src=\"./img/formats.svg\" alt=\"Formats\">\n            <h2>Formats</h2>\n            <p>Build applications with System.import semantics and CJS module dependencies.</p>\n          </section>\n          <section>\n            <img src=\"./img/pluggable.svg\" alt=\"Pluggable\">\n            <h2>Pluggable</h2>\n            <p>Powerful plugin system that gives you fine grained control of your application assets.</p>\n          </section>\n          <section>\n            <img src=\"./img/browser.svg\" alt=\"Browser\">\n            <h2>Browser</h2>\n            <p>Remove your bundling step when developing your Application. Only bundle when you really need to - before deploying to production.</p>\n          </section>\n        </div>\n      </div>\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Highlights = function (_Component) {
  _inherits(Highlights, _Component);

  function Highlights() {
    _classCallCheck(this, Highlights);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Highlights).apply(this, arguments));
  }

  _createClass(Highlights, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject);
    }
  }]);

  return Highlights;
}(_Component3.default);

exports.default = Highlights;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhpZ2hsaWdodHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQUdNLFU7Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTyxLQUFLLE9BQVo7QUFxQkQ7Ozs7OztrQkFJWSxVIiwiZmlsZSI6IkhpZ2hsaWdodHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9qcy9Db21wb25lbnRcIjtcblxuXG5jbGFzcyBIaWdobGlnaHRzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGRpdiBjbGFzcz1cImhpZ2hsaWdodHMtdmlld1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZy9mb3JtYXRzLnN2Z1wiIGFsdD1cIkZvcm1hdHNcIj5cbiAgICAgICAgICAgIDxoMj5Gb3JtYXRzPC9oMj5cbiAgICAgICAgICAgIDxwPkJ1aWxkIGFwcGxpY2F0aW9ucyB3aXRoIFN5c3RlbS5pbXBvcnQgc2VtYW50aWNzIGFuZCBDSlMgbW9kdWxlIGRlcGVuZGVuY2llcy48L3A+XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgIDxzZWN0aW9uPlxuICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZy9wbHVnZ2FibGUuc3ZnXCIgYWx0PVwiUGx1Z2dhYmxlXCI+XG4gICAgICAgICAgICA8aDI+UGx1Z2dhYmxlPC9oMj5cbiAgICAgICAgICAgIDxwPlBvd2VyZnVsIHBsdWdpbiBzeXN0ZW0gdGhhdCBnaXZlcyB5b3UgZmluZSBncmFpbmVkIGNvbnRyb2wgb2YgeW91ciBhcHBsaWNhdGlvbiBhc3NldHMuPC9wPlxuICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWcvYnJvd3Nlci5zdmdcIiBhbHQ9XCJCcm93c2VyXCI+XG4gICAgICAgICAgICA8aDI+QnJvd3NlcjwvaDI+XG4gICAgICAgICAgICA8cD5SZW1vdmUgeW91ciBidW5kbGluZyBzdGVwIHdoZW4gZGV2ZWxvcGluZyB5b3VyIEFwcGxpY2F0aW9uLiBPbmx5IGJ1bmRsZSB3aGVuIHlvdSByZWFsbHkgbmVlZCB0byAtIGJlZm9yZSBkZXBsb3lpbmcgdG8gcHJvZHVjdGlvbi48L3A+XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBIaWdobGlnaHRzO1xuIl19