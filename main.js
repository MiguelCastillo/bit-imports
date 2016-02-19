"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var AppMain = (function (_Component) {
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
})(_ere.Component);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9CTSxPQUFPO1lBQVAsT0FBTzs7V0FBUCxPQUFPOzBCQUFQLE9BQU87O2tFQUFQLE9BQU87OztlQUFQLE9BQU87OzZCQUNGO0FBQ1AsYUFBTyxJQUFJLENBQUMsT0FBTyxrQkFDTyxzQkFBWSxFQUNkLFNBakIxQixNQUFNLENBaUIrQixTQUFTLENBQUMsRUFDbkIsc0JBQVksRUFDcEM7S0FDSDs7O1NBUEcsT0FBTztRQWpCWCxTQUFTOztBQTRCWCxTQTFCRSxRQUFRLEVBMEJELFlBQU07QUFDYixPQXZCQSxNQUFNLENBd0JILEVBQUUsQ0FBQyxNQUFNLEVBQUU7V0FBTSxLQTFCcEIsTUFBTSxDQTBCcUIsUUFBUSxDQUFDLFNBQVMsRUFBRTthQUFNLG9CQUFVO0tBQUEsQ0FBQztHQUFBLENBQUMsQ0FDOUQsRUFBRSxDQUFDLE1BQU0sRUFBRTtXQUFNLEtBM0JwQixNQUFNLENBMkJxQixRQUFRLENBQUMsU0FBUyxFQUFFO2FBQU0sb0JBQVU7S0FBQSxDQUFDO0dBQUEsQ0FBQyxDQUM5RCxFQUFFLENBQUMsS0ExQk4sTUFBTSxDQTBCTyxLQUFLLENBQUMsSUFBSSxFQUFFO1dBQU0sS0ExQi9CLE1BQU0sQ0EwQmdDLFFBQVEsQ0FBQyxNQUFNLENBQUM7R0FBQSxDQUFDLENBQ3BELEVBQUUsQ0FBQyxLQTNCTixNQUFNLENBMkJPLEtBQUssQ0FBQyxHQUFHLEVBQUU7V0FBTSxLQTVCOUIsUUFBUSxDQTRCK0IsTUFBTSxDQUFDLFNBaEM5QyxVQUFVLENBZ0NtRCxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLEVBQUUsQ0FBQztHQUFBLENBQUMsQ0FDMUcsT0FBTyxFQUFFOzs7QUFBQyxBQUdiLDBCQUFjLE1BQU0sRUFBRSxDQUFDO0NBQ3hCLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9zdHlsZS9hcHBsaWNhdGlvbi5jc3NcIjtcblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBET01FbGVtZW50LFxuICBET01SZWFkeSxcbiAgRXZlbnRpbmcsXG4gIFJlZ2lvbixcbiAgcmVuZGVyZXIsXG4gIHJvdXRlclxufSBmcm9tICcuL2pzL2VyZSc7XG5cbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4vdmlldy9IZWFkZXJcIjtcbmltcG9ydCBGb290ZXIgZnJvbSBcIi4vdmlldy9Gb290ZXJcIjtcbmltcG9ydCBIb21lICAgZnJvbSBcIi4vdmlldy9Ib21lXCI7XG5pbXBvcnQgRG9jcyAgIGZyb20gXCIuL3ZpZXcvRG9jc1wiO1xuXG5pbXBvcnQgU3BlY2lhbEVmZmVjdCBmcm9tIFwiLi9lZmZlY3RzL1NwZWNpYWxFZmZlY3RcIjtcblxuXG5jbGFzcyBBcHBNYWluIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQgYFxuICAgICAgPGRpdiBpZD1cImFwcC1oZWFkZXJcIj4keyBuZXcgSGVhZGVyKCkgfTwvZGl2PlxuICAgICAgPGRpdiBpZD1cImFwcC1ib2R5XCI+JHsgbmV3IFJlZ2lvbihcImNvbnRlbnRcIikgfTwvZGl2PlxuICAgICAgPGRpdiBpZD1cImFwcC1mb290ZXJcIj4keyBuZXcgRm9vdGVyKCkgfTwvZGl2PlxuICAgIGA7XG4gIH1cbn1cblxuXG5ET01SZWFkeSgoKSA9PiB7XG4gIHJvdXRlclxuICAgIC5vbigvZG9jcy8sICgpID0+IFJlZ2lvbi5yZWdpc3RlcihcImNvbnRlbnRcIiwgKCkgPT4gbmV3IERvY3MoKSkpXG4gICAgLm9uKC9ob21lLywgKCkgPT4gUmVnaW9uLnJlZ2lzdGVyKFwiY29udGVudFwiLCAoKSA9PiBuZXcgSG9tZSgpKSlcbiAgICAub24ocm91dGVyLm1hdGNoLm5vbmUsICgpID0+IHJvdXRlci5uYXZpZ2F0ZShcImhvbWVcIikpXG4gICAgLm9uKHJvdXRlci5tYXRjaC5hbGwsICgpID0+IHJlbmRlcmVyLnJlbmRlcihuZXcgRE9NRWxlbWVudChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFwcFwiKSksIG5ldyBBcHBNYWluKCkpKVxuICAgIC5yZWZyZXNoKCk7XG5cbiAgLy8gTW92ZSB0aGlzIHRvIHRoZSBIb21lIHZpZXcgdG8gYmUgbG9hZGVkIGVhY2ggdGltZSB0aGUgSG9tZSB2aWV3IGlzIGxvYWRlZC5cbiAgU3BlY2lhbEVmZmVjdC5jcmVhdGUoKTtcbn0pO1xuXG4iXX0=