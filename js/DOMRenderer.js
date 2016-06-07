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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRPTVJlbmRlcmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTSxXO0FBQ0oseUJBQWM7QUFBQTtBQUNiOzs7OzJCQUdNLFMsRUFBVyxLLEVBQU87O0FBRXZCLFVBQUksT0FBTyxZQUFZLFVBQVosQ0FBdUIsS0FBdkIsQ0FBWDtBQUNBLGdCQUFVLElBQVYsQ0FBZSxJQUFmO0FBQ0Q7OzsrQkFHaUIsSyxFQUFPO0FBQ3ZCLFVBQUksQ0FBQyxNQUFNLE9BQU4sQ0FBYyxLQUFkLENBQUwsRUFBMkI7QUFDekIsZ0JBQVEsQ0FBQyxLQUFELENBQVI7QUFDRDs7QUFFRCxVQUFJLENBQUo7VUFBTyxNQUFQO1VBQWUsSUFBZjtVQUFxQixTQUFTLEVBQTlCO0FBQ0EsV0FBSyxJQUFJLENBQUosRUFBTyxTQUFTLE1BQU0sTUFBM0IsRUFBbUMsSUFBSSxNQUF2QyxFQUErQyxHQUEvQyxFQUFvRDtBQUNsRCxlQUFVLE1BQU0sQ0FBTixDQUFWO0FBQ0Esa0JBQVUsS0FBSyxNQUFMLElBQWUsS0FBSyxNQUFMLEVBQWYsSUFBZ0MsRUFBMUM7QUFDRDs7QUFFRCxhQUFPLE1BQVA7QUFDRDs7Ozs7O2tCQUlZLElBQUksV0FBSixFO1FBQ04sVyxHQUFBLFciLCJmaWxlIjoiRE9NUmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBET01SZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cblxuICByZW5kZXIoY29udGFpbmVyLCBpdGVtcykge1xuICAgIC8vIE5haXZlIHJlbmRlci4gSXQgd291bGQgYmUgbmljZSB0byBiZSBhYmxlIHRvIHJlbW92ZS9hZGQgb25seSB3aGF0J3MgbmVjZXNzYXJ5LlxuICAgIHZhciBodG1sID0gRE9NUmVuZGVyZXIuX190b1N0cmluZyhpdGVtcyk7XG4gICAgY29udGFpbmVyLmh0bWwoaHRtbCk7XG4gIH1cblxuXG4gIHN0YXRpYyBfX3RvU3RyaW5nKGl0ZW1zKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgaXRlbXMgPSBbaXRlbXNdO1xuICAgIH1cblxuICAgIHZhciBpLCBsZW5ndGgsIGl0ZW0sIHJlc3VsdCA9IFwiXCI7XG4gICAgZm9yIChpID0gMCwgbGVuZ3RoID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGl0ZW0gICAgPSBpdGVtc1tpXTtcbiAgICAgIHJlc3VsdCArPSBpdGVtLnJlbmRlciAmJiBpdGVtLnJlbmRlcigpIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBET01SZW5kZXJlcigpO1xuZXhwb3J0IHsgRE9NUmVuZGVyZXIgfTtcbiJdfQ==