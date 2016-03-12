"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMRenderer = function () {
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
}();

exports.default = new DOMRenderer();
exports.DOMRenderer = DOMRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRPTVJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTTtBQUNKLFdBREksV0FDSixHQUFjOzBCQURWLGFBQ1U7R0FBZDs7ZUFESTs7MkJBS0csV0FBVyxPQUFPOztBQUV2QixVQUFJLE9BQU8sWUFBWSxVQUFaLENBQXVCLEtBQXZCLENBQVAsQ0FGbUI7QUFHdkIsZ0JBQVUsSUFBVixDQUFlLElBQWYsRUFIdUI7Ozs7K0JBT1AsT0FBTztBQUN2QixVQUFJLENBQUMsTUFBTSxPQUFOLENBQWMsS0FBZCxDQUFELEVBQXVCO0FBQ3pCLGdCQUFRLENBQUMsS0FBRCxDQUFSLENBRHlCO09BQTNCOztBQUlBLFVBQUksQ0FBSjtVQUFPLE1BQVA7VUFBZSxJQUFmO1VBQXFCLFNBQVMsRUFBVCxDQUxFO0FBTXZCLFdBQUssSUFBSSxDQUFKLEVBQU8sU0FBUyxNQUFNLE1BQU4sRUFBYyxJQUFJLE1BQUosRUFBWSxHQUEvQyxFQUFvRDtBQUNsRCxlQUFVLE1BQU0sQ0FBTixDQUFWLENBRGtEO0FBRWxELGtCQUFVLEtBQUssTUFBTCxJQUFlLEtBQUssTUFBTCxFQUFmLElBQWdDLEVBQWhDLENBRndDO09BQXBEOztBQUtBLGFBQU8sTUFBUCxDQVh1Qjs7OztTQVpyQjs7O2tCQTRCUyxJQUFJLFdBQUo7UUFDTiIsImZpbGUiOiJET01SZW5kZXJlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIERPTVJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuXG4gIHJlbmRlcihjb250YWluZXIsIGl0ZW1zKSB7XG4gICAgLy8gTmFpdmUgcmVuZGVyLiBJdCB3b3VsZCBiZSBuaWNlIHRvIGJlIGFibGUgdG8gcmVtb3ZlL2FkZCBvbmx5IHdoYXQncyBuZWNlc3NhcnkuXG4gICAgdmFyIGh0bWwgPSBET01SZW5kZXJlci5fX3RvU3RyaW5nKGl0ZW1zKTtcbiAgICBjb250YWluZXIuaHRtbChodG1sKTtcbiAgfVxuXG5cbiAgc3RhdGljIF9fdG9TdHJpbmcoaXRlbXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBpdGVtcyA9IFtpdGVtc107XG4gICAgfVxuXG4gICAgdmFyIGksIGxlbmd0aCwgaXRlbSwgcmVzdWx0ID0gXCJcIjtcbiAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaXRlbSAgICA9IGl0ZW1zW2ldO1xuICAgICAgcmVzdWx0ICs9IGl0ZW0ucmVuZGVyICYmIGl0ZW0ucmVuZGVyKCkgfHwgXCJcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgbmV3IERPTVJlbmRlcmVyKCk7XG5leHBvcnQgeyBET01SZW5kZXJlciB9O1xuIl19