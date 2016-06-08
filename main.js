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

var _GruntTask = require("./view/GruntTask");

var _GruntTask2 = _interopRequireDefault(_GruntTask);

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
  }).on(/grunt-task/, function () {
    return _ere.Region.register("content", function () {
      return new _GruntTask2.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBVUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBR00sTzs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUFPLEtBQUssT0FBWixrQkFDMEIsc0JBRDFCLEVBRXdCLGdCQUFXLFNBQVgsQ0FGeEIsRUFHMEIsc0JBSDFCO0FBS0Q7Ozs7OztBQUlILG1CQUFTLFlBQU07QUFDYixjQUNHLEVBREgsQ0FDTSxLQUROLEVBQ2E7QUFBQSxXQUFNLFlBQU8sUUFBUCxDQUFnQixTQUFoQixFQUEyQjtBQUFBLGFBQU0sbUJBQU47QUFBQSxLQUEzQixDQUFOO0FBQUEsR0FEYixFQUVHLEVBRkgsQ0FFTSxLQUZOLEVBRWE7QUFBQSxXQUFNLFlBQU8sUUFBUCxDQUFnQixTQUFoQixFQUEyQjtBQUFBLGFBQU0sbUJBQU47QUFBQSxLQUEzQixDQUFOO0FBQUEsR0FGYixFQUdHLEVBSEgsQ0FHTSxZQUhOLEVBR29CO0FBQUEsV0FBTSxZQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsRUFBMkI7QUFBQSxhQUFNLHlCQUFOO0FBQUEsS0FBM0IsQ0FBTjtBQUFBLEdBSHBCLEVBSUcsRUFKSCxDQUlNLE1BSk4sRUFJYztBQUFBLFdBQU0sWUFBTyxRQUFQLENBQWdCLFNBQWhCLEVBQTJCO0FBQUEsYUFBTSxvQkFBTjtBQUFBLEtBQTNCLENBQU47QUFBQSxHQUpkLEVBS0csRUFMSCxDQUtNLFlBQU8sS0FBUCxDQUFhLElBTG5CLEVBS3lCO0FBQUEsV0FBTSxZQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBTjtBQUFBLEdBTHpCLEVBTUcsRUFOSCxDQU1NLFlBQU8sS0FBUCxDQUFhLEdBTm5CLEVBTXdCO0FBQUEsV0FBTSxjQUFTLE1BQVQsQ0FBZ0Isb0JBQWUsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQWYsQ0FBaEIsRUFBZ0UsSUFBSSxPQUFKLEVBQWhFLENBQU47QUFBQSxHQU54QixFQU9HLE9BUEg7OztBQVVBLDBCQUFjLE1BQWQ7QUFDRCxDQVpEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3N0eWxlL2FwcGxpY2F0aW9uLmNzc1wiO1xuaW1wb3J0IFwiLi9zdHlsZS9uYXYuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlL2Ryb3Bkb3duLmNzc1wiO1xuaW1wb3J0IFwiLi9zdHlsZS91dGlscy5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGUvZ2l0aHViLW1hcmtkb3duLmNzc1wiO1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERPTUVsZW1lbnQsXG4gIERPTVJlYWR5LFxuICBFdmVudGluZyxcbiAgUmVnaW9uLFxuICByZW5kZXJlcixcbiAgcm91dGVyXG59IGZyb20gJy4vanMvZXJlJztcblxuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi92aWV3L0hlYWRlclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiLi92aWV3L0Zvb3RlclwiO1xuaW1wb3J0IEhvbWUgICBmcm9tIFwiLi92aWV3L0hvbWVcIjtcbmltcG9ydCBBUEkgICAgZnJvbSBcIi4vdmlldy9BUElcIjtcbmltcG9ydCBDTEkgICAgZnJvbSBcIi4vdmlldy9DTElcIjtcbmltcG9ydCBHcnVudFRhc2sgZnJvbSBcIi4vdmlldy9HcnVudFRhc2tcIlxuXG5pbXBvcnQgU3BlY2lhbEVmZmVjdCBmcm9tIFwiLi9lZmZlY3RzL1NwZWNpYWxFZmZlY3RcIjtcblxuXG5jbGFzcyBBcHBNYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGRpdiBpZD1cImFwcC1oZWFkZXJcIj4keyBuZXcgSGVhZGVyKCkgfTwvZGl2PlxuICAgICAgPGRpdiBpZD1cImFwcC1ib2R5XCI+JHsgbmV3IFJlZ2lvbihcImNvbnRlbnRcIikgfTwvZGl2PlxuICAgICAgPGRpdiBpZD1cImFwcC1mb290ZXJcIj4keyBuZXcgRm9vdGVyKCkgfTwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuXG5ET01SZWFkeSgoKSA9PiB7XG4gIHJvdXRlclxuICAgIC5vbigvYXBpLywgKCkgPT4gUmVnaW9uLnJlZ2lzdGVyKFwiY29udGVudFwiLCAoKSA9PiBuZXcgQVBJKCkpKVxuICAgIC5vbigvY2xpLywgKCkgPT4gUmVnaW9uLnJlZ2lzdGVyKFwiY29udGVudFwiLCAoKSA9PiBuZXcgQ0xJKCkpKVxuICAgIC5vbigvZ3J1bnQtdGFzay8sICgpID0+IFJlZ2lvbi5yZWdpc3RlcihcImNvbnRlbnRcIiwgKCkgPT4gbmV3IEdydW50VGFzaygpKSlcbiAgICAub24oL2hvbWUvLCAoKSA9PiBSZWdpb24ucmVnaXN0ZXIoXCJjb250ZW50XCIsICgpID0+IG5ldyBIb21lKCkpKVxuICAgIC5vbihyb3V0ZXIubWF0Y2gubm9uZSwgKCkgPT4gcm91dGVyLm5hdmlnYXRlKFwiaG9tZVwiKSlcbiAgICAub24ocm91dGVyLm1hdGNoLmFsbCwgKCkgPT4gcmVuZGVyZXIucmVuZGVyKG5ldyBET01FbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKSwgbmV3IEFwcE1haW4oKSkpXG4gICAgLnJlZnJlc2goKTtcblxuICAvLyBNb3ZlIHRoaXMgdG8gdGhlIEhvbWUgdmlldyB0byBiZSBsb2FkZWQgZWFjaCB0aW1lIHRoZSBIb21lIHZpZXcgaXMgbG9hZGVkLlxuICBTcGVjaWFsRWZmZWN0LmNyZWF0ZSgpO1xufSk7XG5cbiJdfQ==