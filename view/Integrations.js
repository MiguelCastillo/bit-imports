"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <div class=\"integrations-view\">\n        <div class=\"wrapper\">\n          ", "\n        </div>\n      </div>\n    "], ["\n      <div class=\"integrations-view\">\n        <div class=\"wrapper\">\n          ", "\n        </div>\n      </div>\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

var _Babel = require("./Babel");

var _Babel2 = _interopRequireDefault(_Babel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Integrations = function (_Component) {
  _inherits(Integrations, _Component);

  function Integrations() {
    _classCallCheck(this, Integrations);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Integrations).apply(this, arguments));
  }

  _createClass(Integrations, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject, new _Babel2.default());
    }
  }]);

  return Integrations;
}(_Component3.default);

exports.default = Integrations;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludGVncmF0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR007Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTyxLQUFLLE9BQUwsa0JBR0Usc0JBSFQsQ0FETzs7OztTQURMOzs7a0JBWVMiLCJmaWxlIjoiSW50ZWdyYXRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vanMvQ29tcG9uZW50XCI7XG5pbXBvcnQgQmFiZWwgZnJvbSBcIi4vQmFiZWxcIjtcblxuY2xhc3MgSW50ZWdyYXRpb25zIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGRpdiBjbGFzcz1cImludGVncmF0aW9ucy12aWV3XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+XG4gICAgICAgICAgJHsgbmV3IEJhYmVsKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZWdyYXRpb25zO1xuIl19