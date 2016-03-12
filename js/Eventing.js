"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Taken from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

(function () {
  if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault = function () {
      this.returnValue = false;
    };
  }
  if (!Event.prototype.stopPropagation) {
    Event.prototype.stopPropagation = function () {
      this.cancelBubble = true;
    };
  }
  if (!Element.prototype.addEventListener) {
    var eventListeners = [];

    var addEventListener = function addEventListener(type, listener /*, useCapture (will be ignored) */) {
      var self = this;
      var wrapper = function wrapper(e) {
        e.target = e.srcElement;
        e.currentTarget = self;
        if (listener.handleEvent) {
          listener.handleEvent(e);
        } else {
          listener.call(self, e);
        }
      };
      if (type == "DOMContentLoaded") {
        var wrapper2 = function wrapper2(e) {
          if (document.readyState == "complete") {
            wrapper(e);
          }
        };
        document.attachEvent("onreadystatechange", wrapper2);
        eventListeners.push({ object: this, type: type, listener: listener, wrapper: wrapper2 });

        if (document.readyState == "complete") {
          var e = new Event();
          e.srcElement = window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on" + type, wrapper);
        eventListeners.push({ object: this, type: type, listener: listener, wrapper: wrapper });
      }
    };
    var removeEventListener = function removeEventListener(type, listener /*, useCapture (will be ignored) */) {
      var counter = 0;
      while (counter < eventListeners.length) {
        var eventListener = eventListeners[counter];
        if (eventListener.object == this && eventListener.type == type && eventListener.listener == listener) {
          if (type == "DOMContentLoaded") {
            this.detachEvent("onreadystatechange", eventListener.wrapper);
          } else {
            this.detachEvent("on" + type, eventListener.wrapper);
          }
          eventListeners.splice(counter, 1);
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener = addEventListener;
    Element.prototype.removeEventListener = removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener = addEventListener;
      HTMLDocument.prototype.removeEventListener = removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener = addEventListener;
      Window.prototype.removeEventListener = removeEventListener;
    }
  }
})();

var Eventing = function () {
  function Eventing(target) {
    var events = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Eventing);

    this._el = target;
    this._events = {};

    for (var event in events) {
      this.on(event, events[event]);
    }
  }

  _createClass(Eventing, [{
    key: "on",
    value: function on(evts) {
      var fn, evtName, handlers;
      evts = evtsObject.apply(undefined, arguments);

      for (var evt in evts) {
        evtName = evt;
        fn = evts[evtName];

        if (!this._events[evtName]) {
          this._events[evtName] = [];
        }

        handlers = this._events[evtName];
        if (! ~handlers.indexOf(fn)) {
          handlers.push(fn);
          this._el.addEventListener(evtName, fn);
        }
      }

      return this;
    }
  }, {
    key: "off",
    value: function off(evts) {
      var fn, evtName, handlers;
      evts = evtsObject.apply(undefined, arguments);

      for (var evt in evts) {
        evtName = evt;

        handlers = this._events[evtName];
        if (handlers && ~handlers.indexOf(fn)) {
          handlers.splice(handlers.indexOf(fn), 1);
          this._el.removeEventListener(evtName, fn);
        }
      }

      return this;
    }
  }], [{
    key: "create",
    value: function create(target) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return new Eventing(target, options);
    }
  }]);

  return Eventing;
}();

function evtsObject(evts) {
  var fn, evtName;

  // Handle passing in an event name and function handler as arguments instead
  // of an object literal
  if (typeof evts === "string") {
    evtName = arguments[0];
    fn = arguments[1];

    evts = _defineProperty({}, evtName, fn);
  }

  return evts;
}

