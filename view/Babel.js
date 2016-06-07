"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <section class=\"babel-view\">\n        <div class=\"text\">\n          <h4>\n            With the flexibility of bit-imports' plugin system, adding <a href=\"https://babeljs.io/\" target=\"_blank\">babeljs</a> support is very trivial\n          </h4>\n          <div>This means you can start using the newest ES features available, right in the browser without a bundling process.</div>\n        </div>\n        <div class=\"media\">\n          <img src=\"img/babel.png\" alt=\"Babel\" class=\"babel-logo\">\n        </div>\n      </section>\n    "], ["\n      <section class=\"babel-view\">\n        <div class=\"text\">\n          <h4>\n            With the flexibility of bit-imports' plugin system, adding <a href=\"https://babeljs.io/\" target=\"_blank\">babeljs</a> support is very trivial\n          </h4>\n          <div>This means you can start using the newest ES features available, right in the browser without a bundling process.</div>\n        </div>\n        <div class=\"media\">\n          <img src=\"img/babel.png\" alt=\"Babel\" class=\"babel-logo\">\n        </div>\n      </section>\n    "]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhYmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFFTSxnQjs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUFPLEtBQUssT0FBWjtBQWFEOzs7Ozs7a0JBR1ksZ0IiLCJmaWxlIjoiQmFiZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9qcy9Db21wb25lbnRcIjtcblxuY2xhc3MgQmFiZWxJbnRlZ3JhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50IGBcbiAgICAgIDxzZWN0aW9uIGNsYXNzPVwiYmFiZWwtdmlld1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPlxuICAgICAgICAgIDxoND5cbiAgICAgICAgICAgIFdpdGggdGhlIGZsZXhpYmlsaXR5IG9mIGJpdC1pbXBvcnRzJyBwbHVnaW4gc3lzdGVtLCBhZGRpbmcgPGEgaHJlZj1cImh0dHBzOi8vYmFiZWxqcy5pby9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5iYWJlbGpzPC9hPiBzdXBwb3J0IGlzIHZlcnkgdHJpdmlhbFxuICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgPGRpdj5UaGlzIG1lYW5zIHlvdSBjYW4gc3RhcnQgdXNpbmcgdGhlIG5ld2VzdCBFUyBmZWF0dXJlcyBhdmFpbGFibGUsIHJpZ2h0IGluIHRoZSBicm93c2VyIHdpdGhvdXQgYSBidW5kbGluZyBwcm9jZXNzLjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lZGlhXCI+XG4gICAgICAgICAgPGltZyBzcmM9XCJpbWcvYmFiZWwucG5nXCIgYWx0PVwiQmFiZWxcIiBjbGFzcz1cImJhYmVsLWxvZ29cIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgYDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWJlbEludGVncmF0aW9uO1xuIl19