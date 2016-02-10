import Component from './Component';
import router from './Routing';

var registered = {};

class Region extends Component {
  constructor(name) {
    super();
    this._name = name;
  }

  render() {
    var component = registered[this._name];
    if (typeof component === "function") {
      component = component();
    }
    return component && component.render();
  }

  withComponent(component) {
    registered[this._name] = component;
    return this;
  }

  static register(name, component) {
    registered[name] = component;
  }
}

export default Region;
