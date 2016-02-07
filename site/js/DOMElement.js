import Eventing from "./Eventing";

class DOMElement extends Eventing {
  constructor(options = {}) {
    super();

    if (DOMElement.isElement(options)) {
      options = {
        el: options
      };
    }

    var settings = {};
    this.options = settings;
    this._el = options.el || DOMElement.create("div");

    for (var option in options) {
      if (!options.hasOwnProperty(option)) {
        continue;
      }

      if (typeof(this[option]) === "function") {
        this[option](options[option]);
      }
      else {
        settings[option] = options[option];
      }
    }

    this.on(settings.events);
  }


  html(content) {
    this._el.innerHTML = content;
    return this;
  }


  parent() {
    return this._el.parent;
  }


  append(els) {
    if (!(els instanceof Array)) {
      els = [els];
    }

    var el, i, length;
    for (i = 0, length = els.length; i < length; i++) {
      el = els[i];

      if (typeof(el) === "string") {
        el = new DOMElement({html:el});
      }

      if (el instanceof DOMElement || DOMElement.isElement(el._el)) {
        this._el.appendChild(el._el);
      }
      else if (DOMElement.isElement(el)) {
        this._el.appendChild(el);
      }
    }

    return this;
  }


  remove(el) {
    if (el instanceof DOMElement) {
      el = el._el;
    }

    this._el.removeChild(el);
    return this;
  }


  attrs(attrs) {
    for (var attr in attrs) {
      this._el.setAttribute(attr, attrs[attr]);
    }

    return this;
  }


  static create(tagName) {
    return document.createElement(tagName);
  }


  static isElement(el) {
    return el && el.nodeType &&
        (el.nodeType === 1 || el.nodeType === 11);
  }
}

export default DOMElement;
