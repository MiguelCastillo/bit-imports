"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <div id=\"app-header\">", "</div>\n      <div id=\"app-body\">", "</div>\n      <div id=\"app-footer\">", "</div>\n    "], ["\n      <div id=\"app-header\">", "</div>\n      <div id=\"app-body\">", "</div>\n      <div id=\"app-footer\">", "</div>\n    "]);

require("./style/application.css");

require("./style/nav.css");

require("./style/dropdown.css");

require("./style/utils.css");

require("./style/github-markdown.css");

var _ere = require("./js/ere");

var _Header = require("./view/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require("./view/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _Home = require("./view/Home");

var _Home2 = _interopRequireDefault(_Home);

var _API = require("./view/API");

var _API2 = _interopRequireDefault(_API);

var _CLI = require("./view/CLI");

var _CLI2 = _interopRequireDefault(_CLI);

var _SpecialEffect = require("./effects/SpecialEffect");

var _SpecialEffect2 = _interopRequireDefault(_SpecialEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppMain = function (_Component) {
  _inherits(AppMain, _Component);

  function AppMain() {
    _classCallCheck(this, AppMain);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AppMain).apply(this, arguments));
  }

  _createClass(AppMain, [{
    key: "render",
    value: function render() {
      return this.content(_templateObject, new _Header2.default(), new _ere.Region("content"), new _Footer2.default());
    }
  }]);

  return AppMain;
}(_ere.Component);

