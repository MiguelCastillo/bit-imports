"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <section class=\"babel-view\">\n        <div class=\"text\">\n          <h4>\n            With the flexibility of bit-imports' plugin system, adding <a href=\"https://babeljs.io/\" target=\"_blank\">babeljs</a> support is very trivial\n          </h4>\n          <div>This means you can start using the newest ES features available, right in the browser without an out of band build process.</div>\n        </div>\n        <div class=\"media\">\n          <img src=\"img/babel.png\" alt=\"Babel\" class=\"babel-logo\">\n        </div>\n      </section>\n    "], ["\n      <section class=\"babel-view\">\n        <div class=\"text\">\n          <h4>\n            With the flexibility of bit-imports' plugin system, adding <a href=\"https://babeljs.io/\" target=\"_blank\">babeljs</a> support is very trivial\n          </h4>\n          <div>This means you can start using the newest ES features available, right in the browser without an out of band build process.</div>\n        </div>\n        <div class=\"media\">\n          <img src=\"img/babel.png\" alt=\"Babel\" class=\"babel-logo\">\n        </div>\n      </section>\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BabelIntegration = function (_Component) {
  _inherits(BabelIntegration, _Component);

  function BabelIntegration() {
    _classCallCheck(this, BabelIntegration);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BabelIntegration).apply(this, arguments));
  }

  _createClass(BabelIntegration, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject);
    }
  }]);

  return BabelIntegration;
}(_Component3.default);

exports.default = BabelIntegration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhYmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNOzs7Ozs7Ozs7Ozs2QkFDSztBQUNQLGFBQU8sS0FBSyxPQUFMLGlCQUFQLENBRE87Ozs7U0FETDs7O2tCQWtCUyIsImZpbGUiOiJCYWJlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4uL2pzL0NvbXBvbmVudFwiO1xuXG5jbGFzcyBCYWJlbEludGVncmF0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJiYWJlbC12aWV3XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+XG4gICAgICAgICAgPGg0PlxuICAgICAgICAgICAgV2l0aCB0aGUgZmxleGliaWxpdHkgb2YgYml0LWltcG9ydHMnIHBsdWdpbiBzeXN0ZW0sIGFkZGluZyA8YSBocmVmPVwiaHR0cHM6Ly9iYWJlbGpzLmlvL1wiIHRhcmdldD1cIl9ibGFua1wiPmJhYmVsanM8L2E+IHN1cHBvcnQgaXMgdmVyeSB0cml2aWFsXG4gICAgICAgICAgPC9oND5cbiAgICAgICAgICA8ZGl2PlRoaXMgbWVhbnMgeW91IGNhbiBzdGFydCB1c2luZyB0aGUgbmV3ZXN0IEVTIGZlYXR1cmVzIGF2YWlsYWJsZSwgcmlnaHQgaW4gdGhlIGJyb3dzZXIgd2l0aG91dCBhbiBvdXQgb2YgYmFuZCBidWlsZCBwcm9jZXNzLjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhXCI+XG4gICAgICAgICAgPGltZyBzcmM9XCJpbWcvYmFiZWwucG5nXCIgYWx0PVwiQmFiZWxcIiBjbGFzcz1cImJhYmVsLWxvZ29cIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgYDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWJlbEludGVncmF0aW9uO1xuIl19