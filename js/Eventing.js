"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Eventing = (function () {
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
})();

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
//# sourceMappingURL=data:application/json;base64,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TUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsY0FBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDM0M7T0FDRjs7QUFFRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7MkJBRWEsTUFBTSxFQUFnQjtVQUFkLE9BQU8seURBQUcsRUFBRTs7QUFDaEMsYUFBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdEM7OztTQW5ERyxRQUFROzs7QUF1RGQsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQ3hCLE1BQUksRUFBRSxFQUFFLE9BQU87Ozs7QUFBQyxBQUloQixNQUFJLE9BQU8sSUFBSSxBQUFDLEtBQUssUUFBUSxFQUFFO0FBQzdCLFdBQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsTUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFbEIsUUFBSSx1QkFDRCxPQUFPLEVBQUcsRUFBRSxDQUNkLENBQUM7R0FDSDs7QUFFRCxTQUFPLElBQUksQ0FBQztDQUNiOztrQkFHYyxRQUFRIiwiZmlsZSI6IkV2ZW50aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGFrZW4gZnJvbSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnRUYXJnZXQvYWRkRXZlbnRMaXN0ZW5lclxuXG4oZnVuY3Rpb24oKSB7XG4gIGlmICghRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5yZXR1cm5WYWx1ZT1mYWxzZTtcbiAgICB9O1xuICB9XG4gIGlmICghRXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbikge1xuICAgIEV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb249ZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmNhbmNlbEJ1YmJsZT10cnVlO1xuICAgIH07XG4gIH1cbiAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgdmFyIGV2ZW50TGlzdGVuZXJzPVtdO1xuXG4gICAgdmFyIGFkZEV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24odHlwZSxsaXN0ZW5lciAvKiwgdXNlQ2FwdHVyZSAod2lsbCBiZSBpZ25vcmVkKSAqLykge1xuICAgICAgdmFyIHNlbGY9dGhpcztcbiAgICAgIHZhciB3cmFwcGVyPWZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS50YXJnZXQ9ZS5zcmNFbGVtZW50O1xuICAgICAgICBlLmN1cnJlbnRUYXJnZXQ9c2VsZjtcbiAgICAgICAgaWYgKGxpc3RlbmVyLmhhbmRsZUV2ZW50KSB7XG4gICAgICAgICAgbGlzdGVuZXIuaGFuZGxlRXZlbnQoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGlzdGVuZXIuY2FsbChzZWxmLGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaWYgKHR5cGU9PVwiRE9NQ29udGVudExvYWRlZFwiKSB7XG4gICAgICAgIHZhciB3cmFwcGVyMj1mdW5jdGlvbihlKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGU9PVwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgd3JhcHBlcihlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsd3JhcHBlcjIpO1xuICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKHtvYmplY3Q6dGhpcyx0eXBlOnR5cGUsbGlzdGVuZXI6bGlzdGVuZXIsd3JhcHBlcjp3cmFwcGVyMn0pO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlPT1cImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICB2YXIgZT1uZXcgRXZlbnQoKTtcbiAgICAgICAgICBlLnNyY0VsZW1lbnQ9d2luZG93O1xuICAgICAgICAgIHdyYXBwZXIyKGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmF0dGFjaEV2ZW50KFwib25cIit0eXBlLHdyYXBwZXIpO1xuICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKHtvYmplY3Q6dGhpcyx0eXBlOnR5cGUsbGlzdGVuZXI6bGlzdGVuZXIsd3JhcHBlcjp3cmFwcGVyfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgcmVtb3ZlRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyIC8qLCB1c2VDYXB0dXJlICh3aWxsIGJlIGlnbm9yZWQpICovKSB7XG4gICAgICB2YXIgY291bnRlcj0wO1xuICAgICAgd2hpbGUgKGNvdW50ZXI8ZXZlbnRMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBldmVudExpc3RlbmVyPWV2ZW50TGlzdGVuZXJzW2NvdW50ZXJdO1xuICAgICAgICBpZiAoZXZlbnRMaXN0ZW5lci5vYmplY3Q9PXRoaXMgJiYgZXZlbnRMaXN0ZW5lci50eXBlPT10eXBlICYmIGV2ZW50TGlzdGVuZXIubGlzdGVuZXI9PWxpc3RlbmVyKSB7XG4gICAgICAgICAgaWYgKHR5cGU9PVwiRE9NQ29udGVudExvYWRlZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaEV2ZW50KFwib25yZWFkeXN0YXRlY2hhbmdlXCIsZXZlbnRMaXN0ZW5lci53cmFwcGVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZXRhY2hFdmVudChcIm9uXCIrdHlwZSxldmVudExpc3RlbmVyLndyYXBwZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudExpc3RlbmVycy5zcGxpY2UoY291bnRlciwgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgKytjb3VudGVyO1xuICAgICAgfVxuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcj1hZGRFdmVudExpc3RlbmVyO1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI9cmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgICBpZiAoSFRNTERvY3VtZW50KSB7XG4gICAgICBIVE1MRG9jdW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI9YWRkRXZlbnRMaXN0ZW5lcjtcbiAgICAgIEhUTUxEb2N1bWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcj1yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIH1cbiAgICBpZiAoV2luZG93KSB7XG4gICAgICBXaW5kb3cucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI9YWRkRXZlbnRMaXN0ZW5lcjtcbiAgICAgIFdpbmRvdy5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcj1yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIH1cbiAgfVxufSkoKTtcblxuXG5jbGFzcyBFdmVudGluZyB7XG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgZXZlbnRzID0ge30pIHtcbiAgICB0aGlzLl9lbCA9IHRhcmdldDtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAgIGZvciAodmFyIGV2ZW50IGluIGV2ZW50cykge1xuICAgICAgdGhpcy5vbihldmVudCwgZXZlbnRzW2V2ZW50XSk7XG4gICAgfVxuICB9XG5cbiAgb24oZXZ0cykge1xuICAgIHZhciBmbiwgZXZ0TmFtZSwgaGFuZGxlcnM7XG4gICAgZXZ0cyA9IGV2dHNPYmplY3QoLi4uYXJndW1lbnRzKTtcblxuICAgIGZvciAodmFyIGV2dCBpbiBldnRzKSB7XG4gICAgICBldnROYW1lID0gZXZ0O1xuICAgICAgZm4gPSBldnRzW2V2dE5hbWVdO1xuXG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1tldnROYW1lXSkge1xuICAgICAgICB0aGlzLl9ldmVudHNbZXZ0TmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbZXZ0TmFtZV07XG4gICAgICBpZiAoISh+aGFuZGxlcnMuaW5kZXhPZihmbikpKSB7XG4gICAgICAgIGhhbmRsZXJzLnB1c2goZm4pO1xuICAgICAgICB0aGlzLl9lbC5hZGRFdmVudExpc3RlbmVyKGV2dE5hbWUsIGZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9mZihldnRzKSB7XG4gICAgdmFyIGZuLCBldnROYW1lLCBoYW5kbGVycztcbiAgICBldnRzID0gZXZ0c09iamVjdCguLi5hcmd1bWVudHMpO1xuXG4gICAgZm9yICh2YXIgZXZ0IGluIGV2dHMpIHtcbiAgICAgIGV2dE5hbWUgPSBldnQ7XG5cbiAgICAgIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dE5hbWVdO1xuICAgICAgaWYgKGhhbmRsZXJzICYmIH5oYW5kbGVycy5pbmRleE9mKGZuKSkge1xuICAgICAgICBoYW5kbGVycy5zcGxpY2UoaGFuZGxlcnMuaW5kZXhPZihmbiksIDEpO1xuICAgICAgICB0aGlzLl9lbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dE5hbWUsIGZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUodGFyZ2V0LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50aW5nKHRhcmdldCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBldnRzT2JqZWN0KGV2dHMpIHtcbiAgdmFyIGZuLCBldnROYW1lO1xuXG4gIC8vIEhhbmRsZSBwYXNzaW5nIGluIGFuIGV2ZW50IG5hbWUgYW5kIGZ1bmN0aW9uIGhhbmRsZXIgYXMgYXJndW1lbnRzIGluc3RlYWRcbiAgLy8gb2YgYW4gb2JqZWN0IGxpdGVyYWxcbiAgaWYgKHR5cGVvZihldnRzKSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGV2dE5hbWUgPSBhcmd1bWVudHNbMF07XG4gICAgZm4gPSBhcmd1bWVudHNbMV07XG5cbiAgICBldnRzID0ge1xuICAgICAgW2V2dE5hbWVdOiBmblxuICAgIH07XG4gIH1cblxuICByZXR1cm4gZXZ0cztcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBFdmVudGluZztcbiJdfQ==