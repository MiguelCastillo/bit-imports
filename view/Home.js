"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n    "], ["\n      ", "\n      ", "\n      ", "\n    "]);

var _Component2 = require("../js/Component");

var _Component3 = _interopRequireDefault(_Component2);

var _Banner = require("./Banner");

var _Banner2 = _interopRequireDefault(_Banner);

var _Integrations = require("./Integrations");

var _Integrations2 = _interopRequireDefault(_Integrations);

var _Highlights = require("./Highlights");

var _Highlights2 = _interopRequireDefault(_Highlights);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject, new _Banner2.default(), new _Highlights2.default(), new _Integrations2.default());
    }
  }]);

  return Home;
}(_Component3.default);

exports.default = Home;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTU07Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTyxLQUFLLE9BQUwsa0JBQ0Ysd0JBQ0EsNEJBQ0EsNkJBSEwsQ0FETzs7OztTQURMOzs7a0JBV1MiLCJmaWxlIjoiSG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4uL2pzL0NvbXBvbmVudFwiO1xuaW1wb3J0IEJhbm5lciBmcm9tIFwiLi9CYW5uZXJcIjtcbmltcG9ydCBJbnRlZ3JhdGlvbnMgZnJvbSBcIi4vSW50ZWdyYXRpb25zXCI7XG5pbXBvcnQgSGlnaGxpZ2h0cyBmcm9tIFwiLi9IaWdobGlnaHRzXCI7XG5cblxuY2xhc3MgSG9tZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50IGBcbiAgICAgICR7IG5ldyBCYW5uZXIoKSB9XG4gICAgICAkeyBuZXcgSGlnaGxpZ2h0cygpIH1cbiAgICAgICR7IG5ldyBJbnRlZ3JhdGlvbnMoKSB9XG4gICAgYDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXX0=