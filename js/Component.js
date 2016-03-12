"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Component);

    this.options = options;
  }

  _createClass(Component, [{
    key: "render",
    value: function render() {
      throw new TypeError("Must be implemented");
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var _renderContext = this.renderContext;
      var chunks = _renderContext.chunks;
      var params = _renderContext.params;

      var result = chunks[0];
      var i, length;

      for (i = 0, length = params.length; i < length; i++) {
        result += processChildren(this, params[i]) + chunks[i + 1];
      }

      return result;
    }
  }, {
    key: "content",
    value: function content(chunks) {
      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      return this._setRenderContext({ chunks: chunks, params: params }).refresh();
    }
  }, {
    key: "_setOwner",
    value: function _setOwner(owner) {
      this.owner = owner;
      return this;
    }
  }, {
    key: "_setRenderContext",
    value: function _setRenderContext(context) {
      this.renderContext = context;
      return this;
    }
  }]);

  return Component;
}();

function processChildren(parent, components) {
  if (!Array.isArray(components)) {
    components = [components];
  }

  return components.map(function (component) {
    return typeof component === "function" ? component() : component;
  }).map(function (component) {
    return component instanceof Component ? component._setOwner(parent).render() : component;
  }).reduce(function (html, component) {
    if (typeof component === "string") {
      return html + component;
    }
    return html;
  }, '');
}

