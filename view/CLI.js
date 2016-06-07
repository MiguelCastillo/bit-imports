"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <div class=\"cli\">\n        <div class=\"markdown-body\">", "</div>\n      </div>\n    "], ["\n      <div class=\"cli\">\n        <div class=\"markdown-body\">", "</div>\n      </div>\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

var _CLI = require("./CLI.md");

var _CLI2 = _interopRequireDefault(_CLI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CLI = function (_Component) {
  _inherits(CLI, _Component);

  function CLI() {
    _classCallCheck(this, CLI);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CLI).apply(this, arguments));
  }

  _createClass(CLI, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject, _CLI2.default);
    }
  }]);

  return CLI;
}(_Component3.default);

exports.default = CLI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNMSS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTSxHOzs7Ozs7Ozs7Ozs2QkFDSztBQUNQLGFBQU8sS0FBSyxPQUFaO0FBS0Q7Ozs7OztrQkFHWSxHIiwiZmlsZSI6IkNMSS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4uL2pzL0NvbXBvbmVudFwiO1xuaW1wb3J0IENMSWNvbnRlbnQgZnJvbSBcIi4vQ0xJLm1kXCI7XG5cbmNsYXNzIENMSSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJjbGlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIj4keyBDTEljb250ZW50IH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ0xJO1xuIl19