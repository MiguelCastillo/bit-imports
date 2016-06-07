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
//# sourceMappingURL=data:application/json;base64,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UDtBQUNEOzs7d0JBRUcsSSxFQUFNO0FBQ1IsVUFBSSxFQUFKLEVBQVEsT0FBUixFQUFpQixRQUFqQjtBQUNBLGFBQU8sNEJBQWMsU0FBZCxDQUFQOztBQUVBLFdBQUssSUFBSSxHQUFULElBQWdCLElBQWhCLEVBQXNCO0FBQ3BCLGtCQUFVLEdBQVY7O0FBRUEsbUJBQVcsS0FBSyxPQUFMLENBQWEsT0FBYixDQUFYO0FBQ0EsWUFBSSxZQUFZLENBQUMsU0FBUyxPQUFULENBQWlCLEVBQWpCLENBQWpCLEVBQXVDO0FBQ3JDLG1CQUFTLE1BQVQsQ0FBZ0IsU0FBUyxPQUFULENBQWlCLEVBQWpCLENBQWhCLEVBQXNDLENBQXRDO0FBQ0EsZUFBSyxHQUFMLENBQVMsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsRUFBdEM7QUFDRDtBQUNGOztBQUVELGFBQU8sSUFBUDtBQUNEOzs7MkJBRWEsTSxFQUFzQjtBQUFBLFVBQWQsT0FBYyx5REFBSixFQUFJOztBQUNsQyxhQUFPLElBQUksUUFBSixDQUFhLE1BQWIsRUFBcUIsT0FBckIsQ0FBUDtBQUNEOzs7Ozs7QUFJSCxTQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDeEIsTUFBSSxFQUFKLEVBQVEsT0FBUjs7OztBQUlBLE1BQUksT0FBTyxJQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCLGNBQVUsVUFBVSxDQUFWLENBQVY7QUFDQSxTQUFLLFVBQVUsQ0FBVixDQUFMOztBQUVBLCtCQUNHLE9BREgsRUFDYSxFQURiO0FBR0Q7O0FBRUQsU0FBTyxJQUFQO0FBQ0Q7O2tCQUdjLFEiLCJmaWxlIjoiRXZlbnRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUYWtlbiBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9hZGRFdmVudExpc3RlbmVyXG5cbihmdW5jdGlvbigpIHtcbiAgaWYgKCFFdmVudC5wcm90b3R5cGUucHJldmVudERlZmF1bHQpIHtcbiAgICBFdmVudC5wcm90b3R5cGUucHJldmVudERlZmF1bHQ9ZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnJldHVyblZhbHVlPWZhbHNlO1xuICAgIH07XG4gIH1cbiAgaWYgKCFFdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uKSB7XG4gICAgRXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbj1mdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY2FuY2VsQnViYmxlPXRydWU7XG4gICAgfTtcbiAgfVxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICB2YXIgZXZlbnRMaXN0ZW5lcnM9W107XG5cbiAgICB2YXIgYWRkRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbih0eXBlLGxpc3RlbmVyIC8qLCB1c2VDYXB0dXJlICh3aWxsIGJlIGlnbm9yZWQpICovKSB7XG4gICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgdmFyIHdyYXBwZXI9ZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnRhcmdldD1lLnNyY0VsZW1lbnQ7XG4gICAgICAgIGUuY3VycmVudFRhcmdldD1zZWxmO1xuICAgICAgICBpZiAobGlzdGVuZXIuaGFuZGxlRXZlbnQpIHtcbiAgICAgICAgICBsaXN0ZW5lci5oYW5kbGVFdmVudChlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0ZW5lci5jYWxsKHNlbGYsZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpZiAodHlwZT09XCJET01Db250ZW50TG9hZGVkXCIpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIyPWZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZT09XCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICB3cmFwcGVyKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIix3cmFwcGVyMik7XG4gICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goe29iamVjdDp0aGlzLHR5cGU6dHlwZSxsaXN0ZW5lcjpsaXN0ZW5lcix3cmFwcGVyOndyYXBwZXIyfSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGU9PVwiY29tcGxldGVcIikge1xuICAgICAgICAgIHZhciBlPW5ldyBFdmVudCgpO1xuICAgICAgICAgIGUuc3JjRWxlbWVudD13aW5kb3c7XG4gICAgICAgICAgd3JhcHBlcjIoZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXR0YWNoRXZlbnQoXCJvblwiK3R5cGUsd3JhcHBlcik7XG4gICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goe29iamVjdDp0aGlzLHR5cGU6dHlwZSxsaXN0ZW5lcjpsaXN0ZW5lcix3cmFwcGVyOndyYXBwZXJ9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciByZW1vdmVFdmVudExpc3RlbmVyPWZ1bmN0aW9uKHR5cGUsbGlzdGVuZXIgLyosIHVzZUNhcHR1cmUgKHdpbGwgYmUgaWdub3JlZCkgKi8pIHtcbiAgICAgIHZhciBjb3VudGVyPTA7XG4gICAgICB3aGlsZSAoY291bnRlcjxldmVudExpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGV2ZW50TGlzdGVuZXI9ZXZlbnRMaXN0ZW5lcnNbY291bnRlcl07XG4gICAgICAgIGlmIChldmVudExpc3RlbmVyLm9iamVjdD09dGhpcyAmJiBldmVudExpc3RlbmVyLnR5cGU9PXR5cGUgJiYgZXZlbnRMaXN0ZW5lci5saXN0ZW5lcj09bGlzdGVuZXIpIHtcbiAgICAgICAgICBpZiAodHlwZT09XCJET01Db250ZW50TG9hZGVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoRXZlbnQoXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIixldmVudExpc3RlbmVyLndyYXBwZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaEV2ZW50KFwib25cIit0eXBlLGV2ZW50TGlzdGVuZXIud3JhcHBlcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV2ZW50TGlzdGVuZXJzLnNwbGljZShjb3VudGVyLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICArK2NvdW50ZXI7XG4gICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyPWFkZEV2ZW50TGlzdGVuZXI7XG4gICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcj1yZW1vdmVFdmVudExpc3RlbmVyO1xuICAgIGlmIChIVE1MRG9jdW1lbnQpIHtcbiAgICAgIEhUTUxEb2N1bWVudC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcj1hZGRFdmVudExpc3RlbmVyO1xuICAgICAgSFRNTERvY3VtZW50LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyPXJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgfVxuICAgIGlmIChXaW5kb3cpIHtcbiAgICAgIFdpbmRvdy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcj1hZGRFdmVudExpc3RlbmVyO1xuICAgICAgV2luZG93LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyPXJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gICAgfVxuICB9XG59KSgpO1xuXG5cbmNsYXNzIEV2ZW50aW5nIHtcbiAgY29uc3RydWN0b3IodGFyZ2V0LCBldmVudHMgPSB7fSkge1xuICAgIHRoaXMuX2VsID0gdGFyZ2V0O1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gICAgZm9yICh2YXIgZXZlbnQgaW4gZXZlbnRzKSB7XG4gICAgICB0aGlzLm9uKGV2ZW50LCBldmVudHNbZXZlbnRdKTtcbiAgICB9XG4gIH1cblxuICBvbihldnRzKSB7XG4gICAgdmFyIGZuLCBldnROYW1lLCBoYW5kbGVycztcbiAgICBldnRzID0gZXZ0c09iamVjdCguLi5hcmd1bWVudHMpO1xuXG4gICAgZm9yICh2YXIgZXZ0IGluIGV2dHMpIHtcbiAgICAgIGV2dE5hbWUgPSBldnQ7XG4gICAgICBmbiA9IGV2dHNbZXZ0TmFtZV07XG5cbiAgICAgIGlmICghdGhpcy5fZXZlbnRzW2V2dE5hbWVdKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50c1tldnROYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnROYW1lXTtcbiAgICAgIGlmICghKH5oYW5kbGVycy5pbmRleE9mKGZuKSkpIHtcbiAgICAgICAgaGFuZGxlcnMucHVzaChmbik7XG4gICAgICAgIHRoaXMuX2VsLmFkZEV2ZW50TGlzdGVuZXIoZXZ0TmFtZSwgZm4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgb2ZmKGV2dHMpIHtcbiAgICB2YXIgZm4sIGV2dE5hbWUsIGhhbmRsZXJzO1xuICAgIGV2dHMgPSBldnRzT2JqZWN0KC4uLmFyZ3VtZW50cyk7XG5cbiAgICBmb3IgKHZhciBldnQgaW4gZXZ0cykge1xuICAgICAgZXZ0TmFtZSA9IGV2dDtcblxuICAgICAgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbZXZ0TmFtZV07XG4gICAgICBpZiAoaGFuZGxlcnMgJiYgfmhhbmRsZXJzLmluZGV4T2YoZm4pKSB7XG4gICAgICAgIGhhbmRsZXJzLnNwbGljZShoYW5kbGVycy5pbmRleE9mKGZuKSwgMSk7XG4gICAgICAgIHRoaXMuX2VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0TmFtZSwgZm4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZSh0YXJnZXQsIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgRXZlbnRpbmcodGFyZ2V0LCBvcHRpb25zKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGV2dHNPYmplY3QoZXZ0cykge1xuICB2YXIgZm4sIGV2dE5hbWU7XG5cbiAgLy8gSGFuZGxlIHBhc3NpbmcgaW4gYW4gZXZlbnQgbmFtZSBhbmQgZnVuY3Rpb24gaGFuZGxlciBhcyBhcmd1bWVudHMgaW5zdGVhZFxuICAvLyBvZiBhbiBvYmplY3QgbGl0ZXJhbFxuICBpZiAodHlwZW9mKGV2dHMpID09PSBcInN0cmluZ1wiKSB7XG4gICAgZXZ0TmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICBmbiA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGV2dHMgPSB7XG4gICAgICBbZXZ0TmFtZV06IGZuXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBldnRzO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50aW5nO1xuIl19