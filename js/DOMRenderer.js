"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMRenderer = (function () {
  function DOMRenderer() {
    _classCallCheck(this, DOMRenderer);
  }

  _createClass(DOMRenderer, [{
    key: "render",
    value: function render(container, items) {
      // Naive render. It would be nice to be able to remove/add only what's necessary.
      var html = DOMRenderer.__toString(items);
      container.html(html);
    }
  }], [{
    key: "__toString",
    value: function __toString(items) {
      if (!Array.isArray(items)) {
        items = [items];
      }

      var i,
          length,
          item,
          result = "";
      for (i = 0, length = items.length; i < length; i++) {
        item = items[i];
        result += item.render && item.render() || "";
      }

      return result;
    }
  }]);

  return DOMRenderer;
})();

exports.default = new DOMRenderer();
exports.DOMRenderer = DOMRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRPTVJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxXQUFXO0FBQ2YsV0FESSxXQUFXLEdBQ0Q7MEJBRFYsV0FBVztHQUVkOztlQUZHLFdBQVc7OzJCQUtSLFNBQVMsRUFBRSxLQUFLLEVBQUU7O0FBRXZCLFVBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsZUFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0Qjs7OytCQUdpQixLQUFLLEVBQUU7QUFDdkIsVUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDekIsYUFBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDakI7O0FBRUQsVUFBSSxDQUFDO1VBQUUsTUFBTTtVQUFFLElBQUk7VUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2pDLFdBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xELFlBQUksR0FBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsY0FBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztPQUM5Qzs7QUFFRCxhQUFPLE1BQU0sQ0FBQztLQUNmOzs7U0F4QkcsV0FBVzs7O2tCQTRCRixJQUFJLFdBQVcsRUFBRTtRQUN2QixXQUFXLEdBQVgsV0FBVyIsImZpbGUiOiJET01SZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIERPTVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuXG4gIHJlbmRlcihjb250YWluZXIsIGl0ZW1zKSB7XG4gICAgLy8gTmFpdmUgcmVuZGVyLiBJdCB3b3VsZCBiZSBuaWNlIHRvIGJlIGFibGUgdG8gcmVtb3ZlL2FkZCBvbmx5IHdoYXQncyBuZWNlc3NhcnkuXG4gICAgdmFyIGh0bWwgPSBET01SZW5kZXJlci5fX3RvU3RyaW5nKGl0ZW1zKTtcbiAgICBjb250YWluZXIuaHRtbChodG1sKTtcbiAgfVxuXG5cbiAgc3RhdGljIF9fdG9TdHJpbmcoaXRlbXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBpdGVtcyA9IFtpdGVtc107XG4gICAgfVxuXG4gICAgdmFyIGksIGxlbmd0aCwgaXRlbSwgcmVzdWx0ID0gXCJcIjtcbiAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaXRlbSAgICA9IGl0ZW1zW2ldO1xuICAgICAgcmVzdWx0ICs9IGl0ZW0ucmVuZGVyICYmIGl0ZW0ucmVuZGVyKCkgfHwgXCJcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgbmV3IERPTVJlbmRlcmVyKCk7XG5leHBvcnQgeyBET01SZW5kZXJlciB9O1xuIl19