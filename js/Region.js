'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Routing = require('./Routing');

var _Routing2 = _interopRequireDefault(_Routing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var registered = {};

var Region = (function (_Component) {
  _inherits(Region, _Component);

  function Region(name) {
    _classCallCheck(this, Region);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Region).call(this));

    _this._name = name;
    return _this;
  }

  _createClass(Region, [{
    key: 'render',
    value: function render() {
      var component = registered[this._name];
      if (typeof component === "function") {
        component = component();
      }
      return component && component.render();
    }
  }, {
    key: 'withComponent',
    value: function withComponent(component) {
      registered[this._name] = component;
      return this;
    }
  }], [{
    key: 'register',
    value: function register(name, component) {
      registered[name] = component;
    }
  }]);

  return Region;
})(_Component3.default);

exports.default = Region;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlZ2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7O0lBRWQsTUFBTTtZQUFOLE1BQU07O0FBQ1YsV0FESSxNQUFNLENBQ0UsSUFBSSxFQUFFOzBCQURkLE1BQU07O3VFQUFOLE1BQU07O0FBR1IsVUFBSyxLQUFLLEdBQUcsSUFBSSxDQUFDOztHQUNuQjs7ZUFKRyxNQUFNOzs2QkFNRDtBQUNQLFVBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsVUFBSSxPQUFPLFNBQVMsS0FBSyxVQUFVLEVBQUU7QUFDbkMsaUJBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztPQUN6QjtBQUNELGFBQU8sU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN4Qzs7O2tDQUVhLFNBQVMsRUFBRTtBQUN2QixnQkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDbkMsYUFBTyxJQUFJLENBQUM7S0FDYjs7OzZCQUVlLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDL0IsZ0JBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7S0FDOUI7OztTQXJCRyxNQUFNOzs7a0JBd0JHLE1BQU0iLCJmaWxlIjoiUmVnaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL0NvbXBvbmVudCc7XG5pbXBvcnQgcm91dGVyIGZyb20gJy4vUm91dGluZyc7XG5cbnZhciByZWdpc3RlcmVkID0ge307XG5cbmNsYXNzIFJlZ2lvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHZhciBjb21wb25lbnQgPSByZWdpc3RlcmVkW3RoaXMuX25hbWVdO1xuICAgIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbXBvbmVudCA9IGNvbXBvbmVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50ICYmIGNvbXBvbmVudC5yZW5kZXIoKTtcbiAgfVxuXG4gIHdpdGhDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgcmVnaXN0ZXJlZFt0aGlzLl9uYW1lXSA9IGNvbXBvbmVudDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN0YXRpYyByZWdpc3RlcihuYW1lLCBjb21wb25lbnQpIHtcbiAgICByZWdpc3RlcmVkW25hbWVdID0gY29tcG9uZW50O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lvbjtcbiJdfQ==