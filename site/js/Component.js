class Component {
  constructor(options = {}) {
    this.options = options;
  }

  render() {
    throw new TypeError("Must be implemented");
  }

  refresh() {
    var { chunks, params } = this.renderContext;
    var result = chunks[0];
    var i, length;

    for (i = 0, length = params.length; i < length; i++) {
      result += processChildren(this, params[i]) + chunks[i + 1];
    }

    return result;
  }

  content(chunks, ...params) {
    return this
      ._setRenderContext({ chunks, params })
      .refresh();
  }

  _setOwner(owner) {
    this.owner = owner;
    return this;
  }

  _setRenderContext(context) {
    this.renderContext = context;
    return this;
  }
}


function processChildren(parent, components) {
  if (!Array.isArray(components)) {
    components = [components];
  }

  return components
    .map(component => {
      return typeof(component) === "function" ? component() : component;
    })
    .map(component => {
      return component instanceof Component ? component._setOwner(parent).render() : component;
    })
    .reduce((html, component) => {
      if (typeof(component) === "string") {
        return html + component;
      }
      return html;
    }, "");
}


export default Component;
