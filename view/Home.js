"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _templateObject = _taggedTemplateLiteral(["\n      <div class=\"canvas-wrap\">\n        <div class=\"canvas-content\">\n          <img id=\"bit-imports\" src=\"img/bit-imports.svg\" alt=\"bit imports\">\n          <h1>module loader for the browser</h1>\n        </div>\n        <div id=\"canvas\" class=\"canvas\"></div>\n      </div>\n    "], ["\n      <div class=\"canvas-wrap\">\n        <div class=\"canvas-content\">\n          <img id=\"bit-imports\" src=\"img/bit-imports.svg\" alt=\"bit imports\">\n          <h1>module loader for the browser</h1>\n        </div>\n        <div id=\"canvas\" class=\"canvas\"></div>\n      </div>\n    "]),
    _templateObject2 = _taggedTemplateLiteral(["\n      <div class=\"babel-view\">\n        <div class=\"wrapper\">\n          <section class=\"babel\">\n            <div class=\"text\">\n              <h4>\n                With the flexibility of bit-imports' plugin system, adding <a href=\"https://babeljs.io/\" target=\"_blank\">babeljs</a> support is very trivial\n              </h4>\n              <div>This means you can start using the newest ES features available, right in the browser without an out of band build process.</div>\n            </div>\n            <div class=\"media\">\n              <img src=\"img/babel.png\" alt=\"Babel\" class=\"babel-logo\">\n            </div>\n          </section>\n        </div>\n      </div>\n    "], ["\n      <div class=\"babel-view\">\n        <div class=\"wrapper\">\n          <section class=\"babel\">\n            <div class=\"text\">\n              <h4>\n                With the flexibility of bit-imports' plugin system, adding <a href=\"https://babeljs.io/\" target=\"_blank\">babeljs</a> support is very trivial\n              </h4>\n              <div>This means you can start using the newest ES features available, right in the browser without an out of band build process.</div>\n            </div>\n            <div class=\"media\">\n              <img src=\"img/babel.png\" alt=\"Babel\" class=\"babel-logo\">\n            </div>\n          </section>\n        </div>\n      </div>\n    "]),
    _templateObject3 = _taggedTemplateLiteral(["\n      ", "\n      ", "\n      ", "\n    "], ["\n      ", "\n      ", "\n      ", "\n    "]);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component4 = require("../js/Component");

var _Component5 = _interopRequireDefault(_Component4);

var _Highlights = require("./Highlights");

var _Highlights2 = _interopRequireDefault(_Highlights);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Description = (function (_Component) {
  _inherits(Description, _Component);

  function Description() {
    _classCallCheck(this, Description);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Description).apply(this, arguments));
  }

  _createClass(Description, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject);
    }
  }]);

  return Description;
})(_Component5.default);

var Babel = (function (_Component2) {
  _inherits(Babel, _Component2);

  function Babel() {
    _classCallCheck(this, Babel);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Babel).apply(this, arguments));
  }

  _createClass(Babel, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject2);
    }
  }]);

  return Babel;
})(_Component5.default);

var Home = (function (_Component3) {
  _inherits(Home, _Component3);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject3, new Description(), new _Highlights2.default(), new Babel());
    }
  }]);

  return Home;
})(_Component5.default);

exports.default = Home;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhvbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSU0sV0FBVztZQUFYLFdBQVc7O1dBQVgsV0FBVzswQkFBWCxXQUFXOztrRUFBWCxXQUFXOzs7ZUFBWCxXQUFXOzs2QkFDTjtBQUNQLGFBQU8sSUFBSSxDQUFDLE9BQU8sa0JBUWpCO0tBQ0g7OztTQVhHLFdBQVc7OztJQWVYLEtBQUs7WUFBTCxLQUFLOztXQUFMLEtBQUs7MEJBQUwsS0FBSzs7a0VBQUwsS0FBSzs7O2VBQUwsS0FBSzs7NkJBQ0E7QUFDUCxhQUFPLElBQUksQ0FBQyxPQUFPLG1CQWdCakI7S0FDSDs7O1NBbkJHLEtBQUs7OztJQXVCTCxJQUFJO1lBQUosSUFBSTs7V0FBSixJQUFJOzBCQUFKLElBQUk7O2tFQUFKLElBQUk7OztlQUFKLElBQUk7OzZCQUNDO0FBQ1AsYUFBTyxJQUFJLENBQUMsT0FBTyxtQkFDZCxJQUFJLFdBQVcsRUFBRSxFQUNqQiwwQkFBZ0IsRUFDaEIsSUFBSSxLQUFLLEVBQUUsRUFDZDtLQUNIOzs7U0FQRyxJQUFJOzs7a0JBV0ssSUFBSSIsImZpbGUiOiJIb21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vanMvQ29tcG9uZW50XCI7XG5pbXBvcnQgSGlnaGxpZ2h0cyBmcm9tIFwiLi9IaWdobGlnaHRzXCI7XG5cblxuY2xhc3MgRGVzY3JpcHRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudCBgXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FudmFzLXdyYXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbnZhcy1jb250ZW50XCI+XG4gICAgICAgICAgPGltZyBpZD1cImJpdC1pbXBvcnRzXCIgc3JjPVwiaW1nL2JpdC1pbXBvcnRzLnN2Z1wiIGFsdD1cImJpdCBpbXBvcnRzXCI+XG4gICAgICAgICAgPGgxPm1vZHVsZSBsb2FkZXIgZm9yIHRoZSBicm93c2VyPC9oMT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgaWQ9XCJjYW52YXNcIiBjbGFzcz1cImNhbnZhc1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5cbmNsYXNzIEJhYmVsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGRpdiBjbGFzcz1cImJhYmVsLXZpZXdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgICAgICA8c2VjdGlvbiBjbGFzcz1cImJhYmVsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPlxuICAgICAgICAgICAgICA8aDQ+XG4gICAgICAgICAgICAgICAgV2l0aCB0aGUgZmxleGliaWxpdHkgb2YgYml0LWltcG9ydHMnIHBsdWdpbiBzeXN0ZW0sIGFkZGluZyA8YSBocmVmPVwiaHR0cHM6Ly9iYWJlbGpzLmlvL1wiIHRhcmdldD1cIl9ibGFua1wiPmJhYmVsanM8L2E+IHN1cHBvcnQgaXMgdmVyeSB0cml2aWFsXG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDxkaXY+VGhpcyBtZWFucyB5b3UgY2FuIHN0YXJ0IHVzaW5nIHRoZSBuZXdlc3QgRVMgZmVhdHVyZXMgYXZhaWxhYmxlLCByaWdodCBpbiB0aGUgYnJvd3NlciB3aXRob3V0IGFuIG91dCBvZiBiYW5kIGJ1aWxkIHByb2Nlc3MuPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZWRpYVwiPlxuICAgICAgICAgICAgICA8aW1nIHNyYz1cImltZy9iYWJlbC5wbmdcIiBhbHQ9XCJCYWJlbFwiIGNsYXNzPVwiYmFiZWwtbG9nb1wiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuXG5jbGFzcyBIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgJHsgbmV3IERlc2NyaXB0aW9uKCkgfVxuICAgICAgJHsgbmV3IEhpZ2hsaWdodHMoKSB9XG4gICAgICAkeyBuZXcgQmFiZWwoKSB9XG4gICAgYDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXX0=