(0, _ere.DOMReady)(function () {
  _ere.router.on(/api/, function () {
    return _ere.Region.register("content", function () {
      return new _API2.default();
    });
  }).on(/cli/, function () {
    return _ere.Region.register("content", function () {
      return new _CLI2.default();
    });
  }).on(/home/, function () {
    return _ere.Region.register("content", function () {
      return new _Home2.default();
    });
  }).on(_ere.router.match.none, function () {
    return _ere.router.navigate("home");
  }).on(_ere.router.match.all, function () {
    return _ere.renderer.render(new _ere.DOMElement(document.getElementById("app")), new AppMain());
  }).refresh();

  // Move this to the Home view to be loaded each time the Home view is loaded.
  _SpecialEffect2.default.create();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBVUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUdNLE87Ozs7Ozs7Ozs7OzZCQUNLO0FBQ1AsYUFBTyxLQUFLLE9BQVosa0JBQzBCLHNCQUQxQixFQUV3QixnQkFBVyxTQUFYLENBRnhCLEVBRzBCLHNCQUgxQjtBQUtEOzs7Ozs7QUFJSCxtQkFBUyxZQUFNO0FBQ2IsY0FDRyxFQURILENBQ00sS0FETixFQUNhO0FBQUEsV0FBTSxZQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsRUFBMkI7QUFBQSxhQUFNLG1CQUFOO0FBQUEsS0FBM0IsQ0FBTjtBQUFBLEdBRGIsRUFFRyxFQUZILENBRU0sS0FGTixFQUVhO0FBQUEsV0FBTSxZQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsRUFBMkI7QUFBQSxhQUFNLG1CQUFOO0FBQUEsS0FBM0IsQ0FBTjtBQUFBLEdBRmIsRUFHRyxFQUhILENBR00sTUFITixFQUdjO0FBQUEsV0FBTSxZQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsRUFBMkI7QUFBQSxhQUFNLG9CQUFOO0FBQUEsS0FBM0IsQ0FBTjtBQUFBLEdBSGQsRUFJRyxFQUpILENBSU0sWUFBTyxLQUFQLENBQWEsSUFKbkIsRUFJeUI7QUFBQSxXQUFNLFlBQU8sUUFBUCxDQUFnQixNQUFoQixDQUFOO0FBQUEsR0FKekIsRUFLRyxFQUxILENBS00sWUFBTyxLQUFQLENBQWEsR0FMbkIsRUFLd0I7QUFBQSxXQUFNLGNBQVMsTUFBVCxDQUFnQixvQkFBZSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBZixDQUFoQixFQUFnRSxJQUFJLE9BQUosRUFBaEUsQ0FBTjtBQUFBLEdBTHhCLEVBTUcsT0FOSDs7O0FBU0EsMEJBQWMsTUFBZDtBQUNELENBWEQiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc3R5bGUvYXBwbGljYXRpb24uY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlL25hdi5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGUvZHJvcGRvd24uY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlL3V0aWxzLmNzc1wiO1xuaW1wb3J0IFwiLi9zdHlsZS9naXRodWItbWFya2Rvd24uY3NzXCI7XG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRE9NRWxlbWVudCxcbiAgRE9NUmVhZHksXG4gIEV2ZW50aW5nLFxuICBSZWdpb24sXG4gIHJlbmRlcmVyLFxuICByb3V0ZXJcbn0gZnJvbSAnLi9qcy9lcmUnO1xuXG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL3ZpZXcvSGVhZGVyXCI7XG5pbXBvcnQgRm9vdGVyIGZyb20gXCIuL3ZpZXcvRm9vdGVyXCI7XG5pbXBvcnQgSG9tZSAgIGZyb20gXCIuL3ZpZXcvSG9tZVwiO1xuaW1wb3J0IEFQSSAgICBmcm9tIFwiLi92aWV3L0FQSVwiO1xuaW1wb3J0IENMSSAgICBmcm9tIFwiLi92aWV3L0NMSVwiO1xuXG5pbXBvcnQgU3BlY2lhbEVmZmVjdCBmcm9tIFwiLi9lZmZlY3RzL1NwZWNpYWxFZmZlY3RcIjtcblxuXG5jbGFzcyBBcHBNYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGRpdiBpZD1cImFwcC1oZWFkZXJcIj4keyBuZXcgSGVhZGVyKCkgfTwvZGl2PlxuICAgICAgPGRpdiBpZD1cImFwcC1ib2R5XCI+JHsgbmV3IFJlZ2lvbihcImNvbnRlbnRcIikgfTwvZGl2PlxuICAgICAgPGRpdiBpZD1cImFwcC1mb290ZXJcIj4keyBuZXcgRm9vdGVyKCkgfTwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuXG5ET01SZWFkeSgoKSA9PiB7XG4gIHJvdXRlclxuICAgIC5vbigvYXBpLywgKCkgPT4gUmVnaW9uLnJlZ2lzdGVyKFwiY29udGVudFwiLCAoKSA9PiBuZXcgQVBJKCkpKVxuICAgIC5vbigvY2xpLywgKCkgPT4gUmVnaW9uLnJlZ2lzdGVyKFwiY29udGVudFwiLCAoKSA9PiBuZXcgQ0xJKCkpKVxuICAgIC5vbigvaG9tZS8sICgpID0+IFJlZ2lvbi5yZWdpc3RlcihcImNvbnRlbnRcIiwgKCkgPT4gbmV3IEhvbWUoKSkpXG4gICAgLm9uKHJvdXRlci5tYXRjaC5ub25lLCAoKSA9PiByb3V0ZXIubmF2aWdhdGUoXCJob21lXCIpKVxuICAgIC5vbihyb3V0ZXIubWF0Y2guYWxsLCAoKSA9PiByZW5kZXJlci5yZW5kZXIobmV3IERPTUVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcHBcIikpLCBuZXcgQXBwTWFpbigpKSlcbiAgICAucmVmcmVzaCgpO1xuXG4gIC8vIE1vdmUgdGhpcyB0byB0aGUgSG9tZSB2aWV3IHRvIGJlIGxvYWRlZCBlYWNoIHRpbWUgdGhlIEhvbWUgdmlldyBpcyBsb2FkZWQuXG4gIFNwZWNpYWxFZmZlY3QuY3JlYXRlKCk7XG59KTtcblxuIl19