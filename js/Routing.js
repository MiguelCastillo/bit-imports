"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.match = exports.Routing = undefined;

var _Eventing = require("./Eventing");

var _Eventing2 = _interopRequireDefault(_Eventing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var enabled = true;

function registerEvents(router) {
  _Eventing2.default.create(document).on("click", function (evt) {
    if (!enabled) {
      return;
    }

    if (evt.target.tagName !== "a" && evt.target.tagName !== "A") {
      return;
    }

    var state = buildState(evt.target.getAttribute("href") || "");

    if (!state.isHash && router.hasMatches(state.cleanHref)) {
      evt.preventDefault();
      history.pushState(state, state.href, state.href);
      router.setState(state);
    }
    // else if (!router.state.isHash) {
    //   evt.preventDefault();
    // }
  });

  _Eventing2.default.create(window).on("popstate", function (evt) {
    return router.setState(evt.state);
  });
}

var Routing = (function () {
  function Routing() {
    _classCallCheck(this, Routing);

    this._contexts = [];
    this._all = [];
    this._none = [];
    this.state = buildState(location.pathname);
    registerEvents(this);
  }

  _createClass(Routing, [{
    key: "on",
    value: function on(match, fn, data) {
      if (match instanceof MatchAll) {
        this._all.push({ match: match, fn: fn, data: data });
      } else if (match instanceof MatchNone) {
        this._none.push({ match: match, fn: fn, data: data });
      } else {
        this._contexts.push({ match: match, fn: fn, data: data });
      }

      return this;
    }
  }, {
    key: "off",
    value: function off(fn) {
      var index;
      var hasItem = this._contexts.some(function (ctx, i) {
        index = i;
        return ctx.fn === fn;
      });

      if (hasItem) {
        this._contexts.splice(index, 1);
      }

      return this;
    }
  }, {
    key: "enable",
    value: function enable() {
      enabled = true;
      return this;
    }
  }, {
    key: "disable",
    value: function disable() {
      enabled = false;
      return this;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var state = this.state;

      var executed = this._contexts.filter(function (ctx) {
        return ctx.match.test(state.cleanHref);
      }).map(function (ctx) {
        return ctx.fn(ctx.match.exec(state.cleanHref), ctx.data);
      });

      if (!executed.length) {
        this._none.forEach(function (ctx) {
          return ctx.fn(ctx.match.exec(state.cleanHref), ctx.data);
        });
      }

      this._all.forEach(function (ctx) {
        return ctx.fn(ctx.match.exec(state.cleanHref), ctx.data);
      });

      return executed.length;
    }
  }, {
    key: "test",
    value: function test(match) {
      return this.state && match.test(this.state.cleanHref);
    }
  }, {
    key: "setState",
    value: function setState(state, fn) {
      var _this = this;

      if (state && this.state.href !== state.href) {
        this.state = state;

        if (!this.pending) {
          this.pending = true;

          setTimeout(function () {
            _this.refresh();
            _this.pending = false;

            if (fn) {
              fn();
            }
          });
        }
      }

      return this;
    }
  }, {
    key: "navigate",
    value: function navigate(href) {
      var state = buildState(href);

      if (!state.isHash && this.hasMatches(href)) {
        if (this.state.href !== state.href) {
          history.pushState(state, state.href, state.href);
          this.setState(state);
        }
      } else {
        location.assign(href);
      }

      return this;
    }
  }, {
    key: "hasMatches",
    value: function hasMatches(href) {
      return this._contexts.some(function (ctx) {
        return ctx.match.test(href);
      });
    }
  }, {
    key: "match",
    get: function get() {
      return match;
    }
  }]);

  return Routing;
})();

function isHash(href) {
  return (/^[\s|\/]*#/.test(href)
  );
}

function cleanUpHref(href) {
  return href.replace(/^[\s|\/|#]*/, "");
}

function buildState(href) {
  return {
    isHash: isHash(href),
    href: href,
    cleanHref: cleanUpHref(href)
  };
}

var Match = (function () {
  function Match(match) {
    _classCallCheck(this, Match);

    this._match = match;
  }

  _createClass(Match, [{
    key: "test",
    value: function test(t) {
      return this._match.test(t);
    }
  }, {
    key: "exec",
    value: function exec(t) {
      return this._match.exec(t);
    }
  }]);

  return Match;
})();

var MatchAll = (function (_Match) {
  _inherits(MatchAll, _Match);

  function MatchAll() {
    _classCallCheck(this, MatchAll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchAll).call(this, /.*/));
  }

  return MatchAll;
})(Match);

var MatchNone = (function (_Match2) {
  _inherits(MatchNone, _Match2);

  function MatchNone() {
    _classCallCheck(this, MatchNone);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchNone).apply(this, arguments));
  }

  _createClass(MatchNone, [{
    key: "test",
    value: function test() {
      return true;
    }
  }, {
    key: "exec",
    value: function exec() {}
  }]);

  return MatchNone;
})(Match);

