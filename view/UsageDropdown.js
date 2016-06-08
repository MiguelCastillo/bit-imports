"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <ul class=\"usage-dropdown\">\n        <li><a href=\"api\">API</a></li>\n        <li><a href=\"cli\">CLI</a></li>\n        <li><a href=\"grunt-task\">Grunt Task</a></li>\n      </ul>\n    "], ["\n      <ul class=\"usage-dropdown\">\n        <li><a href=\"api\">API</a></li>\n        <li><a href=\"cli\">CLI</a></li>\n        <li><a href=\"grunt-task\">Grunt Task</a></li>\n      </ul>\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsageDropdown = function (_Component) {
  _inherits(UsageDropdown, _Component);

  function UsageDropdown() {
    _classCallCheck(this, UsageDropdown);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UsageDropdown).apply(this, arguments));
  }

  _createClass(UsageDropdown, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject);
    }
  }]);

  return UsageDropdown;
}(_Component3.default);

exports.default = UsageDropdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVzYWdlRHJvcGRvd24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQUVNLGE7Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTyxLQUFLLE9BQVo7QUFPRDs7Ozs7O2tCQUdZLGEiLCJmaWxlIjoiVXNhZ2VEcm9wZG93bi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4uL2pzL0NvbXBvbmVudFwiO1xuXG5jbGFzcyBVc2FnZURyb3Bkb3duIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPHVsIGNsYXNzPVwidXNhZ2UtZHJvcGRvd25cIj5cbiAgICAgICAgPGxpPjxhIGhyZWY9XCJhcGlcIj5BUEk8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIGhyZWY9XCJjbGlcIj5DTEk8L2E+PC9saT5cbiAgICAgICAgPGxpPjxhIGhyZWY9XCJncnVudC10YXNrXCI+R3J1bnQgVGFzazwvYT48L2xpPlxuICAgICAgPC91bD5cbiAgICBgO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVzYWdlRHJvcGRvd247XG4iXX0=