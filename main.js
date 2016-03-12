"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      <div id=\"app-header\">", "</div>\n      <div id=\"app-body\">", "</div>\n      <div id=\"app-footer\">", "</div>\n    "], ["\n      <div id=\"app-header\">", "</div>\n      <div id=\"app-body\">", "</div>\n      <div id=\"app-footer\">", "</div>\n    "]);

require("./style/application.css");

var _ere = require("./js/ere");

var _Header = require("./view/Header");

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require("./view/Footer");

var _Footer2 = _interopRequireDefault(_Footer);

var _Home = require("./view/Home");

var _Home2 = _interopRequireDefault(_Home);

var _Docs = require("./view/Docs");

var _Docs2 = _interopRequireDefault(_Docs);

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
  _ere.router.on(/docs/, function () {
    return _ere.Region.register("content", function () {
      return new _Docs2.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9CTTs7Ozs7Ozs7Ozs7NkJBQ0s7QUFDUCxhQUFPLEtBQUssT0FBTCxrQkFDbUIsd0JBQ0YsZ0JBQVcsU0FBWCxHQUNFLHVCQUgxQixDQURPOzs7O1NBREw7OztBQVdOLG1CQUFTLFlBQU07QUFDYixjQUNHLEVBREgsQ0FDTSxNQUROLEVBQ2M7V0FBTSxZQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsRUFBMkI7YUFBTTtLQUFOO0dBQWpDLENBRGQsQ0FFRyxFQUZILENBRU0sTUFGTixFQUVjO1dBQU0sWUFBTyxRQUFQLENBQWdCLFNBQWhCLEVBQTJCO2FBQU07S0FBTjtHQUFqQyxDQUZkLENBR0csRUFISCxDQUdNLFlBQU8sS0FBUCxDQUFhLElBQWIsRUFBbUI7V0FBTSxZQUFPLFFBQVAsQ0FBZ0IsTUFBaEI7R0FBTixDQUh6QixDQUlHLEVBSkgsQ0FJTSxZQUFPLEtBQVAsQ0FBYSxHQUFiLEVBQWtCO1dBQU0sY0FBUyxNQUFULENBQWdCLG9CQUFlLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUFmLENBQWhCLEVBQWdFLElBQUksT0FBSixFQUFoRTtHQUFOLENBSnhCLENBS0csT0FMSDs7O0FBRGEseUJBU2IsQ0FBYyxNQUFkLEdBVGE7Q0FBTixDQUFUIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3N0eWxlL2FwcGxpY2F0aW9uLmNzc1wiO1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERPTUVsZW1lbnQsXG4gIERPTVJlYWR5LFxuICBFdmVudGluZyxcbiAgUmVnaW9uLFxuICByZW5kZXJlcixcbiAgcm91dGVyXG59IGZyb20gJy4vanMvZXJlJztcblxuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi92aWV3L0hlYWRlclwiO1xuaW1wb3J0IEZvb3RlciBmcm9tIFwiLi92aWV3L0Zvb3RlclwiO1xuaW1wb3J0IEhvbWUgICBmcm9tIFwiLi92aWV3L0hvbWVcIjtcbmltcG9ydCBEb2NzICAgZnJvbSBcIi4vdmlldy9Eb2NzXCI7XG5cbmltcG9ydCBTcGVjaWFsRWZmZWN0IGZyb20gXCIuL2VmZmVjdHMvU3BlY2lhbEVmZmVjdFwiO1xuXG5cbmNsYXNzIEFwcE1haW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudCBgXG4gICAgICA8ZGl2IGlkPVwiYXBwLWhlYWRlclwiPiR7IG5ldyBIZWFkZXIoKSB9PC9kaXY+XG4gICAgICA8ZGl2IGlkPVwiYXBwLWJvZHlcIj4keyBuZXcgUmVnaW9uKFwiY29udGVudFwiKSB9PC9kaXY+XG4gICAgICA8ZGl2IGlkPVwiYXBwLWZvb3RlclwiPiR7IG5ldyBGb290ZXIoKSB9PC9kaXY+XG4gICAgYDtcbiAgfVxufVxuXG5cbkRPTVJlYWR5KCgpID0+IHtcbiAgcm91dGVyXG4gICAgLm9uKC9kb2NzLywgKCkgPT4gUmVnaW9uLnJlZ2lzdGVyKFwiY29udGVudFwiLCAoKSA9PiBuZXcgRG9jcygpKSlcbiAgICAub24oL2hvbWUvLCAoKSA9PiBSZWdpb24ucmVnaXN0ZXIoXCJjb250ZW50XCIsICgpID0+IG5ldyBIb21lKCkpKVxuICAgIC5vbihyb3V0ZXIubWF0Y2gubm9uZSwgKCkgPT4gcm91dGVyLm5hdmlnYXRlKFwiaG9tZVwiKSlcbiAgICAub24ocm91dGVyLm1hdGNoLmFsbCwgKCkgPT4gcmVuZGVyZXIucmVuZGVyKG5ldyBET01FbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXBwXCIpKSwgbmV3IEFwcE1haW4oKSkpXG4gICAgLnJlZnJlc2goKTtcblxuICAvLyBNb3ZlIHRoaXMgdG8gdGhlIEhvbWUgdmlldyB0byBiZSBsb2FkZWQgZWFjaCB0aW1lIHRoZSBIb21lIHZpZXcgaXMgbG9hZGVkLlxuICBTcGVjaWFsRWZmZWN0LmNyZWF0ZSgpO1xufSk7XG5cbiJdfQ==