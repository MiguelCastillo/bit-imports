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
//# sourceMappingURL=data:application/json;base64,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IFwiLi9FdmVudGluZ1wiO1xuXG5jbGFzcyBET01FbGVtZW50IGV4dGVuZHMgRXZlbnRpbmcge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgaWYgKERPTUVsZW1lbnQuaXNFbGVtZW50KG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBlbDogb3B0aW9uc1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgc2V0dGluZ3MgPSB7fTtcbiAgICB0aGlzLm9wdGlvbnMgPSBzZXR0aW5ncztcbiAgICB0aGlzLl9lbCA9IG9wdGlvbnMuZWwgfHwgRE9NRWxlbWVudC5jcmVhdGUoXCJkaXZcIik7XG5cbiAgICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgICAgaWYgKCFvcHRpb25zLmhhc093blByb3BlcnR5KG9wdGlvbikpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YodGhpc1tvcHRpb25dKSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXNbb3B0aW9uXShvcHRpb25zW29wdGlvbl0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNldHRpbmdzW29wdGlvbl0gPSBvcHRpb25zW29wdGlvbl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vbihzZXR0aW5ncy5ldmVudHMpO1xuICB9XG5cblxuICBodG1sKGNvbnRlbnQpIHtcbiAgICB0aGlzLl9lbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICBwYXJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsLnBhcmVudDtcbiAgfVxuXG5cbiAgYXBwZW5kKGVscykge1xuICAgIGlmICghKGVscyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgZWxzID0gW2Vsc107XG4gICAgfVxuXG4gICAgdmFyIGVsLCBpLCBsZW5ndGg7XG4gICAgZm9yIChpID0gMCwgbGVuZ3RoID0gZWxzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBlbCA9IGVsc1tpXTtcblxuICAgICAgaWYgKHR5cGVvZihlbCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZWwgPSBuZXcgRE9NRWxlbWVudCh7aHRtbDplbH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwgaW5zdGFuY2VvZiBET01FbGVtZW50IHx8IERPTUVsZW1lbnQuaXNFbGVtZW50KGVsLl9lbCkpIHtcbiAgICAgICAgdGhpcy5fZWwuYXBwZW5kQ2hpbGQoZWwuX2VsKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKERPTUVsZW1lbnQuaXNFbGVtZW50KGVsKSkge1xuICAgICAgICB0aGlzLl9lbC5hcHBlbmRDaGlsZChlbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuXG4gIHJlbW92ZShlbCkge1xuICAgIGlmIChlbCBpbnN0YW5jZW9mIERPTUVsZW1lbnQpIHtcbiAgICAgIGVsID0gZWwuX2VsO1xuICAgIH1cblxuICAgIHRoaXMuX2VsLnJlbW92ZUNoaWxkKGVsKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG5cbiAgYXR0cnMoYXR0cnMpIHtcbiAgICBmb3IgKHZhciBhdHRyIGluIGF0dHJzKSB7XG4gICAgICB0aGlzLl9lbC5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cblxuICBzdGF0aWMgY3JlYXRlKHRhZ05hbWUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgfVxuXG5cbiAgc3RhdGljIGlzRWxlbWVudChlbCkge1xuICAgIHJldHVybiBlbCAmJiBlbC5ub2RlVHlwZSAmJlxuICAgICAgICAoZWwubm9kZVR5cGUgPT09IDEgfHwgZWwubm9kZVR5cGUgPT09IDExKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET01FbGVtZW50O1xuIl19