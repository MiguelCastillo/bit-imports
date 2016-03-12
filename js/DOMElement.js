"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Eventing2 = require("./Eventing");

var _Eventing3 = _interopRequireDefault(_Eventing2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DOMElement = function (_Eventing) {
  _inherits(DOMElement, _Eventing);

  function DOMElement() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DOMElement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DOMElement).call(this));

    if (DOMElement.isElement(options)) {
      options = {
        el: options
      };
    }

    var settings = {};
    _this.options = settings;
    _this._el = options.el || DOMElement.create("div");

    for (var option in options) {
      if (!options.hasOwnProperty(option)) {
        continue;
      }

      if (typeof _this[option] === "function") {
        _this[option](options[option]);
      } else {
        settings[option] = options[option];
      }
    }

    _this.on(settings.events);
    return _this;
  }

  _createClass(DOMElement, [{
    key: "html",
    value: function html(content) {
      this._el.innerHTML = content;
      return this;
    }
  }, {
    key: "parent",
    value: function parent() {
      return this._el.parent;
    }
  }, {
    key: "append",
    value: function append(els) {
      if (!(els instanceof Array)) {
        els = [els];
      }

      var el, i, length;
      for (i = 0, length = els.length; i < length; i++) {
        el = els[i];

        if (typeof el === "string") {
          el = new DOMElement({ html: el });
        }

        if (el instanceof DOMElement || DOMElement.isElement(el._el)) {
          this._el.appendChild(el._el);
        } else if (DOMElement.isElement(el)) {
          this._el.appendChild(el);
        }
      }

      return this;
    }
  }, {
    key: "remove",
    value: function remove(el) {
      if (el instanceof DOMElement) {
        el = el._el;
      }

      this._el.removeChild(el);
      return this;
    }
  }, {
    key: "attrs",
    value: function attrs(_attrs) {
      for (var attr in _attrs) {
        this._el.setAttribute(attr, _attrs[attr]);
      }

      return this;
    }
  }], [{
    key: "create",
    value: function create(tagName) {
      return document.createElement(tagName);
    }
  }, {
    key: "isElement",
    value: function isElement(el) {
      return el && el.nodeType && (el.nodeType === 1 || el.nodeType === 11);
    }
  }]);

  return DOMElement;
}(_Eventing3.default);

exports.default = DOMElement;
//# sourceMappingURL=data:application/json;base64,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cUIsR0FBRyxRQUFILEtBQWdCLEVBQWhCLENBRG5CLENBRFk7Ozs7U0EzRmpCOzs7a0JBaUdTIiwiZmlsZSI6IkRPTUVsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRpbmcgZnJvbSBcIi4vRXZlbnRpbmdcIjtcblxuY2xhc3MgRE9NRWxlbWVudCBleHRlbmRzIEV2ZW50aW5nIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChET01FbGVtZW50LmlzRWxlbWVudChvcHRpb25zKSkge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgZWw6IG9wdGlvbnNcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIHNldHRpbmdzID0ge307XG4gICAgdGhpcy5vcHRpb25zID0gc2V0dGluZ3M7XG4gICAgdGhpcy5fZWwgPSBvcHRpb25zLmVsIHx8IERPTUVsZW1lbnQuY3JlYXRlKFwiZGl2XCIpO1xuXG4gICAgZm9yICh2YXIgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICAgIGlmICghb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mKHRoaXNbb3B0aW9uXSkgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzW29wdGlvbl0ob3B0aW9uc1tvcHRpb25dKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZXR0aW5nc1tvcHRpb25dID0gb3B0aW9uc1tvcHRpb25dO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub24oc2V0dGluZ3MuZXZlbnRzKTtcbiAgfVxuXG5cbiAgaHRtbChjb250ZW50KSB7XG4gICAgdGhpcy5fZWwuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbiAgcGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9lbC5wYXJlbnQ7XG4gIH1cblxuXG4gIGFwcGVuZChlbHMpIHtcbiAgICBpZiAoIShlbHMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIGVscyA9IFtlbHNdO1xuICAgIH1cblxuICAgIHZhciBlbCwgaSwgbGVuZ3RoO1xuICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGVscy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgZWwgPSBlbHNbaV07XG5cbiAgICAgIGlmICh0eXBlb2YoZWwpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsID0gbmV3IERPTUVsZW1lbnQoe2h0bWw6ZWx9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsIGluc3RhbmNlb2YgRE9NRWxlbWVudCB8fCBET01FbGVtZW50LmlzRWxlbWVudChlbC5fZWwpKSB7XG4gICAgICAgIHRoaXMuX2VsLmFwcGVuZENoaWxkKGVsLl9lbCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChET01FbGVtZW50LmlzRWxlbWVudChlbCkpIHtcbiAgICAgICAgdGhpcy5fZWwuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICByZW1vdmUoZWwpIHtcbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBET01FbGVtZW50KSB7XG4gICAgICBlbCA9IGVsLl9lbDtcbiAgICB9XG5cbiAgICB0aGlzLl9lbC5yZW1vdmVDaGlsZChlbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG4gIGF0dHJzKGF0dHJzKSB7XG4gICAgZm9yICh2YXIgYXR0ciBpbiBhdHRycykge1xuICAgICAgdGhpcy5fZWwuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbiAgc3RhdGljIGNyZWF0ZSh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIH1cblxuXG4gIHN0YXRpYyBpc0VsZW1lbnQoZWwpIHtcbiAgICByZXR1cm4gZWwgJiYgZWwubm9kZVR5cGUgJiZcbiAgICAgICAgKGVsLm5vZGVUeXBlID09PSAxIHx8IGVsLm5vZGVUeXBlID09PSAxMSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRE9NRWxlbWVudDtcbiJdfQ==