var MatchEmpty = (function (_Match3) {
  _inherits(MatchEmpty, _Match3);

  function MatchEmpty() {
    _classCallCheck(this, MatchEmpty);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchEmpty).call(this, /^$/g));
  }

  return MatchEmpty;
})(Match);

var match = {
  all: new MatchAll(),
  none: new MatchNone(),
  empty: new MatchEmpty()
};

exports.default = new Routing();
exports.Routing = Routing;
exports.match = match;
//# sourceMappingURL=data:application/json;base64,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O0dBQ1g7O1NBSEcsUUFBUTtHQUFTLEtBQUs7O0lBTXRCLFNBQVM7WUFBVCxTQUFTOztXQUFULFNBQVM7MEJBQVQsU0FBUzs7a0VBQVQsU0FBUzs7O2VBQVQsU0FBUzs7MkJBQ047QUFDTCxhQUFPLElBQUksQ0FBQztLQUNiOzs7MkJBRU0sRUFDTjs7O1NBTkcsU0FBUztHQUFTLEtBQUs7O0lBU3ZCLFVBQVU7WUFBVixVQUFVOztBQUNkLFdBREksVUFBVSxHQUNBOzBCQURWLFVBQVU7O2tFQUFWLFVBQVUsYUFFTixLQUFLO0dBQ1o7O1NBSEcsVUFBVTtHQUFTLEtBQUs7O0FBTTlCLElBQUksS0FBSyxHQUFHO0FBQ1YsS0FBRyxFQUFFLElBQUksUUFBUSxFQUFFO0FBQ25CLE1BQUksRUFBRSxJQUFJLFNBQVMsRUFBRTtBQUNyQixPQUFLLEVBQUUsSUFBSSxVQUFVLEVBQUU7Q0FDeEIsQ0FBQTs7a0JBRWMsSUFBSSxPQUFPLEVBQUU7UUFDbkIsT0FBTyxHQUFQLE9BQU87UUFBRSxLQUFLLEdBQUwsS0FBSyIsImZpbGUiOiJSb3V0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50aW5nIGZyb20gJy4vRXZlbnRpbmcnO1xuXG52YXIgZW5hYmxlZCA9IHRydWU7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRzKHJvdXRlcikge1xuICBFdmVudGluZ1xuICAgIC5jcmVhdGUoZG9jdW1lbnQpXG4gICAgLm9uKFwiY2xpY2tcIiwgKGV2dCkgPT4ge1xuICAgICAgaWYgKCFlbmFibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2dC50YXJnZXQudGFnTmFtZSAhPT0gXCJhXCIgJiYgZXZ0LnRhcmdldC50YWdOYW1lICE9PSBcIkFcIikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9IGJ1aWxkU3RhdGUoZXZ0LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpIHx8IFwiXCIpO1xuXG4gICAgICBpZiAoIXN0YXRlLmlzSGFzaCAmJiByb3V0ZXIuaGFzTWF0Y2hlcyhzdGF0ZS5jbGVhbkhyZWYpKSB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgc3RhdGUuaHJlZiwgc3RhdGUuaHJlZik7XG4gICAgICAgIHJvdXRlci5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICB9XG4gICAgICAvLyBlbHNlIGlmICghcm91dGVyLnN0YXRlLmlzSGFzaCkge1xuICAgICAgLy8gICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIH1cbiAgICB9KTtcblxuICBFdmVudGluZ1xuICAgIC5jcmVhdGUod2luZG93KVxuICAgIC5vbihcInBvcHN0YXRlXCIsIChldnQpID0+IHJvdXRlci5zZXRTdGF0ZShldnQuc3RhdGUpKTtcbn1cblxuXG5jbGFzcyBSb3V0aW5nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fY29udGV4dHMgPSBbXTtcbiAgICB0aGlzLl9hbGwgPSBbXTtcbiAgICB0aGlzLl9ub25lID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IGJ1aWxkU3RhdGUobG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIHJlZ2lzdGVyRXZlbnRzKHRoaXMpO1xuICB9XG5cbiAgb24obWF0Y2gsIGZuLCBkYXRhKSB7XG4gICAgaWYgKG1hdGNoIGluc3RhbmNlb2YgTWF0Y2hBbGwpIHtcbiAgICAgIHRoaXMuX2FsbC5wdXNoKHsgbWF0Y2gsIGZuLCBkYXRhIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChtYXRjaCBpbnN0YW5jZW9mIE1hdGNoTm9uZSkge1xuICAgICAgdGhpcy5fbm9uZS5wdXNoKHsgbWF0Y2gsIGZuLCBkYXRhIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbnRleHRzLnB1c2goeyBtYXRjaCwgZm4sIGRhdGEgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvZmYoZm4pIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgdmFyIGhhc0l0ZW0gPSB0aGlzLl9jb250ZXh0cy5zb21lKChjdHgsIGkpID0+IHtcbiAgICAgIGluZGV4ID0gaTtcbiAgICAgIHJldHVybiBjdHguZm4gPT09IGZuO1xuICAgIH0pO1xuXG4gICAgaWYgKGhhc0l0ZW0pIHtcbiAgICAgIHRoaXMuX2NvbnRleHRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbmFibGUoKSB7XG4gICAgZW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlKCkge1xuICAgIGVuYWJsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlZnJlc2goKSB7XG4gICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgIHZhciBleGVjdXRlZCA9IHRoaXNcbiAgICAgIC5fY29udGV4dHNcbiAgICAgIC5maWx0ZXIoKGN0eCkgPT4gY3R4Lm1hdGNoLnRlc3Qoc3RhdGUuY2xlYW5IcmVmKSlcbiAgICAgIC5tYXAoKGN0eCkgPT4gY3R4LmZuKGN0eC5tYXRjaC5leGVjKHN0YXRlLmNsZWFuSHJlZiksIGN0eC5kYXRhKSk7XG5cbiAgICBpZiAoIWV4ZWN1dGVkLmxlbmd0aCkge1xuICAgICAgdGhpc1xuICAgICAgICAuX25vbmVcbiAgICAgICAgLmZvckVhY2goKGN0eCkgPT4gY3R4LmZuKGN0eC5tYXRjaC5leGVjKHN0YXRlLmNsZWFuSHJlZiksIGN0eC5kYXRhKSk7XG4gICAgfVxuXG4gICAgdGhpc1xuICAgICAgLl9hbGxcbiAgICAgIC5mb3JFYWNoKChjdHgpID0+IGN0eC5mbihjdHgubWF0Y2guZXhlYyhzdGF0ZS5jbGVhbkhyZWYpLCBjdHguZGF0YSkpO1xuXG4gICAgcmV0dXJuIGV4ZWN1dGVkLmxlbmd0aDtcbiAgfVxuXG4gIHRlc3QobWF0Y2gpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZSAmJiBtYXRjaC50ZXN0KHRoaXMuc3RhdGUuY2xlYW5IcmVmKTtcbiAgfVxuXG4gIHNldFN0YXRlKHN0YXRlLCBmbikge1xuICAgIGlmIChzdGF0ZSAmJiB0aGlzLnN0YXRlLmhyZWYgIT09IHN0YXRlLmhyZWYpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcblxuICAgICAgaWYgKCF0aGlzLnBlbmRpbmcpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICB0aGlzLnBlbmRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbmF2aWdhdGUoaHJlZikge1xuICAgIHZhciBzdGF0ZSA9IGJ1aWxkU3RhdGUoaHJlZik7XG5cbiAgICBpZiAoIXN0YXRlLmlzSGFzaCAmJiB0aGlzLmhhc01hdGNoZXMoaHJlZikpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmhyZWYgIT09IHN0YXRlLmhyZWYpIHtcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsIHN0YXRlLmhyZWYsIHN0YXRlLmhyZWYpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsb2NhdGlvbi5hc3NpZ24oaHJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBoYXNNYXRjaGVzKGhyZWYpIHtcbiAgICByZXR1cm4gdGhpc1xuICAgICAgLl9jb250ZXh0c1xuICAgICAgLnNvbWUoKGN0eCkgPT4gY3R4Lm1hdGNoLnRlc3QoaHJlZikpO1xuICB9XG5cbiAgZ2V0IG1hdGNoKCkge1xuICAgIHJldHVybiBtYXRjaDtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0hhc2goaHJlZikge1xuICByZXR1cm4gL15bXFxzfFxcL10qIy8udGVzdChocmVmKTtcbn1cblxuZnVuY3Rpb24gY2xlYW5VcEhyZWYoaHJlZikge1xuICByZXR1cm4gaHJlZi5yZXBsYWNlKC9eW1xcc3xcXC98I10qLywgXCJcIik7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkU3RhdGUoaHJlZikge1xuICByZXR1cm4ge1xuICAgIGlzSGFzaDogaXNIYXNoKGhyZWYpLFxuICAgIGhyZWY6IGhyZWYsXG4gICAgY2xlYW5IcmVmOiBjbGVhblVwSHJlZihocmVmKVxuICB9O1xufVxuXG5cbmNsYXNzIE1hdGNoIHtcbiAgY29uc3RydWN0b3IobWF0Y2gpIHtcbiAgICB0aGlzLl9tYXRjaCA9IG1hdGNoO1xuICB9XG5cbiAgdGVzdCh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX21hdGNoLnRlc3QodCk7XG4gIH1cblxuICBleGVjKHQpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF0Y2guZXhlYyh0KTtcbiAgfVxufVxuXG5jbGFzcyBNYXRjaEFsbCBleHRlbmRzIE1hdGNoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLy4qLyk7XG4gIH1cbn1cblxuY2xhc3MgTWF0Y2hOb25lIGV4dGVuZHMgTWF0Y2gge1xuICB0ZXN0KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZXhlYygpIHtcbiAgfVxufVxuXG5jbGFzcyBNYXRjaEVtcHR5IGV4dGVuZHMgTWF0Y2gge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigvXiQvZyk7XG4gIH1cbn1cblxudmFyIG1hdGNoID0ge1xuICBhbGw6IG5ldyBNYXRjaEFsbCgpLFxuICBub25lOiBuZXcgTWF0Y2hOb25lKCksXG4gIGVtcHR5OiBuZXcgTWF0Y2hFbXB0eSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBSb3V0aW5nKCk7XG5leHBvcnQgeyBSb3V0aW5nLCBtYXRjaCB9O1xuIl19