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

var _Install = require("./view/Install");

var _Install2 = _interopRequireDefault(_Install);

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
  }).on(/install/, function () {
    return _ere.Region.register("content", function () {
      return new _Install2.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBVUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFHTSxPOzs7Ozs7Ozs7Ozs2QkFDSztBQUNQLGFBQU8sS0FBSyxPQUFaLGtCQUMwQixzQkFEMUIsRUFFd0IsZ0JBQVcsU0FBWCxDQUZ4QixFQUcwQixzQkFIMUI7QUFLRDs7Ozs7O0FBSUgsbUJBQVMsWUFBTTtBQUNiLGNBQ0csRUFESCxDQUNNLEtBRE4sRUFDYTtBQUFBLFdBQU0sWUFBTyxRQUFQLENBQWdCLFNBQWhCLEVBQTJCO0FBQUEsYUFBTSxtQkFBTjtBQUFBLEtBQTNCLENBQU47QUFBQSxHQURiLEVBRUcsRUFGSCxDQUVNLEtBRk4sRUFFYTtBQUFBLFdBQU0sWUFBTyxRQUFQLENBQWdCLFNBQWhCLEVBQTJCO0FBQUEsYUFBTSxtQkFBTjtBQUFBLEtBQTNCLENBQU47QUFBQSxHQUZiLEVBR0csRUFISCxDQUdNLFlBSE4sRUFHb0I7QUFBQSxXQUFNLFlBQU8sUUFBUCxDQUFnQixTQUFoQixFQUEyQjtBQUFBLGFBQU0seUJBQU47QUFBQSxLQUEzQixDQUFOO0FBQUEsR0FIcEIsRUFJRyxFQUpILENBSU0sU0FKTixFQUlpQjtBQUFBLFdBQU0sWUFBTyxRQUFQLENBQWdCLFNBQWhCLEVBQTJCO0FBQUEsYUFBTSx1QkFBTjtBQUFBLEtBQTNCLENBQU47QUFBQSxHQUpqQixFQUtHLEVBTEgsQ0FLTSxNQUxOLEVBS2M7QUFBQSxXQUFNLFlBQU8sUUFBUCxDQUFnQixTQUFoQixFQUEyQjtBQUFBLGFBQU0sb0JBQU47QUFBQSxLQUEzQixDQUFOO0FBQUEsR0FMZCxFQU1HLEVBTkgsQ0FNTSxZQUFPLEtBQVAsQ0FBYSxJQU5uQixFQU15QjtBQUFBLFdBQU0sWUFBTyxRQUFQLENBQWdCLE1BQWhCLENBQU47QUFBQSxHQU56QixFQU9HLEVBUEgsQ0FPTSxZQUFPLEtBQVAsQ0FBYSxHQVBuQixFQU93QjtBQUFBLFdBQU0sY0FBUyxNQUFULENBQWdCLG9CQUFlLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUFmLENBQWhCLEVBQWdFLElBQUksT0FBSixFQUFoRSxDQUFOO0FBQUEsR0FQeEIsRUFRRyxPQVJIOzs7QUFXQSwwQkFBYyxNQUFkO0FBQ0QsQ0FiRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9zdHlsZS9hcHBsaWNhdGlvbi5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGUvbmF2LmNzc1wiO1xuaW1wb3J0IFwiLi9zdHlsZS9kcm9wZG93bi5jc3NcIjtcbmltcG9ydCBcIi4vc3R5bGUvdXRpbHMuY3NzXCI7XG5pbXBvcnQgXCIuL3N0eWxlL2dpdGh1Yi1tYXJrZG93bi5jc3NcIjtcblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBET01FbGVtZW50LFxuICBET01SZWFkeSxcbiAgRXZlbnRpbmcsXG4gIFJlZ2lvbixcbiAgcmVuZGVyZXIsXG4gIHJvdXRlclxufSBmcm9tICcuL2pzL2VyZSc7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4vdmlldy9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIi4vdmlldy9Gb290ZXJcIjtcbmltcG9ydCBIb21lICAgZnJvbSBcIi4vdmlldy9Ib21lXCI7XG5pbXBvcnQgQVBJICAgIGZyb20gXCIuL3ZpZXcvQVBJXCI7XG5pbXBvcnQgQ0xJICAgIGZyb20gXCIuL3ZpZXcvQ0xJXCI7XG5pbXBvcnQgR3J1bnRUYXNrIGZyb20gXCIuL3ZpZXcvR3J1bnRUYXNrXCI7XG5pbXBvcnQgSW5zdGFsbCBmcm9tIFwiLi92aWV3L0luc3RhbGxcIjtcblxuaW1wb3J0IFNwZWNpYWxFZmZlY3QgZnJvbSBcIi4vZWZmZWN0cy9TcGVjaWFsRWZmZWN0XCI7XG5cblxuY2xhc3MgQXBwTWFpbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50IGBcbiAgICAgIDxkaXYgaWQ9XCJhcHAtaGVhZGVyXCI+JHsgbmV3IEhlYWRlcigpIH08L2Rpdj5cbiAgICAgIDxkaXYgaWQ9XCJhcHAtYm9keVwiPiR7IG5ldyBSZWdpb24oXCJjb250ZW50XCIpIH08L2Rpdj5cbiAgICAgIDxkaXYgaWQ9XCJhcHAtZm9vdGVyXCI+JHsgbmV3IEZvb3RlcigpIH08L2Rpdj5cbiAgICBgO1xuICB9XG59XG5cblxuRE9NUmVhZHkoKCkgPT4ge1xuICByb3V0ZXJcbiAgICAub24oL2FwaS8sICgpID0+IFJlZ2lvbi5yZWdpc3RlcihcImNvbnRlbnRcIiwgKCkgPT4gbmV3IEFQSSgpKSlcbiAgICAub24oL2NsaS8sICgpID0+IFJlZ2lvbi5yZWdpc3RlcihcImNvbnRlbnRcIiwgKCkgPT4gbmV3IENMSSgpKSlcbiAgICAub24oL2dydW50LXRhc2svLCAoKSA9PiBSZWdpb24ucmVnaXN0ZXIoXCJjb250ZW50XCIsICgpID0+IG5ldyBHcnVudFRhc2soKSkpXG4gICAgLm9uKC9pbnN0YWxsLywgKCkgPT4gUmVnaW9uLnJlZ2lzdGVyKFwiY29udGVudFwiLCAoKSA9PiBuZXcgSW5zdGFsbCgpKSlcbiAgICAub24oL2hvbWUvLCAoKSA9PiBSZWdpb24ucmVnaXN0ZXIoXCJjb250ZW50XCIsICgpID0+IG5ldyBIb21lKCkpKVxuICAgIC5vbihyb3V0ZXIubWF0Y2gubm9uZSwgKCkgPT4gcm91dGVyLm5hdmlnYXRlKFwiaG9tZVwiKSlcbiAgICAub24ocm91dGVyLm1hdGNoLmFsbCwgKCkgPT4gcmVuZGVyZXIucmVuZGVyKG5ldyBET01FbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKSwgbmV3IEFwcE1haW4oKSkpXG4gICAgLnJlZnJlc2goKTtcblxuICAvLyBNb3ZlIHRoaXMgdG8gdGhlIEhvbWUgdmlldyB0byBiZSBsb2FkZWQgZWFjaCB0aW1lIHRoZSBIb21lIHZpZXcgaXMgbG9hZGVkLlxuICBTcGVjaWFsRWZmZWN0LmNyZWF0ZSgpO1xufSk7XG5cbiJdfQ==