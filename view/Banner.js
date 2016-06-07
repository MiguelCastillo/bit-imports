"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <div class=\"canvas-wrap\">\n        <div class=\"canvas-content\">\n          <img id=\"bit-imports\" src=\"img/bit-imports.svg\" alt=\"bit imports\">\n          <h1>module loader for the browser</h1>\n        </div>\n        <div id=\"canvas\" class=\"canvas\"></div>\n      </div>\n    "], ["\n      <div class=\"canvas-wrap\">\n        <div class=\"canvas-content\">\n          <img id=\"bit-imports\" src=\"img/bit-imports.svg\" alt=\"bit imports\">\n          <h1>module loader for the browser</h1>\n        </div>\n        <div id=\"canvas\" class=\"canvas\"></div>\n      </div>\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banner = function (_Component) {
  _inherits(Banner, _Component);

  function Banner() {
    _classCallCheck(this, Banner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Banner).apply(this, arguments));
  }

  _createClass(Banner, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject);
    }
  }]);

  return Banner;
}(_Component3.default);

exports.default = Banner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhbm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBRU0sTTs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUFPLEtBQUssT0FBWjtBQVNEOzs7Ozs7a0JBR1ksTSIsImZpbGUiOiJCYW5uZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9qcy9Db21wb25lbnRcIjtcblxuY2xhc3MgQmFubmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGRpdiBjbGFzcz1cImNhbnZhcy13cmFwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYW52YXMtY29udGVudFwiPlxuICAgICAgICAgIDxpbWcgaWQ9XCJiaXQtaW1wb3J0c1wiIHNyYz1cImltZy9iaXQtaW1wb3J0cy5zdmdcIiBhbHQ9XCJiaXQgaW1wb3J0c1wiPlxuICAgICAgICAgIDxoMT5tb2R1bGUgbG9hZGVyIGZvciB0aGUgYnJvd3NlcjwvaDE+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGlkPVwiY2FudmFzXCIgY2xhc3M9XCJjYW52YXNcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFubmVyO1xuIl19