exports.default = Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQU07QUFDSixXQURJLFNBQ0osR0FBMEI7UUFBZCxnRUFBVSxrQkFBSTs7MEJBRHRCLFdBQ3NCOztBQUN4QixTQUFLLE9BQUwsR0FBZSxPQUFmLENBRHdCO0dBQTFCOztlQURJOzs2QkFLSztBQUNQLFlBQU0sSUFBSSxTQUFKLENBQWMscUJBQWQsQ0FBTixDQURPOzs7OzhCQUlDOzJCQUNpQixLQUFLLGFBQUwsQ0FEakI7VUFDRiwrQkFERTtVQUNNLCtCQUROOztBQUVSLFVBQUksU0FBUyxPQUFPLENBQVAsQ0FBVCxDQUZJO0FBR1IsVUFBSSxDQUFKLEVBQU8sTUFBUCxDQUhROztBQUtSLFdBQUssSUFBSSxDQUFKLEVBQU8sU0FBUyxPQUFPLE1BQVAsRUFBZSxJQUFJLE1BQUosRUFBWSxHQUFoRCxFQUFxRDtBQUNuRCxrQkFBVSxnQkFBZ0IsSUFBaEIsRUFBc0IsT0FBTyxDQUFQLENBQXRCLElBQW1DLE9BQU8sSUFBSSxDQUFKLENBQTFDLENBRHlDO09BQXJEOztBQUlBLGFBQU8sTUFBUCxDQVRROzs7OzRCQVlGLFFBQW1CO3dDQUFSOztPQUFROztBQUN6QixhQUFPLEtBQ0osaUJBREksQ0FDYyxFQUFFLGNBQUYsRUFBVSxjQUFWLEVBRGQsRUFFSixPQUZJLEVBQVAsQ0FEeUI7Ozs7OEJBTWpCLE9BQU87QUFDZixXQUFLLEtBQUwsR0FBYSxLQUFiLENBRGU7QUFFZixhQUFPLElBQVAsQ0FGZTs7OztzQ0FLQyxTQUFTO0FBQ3pCLFdBQUssYUFBTCxHQUFxQixPQUFyQixDQUR5QjtBQUV6QixhQUFPLElBQVAsQ0FGeUI7Ozs7U0FoQ3ZCOzs7QUF1Q04sU0FBUyxlQUFULENBQXlCLE1BQXpCLEVBQWlDLFVBQWpDLEVBQTZDO0FBQzNDLE1BQUksQ0FBQyxNQUFNLE9BQU4sQ0FBYyxVQUFkLENBQUQsRUFBNEI7QUFDOUIsaUJBQWEsQ0FBQyxVQUFELENBQWIsQ0FEOEI7R0FBaEM7O0FBSUEsU0FBTyxXQUNKLEdBREksQ0FDQSxxQkFBYTtBQUNoQixXQUFPLE9BQU8sU0FBUCxLQUFzQixVQUF0QixHQUFtQyxXQUFuQyxHQUFpRCxTQUFqRCxDQURTO0dBQWIsQ0FEQSxDQUlKLEdBSkksQ0FJQSxxQkFBYTtBQUNoQixXQUFPLHFCQUFxQixTQUFyQixHQUFpQyxVQUFVLFNBQVYsQ0FBb0IsTUFBcEIsRUFBNEIsTUFBNUIsRUFBakMsR0FBd0UsU0FBeEUsQ0FEUztHQUFiLENBSkEsQ0FPSixNQVBJLENBT0csVUFBQyxJQUFELEVBQU8sU0FBUCxFQUFxQjtBQUMzQixRQUFJLE9BQU8sU0FBUCxLQUFzQixRQUF0QixFQUFnQztBQUNsQyxhQUFPLE9BQU8sU0FBUCxDQUQyQjtLQUFwQztBQUdBLFdBQU8sSUFBUCxDQUoyQjtHQUFyQixFQUtMLEVBWkUsQ0FBUCxDQUwyQztDQUE3Qzs7a0JBcUJlIiwiZmlsZSI6IkNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk11c3QgYmUgaW1wbGVtZW50ZWRcIik7XG4gIH1cblxuICByZWZyZXNoKCkge1xuICAgIHZhciB7IGNodW5rcywgcGFyYW1zIH0gPSB0aGlzLnJlbmRlckNvbnRleHQ7XG4gICAgdmFyIHJlc3VsdCA9IGNodW5rc1swXTtcbiAgICB2YXIgaSwgbGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMCwgbGVuZ3RoID0gcGFyYW1zLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gcHJvY2Vzc0NoaWxkcmVuKHRoaXMsIHBhcmFtc1tpXSkgKyBjaHVua3NbaSArIDFdO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBjb250ZW50KGNodW5rcywgLi4ucGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgICAgIC5fc2V0UmVuZGVyQ29udGV4dCh7IGNodW5rcywgcGFyYW1zIH0pXG4gICAgICAucmVmcmVzaCgpO1xuICB9XG5cbiAgX3NldE93bmVyKG93bmVyKSB7XG4gICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX3NldFJlbmRlckNvbnRleHQoY29udGV4dCkge1xuICAgIHRoaXMucmVuZGVyQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBwcm9jZXNzQ2hpbGRyZW4ocGFyZW50LCBjb21wb25lbnRzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgIGNvbXBvbmVudHMgPSBbY29tcG9uZW50c107XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50c1xuICAgIC5tYXAoY29tcG9uZW50ID0+IHtcbiAgICAgIHJldHVybiB0eXBlb2YoY29tcG9uZW50KSA9PT0gXCJmdW5jdGlvblwiID8gY29tcG9uZW50KCkgOiBjb21wb25lbnQ7XG4gICAgfSlcbiAgICAubWFwKGNvbXBvbmVudCA9PiB7XG4gICAgICByZXR1cm4gY29tcG9uZW50IGluc3RhbmNlb2YgQ29tcG9uZW50ID8gY29tcG9uZW50Ll9zZXRPd25lcihwYXJlbnQpLnJlbmRlcigpIDogY29tcG9uZW50O1xuICAgIH0pXG4gICAgLnJlZHVjZSgoaHRtbCwgY29tcG9uZW50KSA9PiB7XG4gICAgICBpZiAodHlwZW9mKGNvbXBvbmVudCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGh0bWwgKyBjb21wb25lbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9LCAnJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50O1xuIl19