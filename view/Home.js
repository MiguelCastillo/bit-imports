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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUdNLEk7Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTyxLQUFLLE9BQVosa0JBQ0ssc0JBREwsRUFFSywwQkFGTCxFQUdLLDRCQUhMO0FBS0Q7Ozs7OztrQkFJWSxJIiwiZmlsZSI6IkhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuLi9qcy9Db21wb25lbnRcIjtcbmltcG9ydCBCYW5uZXIgZnJvbSBcIi4vQmFubmVyXCI7XG5pbXBvcnQgSW50ZWdyYXRpb25zIGZyb20gXCIuL0ludGVncmF0aW9uc1wiO1xuaW1wb3J0IEhpZ2hsaWdodHMgZnJvbSBcIi4vSGlnaGxpZ2h0c1wiO1xuXG5cbmNsYXNzIEhvbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudCBgXG4gICAgICAkeyBuZXcgQmFubmVyKCkgfVxuICAgICAgJHsgbmV3IEhpZ2hsaWdodHMoKSB9XG4gICAgICAkeyBuZXcgSW50ZWdyYXRpb25zKCkgfVxuICAgIGA7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIl19