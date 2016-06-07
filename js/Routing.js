"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.match = exports.Routing = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Routing = function () {
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
}();

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

var Match = function () {
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
}();

var MatchAll = function (_Match) {
  _inherits(MatchAll, _Match);

  function MatchAll() {
    _classCallCheck(this, MatchAll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchAll).call(this, /.*/));
  }

  return MatchAll;
}(Match);

var MatchNone = function (_Match2) {
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
}(Match);

var MatchEmpty = function (_Match3) {
  _inherits(MatchEmpty, _Match3);

  function MatchEmpty() {
    _classCallCheck(this, MatchEmpty);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchEmpty).call(this, /^$/g));
  }

  return MatchEmpty;
}(Match);

var match = {
  all: new MatchAll(),
  none: new MatchNone(),
  empty: new MatchEmpty()
};

exports.default = new Routing();
exports.Routing = Routing;
exports.match = match;
//# sourceMappingURL=data:application/json;base64,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QUViOzs7RUFIb0IsSzs7SUFNakIsUzs7Ozs7Ozs7Ozs7MkJBQ0c7QUFDTCxhQUFPLElBQVA7QUFDRDs7OzJCQUVNLENBQ047Ozs7RUFOcUIsSzs7SUFTbEIsVTs7O0FBQ0osd0JBQWM7QUFBQTs7QUFBQSx5RkFDTixLQURNO0FBRWI7OztFQUhzQixLOztBQU16QixJQUFJLFFBQVE7QUFDVixPQUFLLElBQUksUUFBSixFQURLO0FBRVYsUUFBTSxJQUFJLFNBQUosRUFGSTtBQUdWLFNBQU8sSUFBSSxVQUFKO0FBSEcsQ0FBWjs7a0JBTWUsSUFBSSxPQUFKLEU7UUFDTixPLEdBQUEsTztRQUFTLEssR0FBQSxLIiwiZmlsZSI6IlJvdXRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRpbmcgZnJvbSAnLi9FdmVudGluZyc7XG5cbnZhciBlbmFibGVkID0gdHJ1ZTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJFdmVudHMocm91dGVyKSB7XG4gIEV2ZW50aW5nXG4gICAgLmNyZWF0ZShkb2N1bWVudClcbiAgICAub24oXCJjbGlja1wiLCAoZXZ0KSA9PiB7XG4gICAgICBpZiAoIWVuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZ0LnRhcmdldC50YWdOYW1lICE9PSBcImFcIiAmJiBldnQudGFyZ2V0LnRhZ05hbWUgIT09IFwiQVwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXRlID0gYnVpbGRTdGF0ZShldnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIikgfHwgXCJcIik7XG5cbiAgICAgIGlmICghc3RhdGUuaXNIYXNoICYmIHJvdXRlci5oYXNNYXRjaGVzKHN0YXRlLmNsZWFuSHJlZikpIHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCBzdGF0ZS5ocmVmLCBzdGF0ZS5ocmVmKTtcbiAgICAgICAgcm91dGVyLnNldFN0YXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgaWYgKCFyb3V0ZXIuc3RhdGUuaXNIYXNoKSB7XG4gICAgICAvLyAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gfVxuICAgIH0pO1xuXG4gIEV2ZW50aW5nXG4gICAgLmNyZWF0ZSh3aW5kb3cpXG4gICAgLm9uKFwicG9wc3RhdGVcIiwgKGV2dCkgPT4gcm91dGVyLnNldFN0YXRlKGV2dC5zdGF0ZSkpO1xufVxuXG5cbmNsYXNzIFJvdXRpbmcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9jb250ZXh0cyA9IFtdO1xuICAgIHRoaXMuX2FsbCA9IFtdO1xuICAgIHRoaXMuX25vbmUgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0gYnVpbGRTdGF0ZShsb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgcmVnaXN0ZXJFdmVudHModGhpcyk7XG4gIH1cblxuICBvbihtYXRjaCwgZm4sIGRhdGEpIHtcbiAgICBpZiAobWF0Y2ggaW5zdGFuY2VvZiBNYXRjaEFsbCkge1xuICAgICAgdGhpcy5fYWxsLnB1c2goeyBtYXRjaCwgZm4sIGRhdGEgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1hdGNoIGluc3RhbmNlb2YgTWF0Y2hOb25lKSB7XG4gICAgICB0aGlzLl9ub25lLnB1c2goeyBtYXRjaCwgZm4sIGRhdGEgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5fY29udGV4dHMucHVzaCh7IG1hdGNoLCBmbiwgZGF0YSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9mZihmbikge1xuICAgIHZhciBpbmRleDtcbiAgICB2YXIgaGFzSXRlbSA9IHRoaXMuX2NvbnRleHRzLnNvbWUoKGN0eCwgaSkgPT4ge1xuICAgICAgaW5kZXggPSBpO1xuICAgICAgcmV0dXJuIGN0eC5mbiA9PT0gZm47XG4gICAgfSk7XG5cbiAgICBpZiAoaGFzSXRlbSkge1xuICAgICAgdGhpcy5fY29udGV4dHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVuYWJsZSgpIHtcbiAgICBlbmFibGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc2FibGUoKSB7XG4gICAgZW5hYmxlZCA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgdmFyIGV4ZWN1dGVkID0gdGhpc1xuICAgICAgLl9jb250ZXh0c1xuICAgICAgLmZpbHRlcigoY3R4KSA9PiBjdHgubWF0Y2gudGVzdChzdGF0ZS5jbGVhbkhyZWYpKVxuICAgICAgLm1hcCgoY3R4KSA9PiBjdHguZm4oY3R4Lm1hdGNoLmV4ZWMoc3RhdGUuY2xlYW5IcmVmKSwgY3R4LmRhdGEpKTtcblxuICAgIGlmICghZXhlY3V0ZWQubGVuZ3RoKSB7XG4gICAgICB0aGlzXG4gICAgICAgIC5fbm9uZVxuICAgICAgICAuZm9yRWFjaCgoY3R4KSA9PiBjdHguZm4oY3R4Lm1hdGNoLmV4ZWMoc3RhdGUuY2xlYW5IcmVmKSwgY3R4LmRhdGEpKTtcbiAgICB9XG5cbiAgICB0aGlzXG4gICAgICAuX2FsbFxuICAgICAgLmZvckVhY2goKGN0eCkgPT4gY3R4LmZuKGN0eC5tYXRjaC5leGVjKHN0YXRlLmNsZWFuSHJlZiksIGN0eC5kYXRhKSk7XG5cbiAgICByZXR1cm4gZXhlY3V0ZWQubGVuZ3RoO1xuICB9XG5cbiAgdGVzdChtYXRjaCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlICYmIG1hdGNoLnRlc3QodGhpcy5zdGF0ZS5jbGVhbkhyZWYpO1xuICB9XG5cbiAgc2V0U3RhdGUoc3RhdGUsIGZuKSB7XG4gICAgaWYgKHN0YXRlICYmIHRoaXMuc3RhdGUuaHJlZiAhPT0gc3RhdGUuaHJlZikge1xuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuXG4gICAgICBpZiAoIXRoaXMucGVuZGluZykge1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgIHRoaXMucGVuZGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICBmbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBuYXZpZ2F0ZShocmVmKSB7XG4gICAgdmFyIHN0YXRlID0gYnVpbGRTdGF0ZShocmVmKTtcblxuICAgIGlmICghc3RhdGUuaXNIYXNoICYmIHRoaXMuaGFzTWF0Y2hlcyhocmVmKSkge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaHJlZiAhPT0gc3RhdGUuaHJlZikge1xuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgc3RhdGUuaHJlZiwgc3RhdGUuaHJlZik7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxvY2F0aW9uLmFzc2lnbihocmVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGhhc01hdGNoZXMoaHJlZikge1xuICAgIHJldHVybiB0aGlzXG4gICAgICAuX2NvbnRleHRzXG4gICAgICAuc29tZSgoY3R4KSA9PiBjdHgubWF0Y2gudGVzdChocmVmKSk7XG4gIH1cblxuICBnZXQgbWF0Y2goKSB7XG4gICAgcmV0dXJuIG1hdGNoO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzSGFzaChocmVmKSB7XG4gIHJldHVybiAvXltcXHN8XFwvXSojLy50ZXN0KGhyZWYpO1xufVxuXG5mdW5jdGlvbiBjbGVhblVwSHJlZihocmVmKSB7XG4gIHJldHVybiBocmVmLnJlcGxhY2UoL15bXFxzfFxcL3wjXSovLCBcIlwiKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTdGF0ZShocmVmKSB7XG4gIHJldHVybiB7XG4gICAgaXNIYXNoOiBpc0hhc2goaHJlZiksXG4gICAgaHJlZjogaHJlZixcbiAgICBjbGVhbkhyZWY6IGNsZWFuVXBIcmVmKGhyZWYpXG4gIH07XG59XG5cblxuY2xhc3MgTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihtYXRjaCkge1xuICAgIHRoaXMuX21hdGNoID0gbWF0Y2g7XG4gIH1cblxuICB0ZXN0KHQpIHtcbiAgICByZXR1cm4gdGhpcy5fbWF0Y2gudGVzdCh0KTtcbiAgfVxuXG4gIGV4ZWModCkge1xuICAgIHJldHVybiB0aGlzLl9tYXRjaC5leGVjKHQpO1xuICB9XG59XG5cbmNsYXNzIE1hdGNoQWxsIGV4dGVuZHMgTWF0Y2gge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigvLiovKTtcbiAgfVxufVxuXG5jbGFzcyBNYXRjaE5vbmUgZXh0ZW5kcyBNYXRjaCB7XG4gIHRlc3QoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBleGVjKCkge1xuICB9XG59XG5cbmNsYXNzIE1hdGNoRW1wdHkgZXh0ZW5kcyBNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC9eJC9nKTtcbiAgfVxufVxuXG52YXIgbWF0Y2ggPSB7XG4gIGFsbDogbmV3IE1hdGNoQWxsKCksXG4gIG5vbmU6IG5ldyBNYXRjaE5vbmUoKSxcbiAgZW1wdHk6IG5ldyBNYXRjaEVtcHR5KClcbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFJvdXRpbmcoKTtcbmV4cG9ydCB7IFJvdXRpbmcsIG1hdGNoIH07XG4iXX0=