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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlZ2lvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFJLGFBQWEsRUFBYjs7SUFFRTs7O0FBQ0osV0FESSxNQUNKLENBQVksSUFBWixFQUFrQjswQkFEZCxRQUNjOzt1RUFEZCxvQkFDYzs7QUFFaEIsVUFBSyxLQUFMLEdBQWEsSUFBYixDQUZnQjs7R0FBbEI7O2VBREk7OzZCQU1LO0FBQ1AsVUFBSSxZQUFZLFdBQVcsS0FBSyxLQUFMLENBQXZCLENBREc7QUFFUCxVQUFJLE9BQU8sU0FBUCxLQUFxQixVQUFyQixFQUFpQztBQUNuQyxvQkFBWSxXQUFaLENBRG1DO09BQXJDO0FBR0EsYUFBTyxhQUFhLFVBQVUsTUFBVixFQUFiLENBTEE7Ozs7a0NBUUssV0FBVztBQUN2QixpQkFBVyxLQUFLLEtBQUwsQ0FBWCxHQUF5QixTQUF6QixDQUR1QjtBQUV2QixhQUFPLElBQVAsQ0FGdUI7Ozs7NkJBS1QsTUFBTSxXQUFXO0FBQy9CLGlCQUFXLElBQVgsSUFBbUIsU0FBbkIsQ0FEK0I7Ozs7U0FuQjdCOzs7a0JBd0JTIiwiZmlsZSI6IlJlZ2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9Db21wb25lbnQnO1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL1JvdXRpbmcnO1xuXG52YXIgcmVnaXN0ZXJlZCA9IHt9O1xuXG5jbGFzcyBSZWdpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgY29tcG9uZW50ID0gcmVnaXN0ZXJlZFt0aGlzLl9uYW1lXTtcbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb21wb25lbnQgPSBjb21wb25lbnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudCAmJiBjb21wb25lbnQucmVuZGVyKCk7XG4gIH1cblxuICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIHJlZ2lzdGVyZWRbdGhpcy5fbmFtZV0gPSBjb21wb25lbnQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzdGF0aWMgcmVnaXN0ZXIobmFtZSwgY29tcG9uZW50KSB7XG4gICAgcmVnaXN0ZXJlZFtuYW1lXSA9IGNvbXBvbmVudDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWdpb247XG4iXX0=