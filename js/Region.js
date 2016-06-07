'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Routing = require('./Routing');

var _Routing2 = _interopRequireDefault(_Routing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var registered = {};

var Region = function (_Component) {
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
}(_Component3.default);

exports.default = Region;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlZ2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksYUFBYSxFQUFqQjs7SUFFTSxNOzs7QUFDSixrQkFBWSxJQUFaLEVBQWtCO0FBQUE7O0FBQUE7O0FBRWhCLFVBQUssS0FBTCxHQUFhLElBQWI7QUFGZ0I7QUFHakI7Ozs7NkJBRVE7QUFDUCxVQUFJLFlBQVksV0FBVyxLQUFLLEtBQWhCLENBQWhCO0FBQ0EsVUFBSSxPQUFPLFNBQVAsS0FBcUIsVUFBekIsRUFBcUM7QUFDbkMsb0JBQVksV0FBWjtBQUNEO0FBQ0QsYUFBTyxhQUFhLFVBQVUsTUFBVixFQUFwQjtBQUNEOzs7a0NBRWEsUyxFQUFXO0FBQ3ZCLGlCQUFXLEtBQUssS0FBaEIsSUFBeUIsU0FBekI7QUFDQSxhQUFPLElBQVA7QUFDRDs7OzZCQUVlLEksRUFBTSxTLEVBQVc7QUFDL0IsaUJBQVcsSUFBWCxJQUFtQixTQUFuQjtBQUNEOzs7Ozs7a0JBR1ksTSIsImZpbGUiOiJSZWdpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vQ29tcG9uZW50JztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9Sb3V0aW5nJztcblxudmFyIHJlZ2lzdGVyZWQgPSB7fTtcblxuY2xhc3MgUmVnaW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IHJlZ2lzdGVyZWRbdGhpcy5fbmFtZV07XG4gICAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50KCk7XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnQgJiYgY29tcG9uZW50LnJlbmRlcigpO1xuICB9XG5cbiAgd2l0aENvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICByZWdpc3RlcmVkW3RoaXMuX25hbWVdID0gY29tcG9uZW50O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3RhdGljIHJlZ2lzdGVyKG5hbWUsIGNvbXBvbmVudCkge1xuICAgIHJlZ2lzdGVyZWRbbmFtZV0gPSBjb21wb25lbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnaW9uO1xuIl19