exports.default = Eventing;
//# sourceMappingURL=data:application/json;base64,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Q0FENkI7QUFFN0IsU0FBSyxVQUFVLENBQVYsQ0FBTCxDQUY2Qjs7QUFJN0IsK0JBQ0csU0FBVSxHQURiLENBSjZCO0dBQS9COztBQVNBLFNBQU8sSUFBUCxDQWR3QjtDQUExQjs7a0JBa0JlIiwiZmlsZSI6IkV2ZW50aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnRUYXJnZXQvYWRkRXZlbnRMaXN0ZW5lclxuXG4oZnVuY3Rpb24oKSB7XG4gIGlmICghRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5yZXR1cm5WYWx1ZT1mYWxzZTtcbiAgICB9O1xuICB9XG4gIGlmICghRXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbikge1xuICAgIEV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb249ZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNhbmNlbEJ1YmJsZT10cnVlO1xuICAgIH07XG4gIH1cbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgdmFyIGV2ZW50TGlzdGVuZXJzPVtdO1xuXG4gICAgdmFyIGFkZEV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lciAvKiwgdXNlQ2FwdHVyZSAod2lsbCBiZSBpZ25vcmVkKSAqLykge1xuICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgIHZhciB3cmFwcGVyPWZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS50YXJnZXQ9ZS5zcmNFbGVtZW50O1xuICAgICAgICBlLmN1cnJlbnRUYXJnZXQ9c2VsZjtcbiAgICAgICAgaWYgKGxpc3RlbmVyLmhhbmRsZUV2ZW50KSB7XG4gICAgICAgICAgbGlzdGVuZXIuaGFuZGxlRXZlbnQoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGlzdGVuZXIuY2FsbChzZWxmLGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKHR5cGU9PVwiRE9NQ29udGVudExvYWRlZFwiKSB7XG4gICAgICAgIHZhciB3cmFwcGVyMj1mdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGU9PVwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgd3JhcHBlcihlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsd3JhcHBlcjIpO1xuICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKHtvYmplY3Q6dGhpcyx0eXBlOnR5cGUsbGlzdGVuZXI6bGlzdGVuZXIsd3JhcHBlcjp3cmFwcGVyMn0pO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlPT1cImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICB2YXIgZT1uZXcgRXZlbnQoKTtcbiAgICAgICAgICBlLnNyY0VsZW1lbnQ9d2luZG93O1xuICAgICAgICAgIHdyYXBwZXIyKGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KFwib25cIit0eXBlLHdyYXBwZXIpO1xuICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKHtvYmplY3Q6dGhpcyx0eXBlOnR5cGUsbGlzdGVuZXI6bGlzdGVuZXIsd3JhcHBlcjp3cmFwcGVyfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyIC8qLCB1c2VDYXB0dXJlICh3aWxsIGJlIGlnbm9yZWQpICovKSB7XG4gICAgICB2YXIgY291bnRlcj0wO1xuICAgICAgd2hpbGUgKGNvdW50ZXI8ZXZlbnRMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBldmVudExpc3RlbmVyPWV2ZW50TGlzdGVuZXJzW2NvdW50ZXJdO1xuICAgICAgICBpZiAoZXZlbnRMaXN0ZW5lci5vYmplY3Q9PXRoaXMgJiYgZXZlbnRMaXN0ZW5lci50eXBlPT10eXBlICYmIGV2ZW50TGlzdGVuZXIubGlzdGVuZXI9PWxpc3RlbmVyKSB7XG4gICAgICAgICAgaWYgKHR5cGU9PVwiRE9NQ29udGVudExvYWRlZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsZXZlbnRMaXN0ZW5lci53cmFwcGVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXRhY2hFdmVudChcIm9uXCIrdHlwZSxldmVudExpc3RlbmVyLndyYXBwZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudExpc3RlbmVycy5zcGxpY2UoY291bnRlciwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgKytjb3VudGVyO1xuICAgICAgfVxuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcj1hZGRFdmVudExpc3RlbmVyO1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI9cmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICBpZiAoSFRNTERvY3VtZW50KSB7XG4gICAgICBIVE1MRG9jdW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI9YWRkRXZlbnRMaXN0ZW5lcjtcbiAgICAgIEhUTUxEb2N1bWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcj1yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIH1cbiAgICBpZiAoV2luZG93KSB7XG4gICAgICBXaW5kb3cucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI9YWRkRXZlbnRMaXN0ZW5lcjtcbiAgICAgIFdpbmRvdy5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcj1yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIH1cbiAgfVxufSkoKTtcblxuXG5jbGFzcyBFdmVudGluZyB7XG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgZXZlbnRzID0ge30pIHtcbiAgICB0aGlzLl9lbCA9IHRhcmdldDtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAgIGZvciAodmFyIGV2ZW50IGluIGV2ZW50cykge1xuICAgICAgdGhpcy5vbihldmVudCwgZXZlbnRzW2V2ZW50XSk7XG4gICAgfVxuICB9XG5cbiAgb24oZXZ0cykge1xuICAgIHZhciBmbiwgZXZ0TmFtZSwgaGFuZGxlcnM7XG4gICAgZXZ0cyA9IGV2dHNPYmplY3QoLi4uYXJndW1lbnRzKTtcblxuICAgIGZvciAodmFyIGV2dCBpbiBldnRzKSB7XG4gICAgICBldnROYW1lID0gZXZ0O1xuICAgICAgZm4gPSBldnRzW2V2dE5hbWVdO1xuXG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1tldnROYW1lXSkge1xuICAgICAgICB0aGlzLl9ldmVudHNbZXZ0TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbZXZ0TmFtZV07XG4gICAgICBpZiAoISh+aGFuZGxlcnMuaW5kZXhPZihmbikpKSB7XG4gICAgICAgIGhhbmRsZXJzLnB1c2goZm4pO1xuICAgICAgICB0aGlzLl9lbC5hZGRFdmVudExpc3RlbmVyKGV2dE5hbWUsIGZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9mZihldnRzKSB7XG4gICAgdmFyIGZuLCBldnROYW1lLCBoYW5kbGVycztcbiAgICBldnRzID0gZXZ0c09iamVjdCguLi5hcmd1bWVudHMpO1xuXG4gICAgZm9yICh2YXIgZXZ0IGluIGV2dHMpIHtcbiAgICAgIGV2dE5hbWUgPSBldnQ7XG5cbiAgICAgIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dE5hbWVdO1xuICAgICAgaWYgKGhhbmRsZXJzICYmIH5oYW5kbGVycy5pbmRleE9mKGZuKSkge1xuICAgICAgICBoYW5kbGVycy5zcGxpY2UoaGFuZGxlcnMuaW5kZXhPZihmbiksIDEpO1xuICAgICAgICB0aGlzLl9lbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dE5hbWUsIGZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUodGFyZ2V0LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50aW5nKHRhcmdldCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBldnRzT2JqZWN0KGV2dHMpIHtcbiAgdmFyIGZuLCBldnROYW1lO1xuXG4gIC8vIEhhbmRsZSBwYXNzaW5nIGluIGFuIGV2ZW50IG5hbWUgYW5kIGZ1bmN0aW9uIGhhbmRsZXIgYXMgYXJndW1lbnRzIGluc3RlYWRcbiAgLy8gb2YgYW4gb2JqZWN0IGxpdGVyYWxcbiAgaWYgKHR5cGVvZihldnRzKSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGV2dE5hbWUgPSBhcmd1bWVudHNbMF07XG4gICAgZm4gPSBhcmd1bWVudHNbMV07XG5cbiAgICBldnRzID0ge1xuICAgICAgW2V2dE5hbWVdOiBmblxuICAgIH07XG4gIH1cblxuICByZXR1cm4gZXZ0cztcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBFdmVudGluZztcbiJdfQ==