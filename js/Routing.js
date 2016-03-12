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
//# sourceMappingURL=data:application/json;base64,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aUI7R0FBbkI7O2VBREk7O3lCQUtDLEdBQUc7QUFDTixhQUFPLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsQ0FBakIsQ0FBUCxDQURNOzs7O3lCQUlILEdBQUc7QUFDTixhQUFPLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsQ0FBakIsQ0FBUCxDQURNOzs7O1NBVEo7OztJQWNBOzs7QUFDSixXQURJLFFBQ0osR0FBYzswQkFEVixVQUNVOztrRUFEVixxQkFFSSxPQURNO0dBQWQ7O1NBREk7RUFBaUI7O0lBTWpCOzs7Ozs7Ozs7OzsyQkFDRztBQUNMLGFBQU8sSUFBUCxDQURLOzs7OzJCQUlBOzs7U0FMSDtFQUFrQjs7SUFTbEI7OztBQUNKLFdBREksVUFDSixHQUFjOzBCQURWLFlBQ1U7O2tFQURWLHVCQUVJLFFBRE07R0FBZDs7U0FESTtFQUFtQjs7QUFNekIsSUFBSSxRQUFRO0FBQ1YsT0FBSyxJQUFJLFFBQUosRUFBTDtBQUNBLFFBQU0sSUFBSSxTQUFKLEVBQU47QUFDQSxTQUFPLElBQUksVUFBSixFQUFQO0NBSEU7O2tCQU1XLElBQUksT0FBSjtRQUNOO1FBQVMiLCJmaWxlIjoiUm91dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudGluZyBmcm9tICcuL0V2ZW50aW5nJztcblxudmFyIGVuYWJsZWQgPSB0cnVlO1xuXG5mdW5jdGlvbiByZWdpc3RlckV2ZW50cyhyb3V0ZXIpIHtcbiAgRXZlbnRpbmdcbiAgICAuY3JlYXRlKGRvY3VtZW50KVxuICAgIC5vbihcImNsaWNrXCIsIChldnQpID0+IHtcbiAgICAgIGlmICghZW5hYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChldnQudGFyZ2V0LnRhZ05hbWUgIT09IFwiYVwiICYmIGV2dC50YXJnZXQudGFnTmFtZSAhPT0gXCJBXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSBidWlsZFN0YXRlKGV2dC50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSB8fCBcIlwiKTtcblxuICAgICAgaWYgKCFzdGF0ZS5pc0hhc2ggJiYgcm91dGVyLmhhc01hdGNoZXMoc3RhdGUuY2xlYW5IcmVmKSkge1xuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoc3RhdGUsIHN0YXRlLmhyZWYsIHN0YXRlLmhyZWYpO1xuICAgICAgICByb3V0ZXIuc2V0U3RhdGUoc3RhdGUpO1xuICAgICAgfVxuICAgICAgLy8gZWxzZSBpZiAoIXJvdXRlci5zdGF0ZS5pc0hhc2gpIHtcbiAgICAgIC8vICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyB9XG4gICAgfSk7XG5cbiAgRXZlbnRpbmdcbiAgICAuY3JlYXRlKHdpbmRvdylcbiAgICAub24oXCJwb3BzdGF0ZVwiLCAoZXZ0KSA9PiByb3V0ZXIuc2V0U3RhdGUoZXZ0LnN0YXRlKSk7XG59XG5cblxuY2xhc3MgUm91dGluZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2NvbnRleHRzID0gW107XG4gICAgdGhpcy5fYWxsID0gW107XG4gICAgdGhpcy5fbm9uZSA9IFtdO1xuICAgIHRoaXMuc3RhdGUgPSBidWlsZFN0YXRlKGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICByZWdpc3RlckV2ZW50cyh0aGlzKTtcbiAgfVxuXG4gIG9uKG1hdGNoLCBmbiwgZGF0YSkge1xuICAgIGlmIChtYXRjaCBpbnN0YW5jZW9mIE1hdGNoQWxsKSB7XG4gICAgICB0aGlzLl9hbGwucHVzaCh7IG1hdGNoLCBmbiwgZGF0YSB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAobWF0Y2ggaW5zdGFuY2VvZiBNYXRjaE5vbmUpIHtcbiAgICAgIHRoaXMuX25vbmUucHVzaCh7IG1hdGNoLCBmbiwgZGF0YSB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9jb250ZXh0cy5wdXNoKHsgbWF0Y2gsIGZuLCBkYXRhIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgb2ZmKGZuKSB7XG4gICAgdmFyIGluZGV4O1xuICAgIHZhciBoYXNJdGVtID0gdGhpcy5fY29udGV4dHMuc29tZSgoY3R4LCBpKSA9PiB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgICByZXR1cm4gY3R4LmZuID09PSBmbjtcbiAgICB9KTtcblxuICAgIGlmIChoYXNJdGVtKSB7XG4gICAgICB0aGlzLl9jb250ZXh0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZW5hYmxlKCkge1xuICAgIGVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICBlbmFibGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZWZyZXNoKCkge1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICB2YXIgZXhlY3V0ZWQgPSB0aGlzXG4gICAgICAuX2NvbnRleHRzXG4gICAgICAuZmlsdGVyKChjdHgpID0+IGN0eC5tYXRjaC50ZXN0KHN0YXRlLmNsZWFuSHJlZikpXG4gICAgICAubWFwKChjdHgpID0+IGN0eC5mbihjdHgubWF0Y2guZXhlYyhzdGF0ZS5jbGVhbkhyZWYpLCBjdHguZGF0YSkpO1xuXG4gICAgaWYgKCFleGVjdXRlZC5sZW5ndGgpIHtcbiAgICAgIHRoaXNcbiAgICAgICAgLl9ub25lXG4gICAgICAgIC5mb3JFYWNoKChjdHgpID0+IGN0eC5mbihjdHgubWF0Y2guZXhlYyhzdGF0ZS5jbGVhbkhyZWYpLCBjdHguZGF0YSkpO1xuICAgIH1cblxuICAgIHRoaXNcbiAgICAgIC5fYWxsXG4gICAgICAuZm9yRWFjaCgoY3R4KSA9PiBjdHguZm4oY3R4Lm1hdGNoLmV4ZWMoc3RhdGUuY2xlYW5IcmVmKSwgY3R4LmRhdGEpKTtcblxuICAgIHJldHVybiBleGVjdXRlZC5sZW5ndGg7XG4gIH1cblxuICB0ZXN0KG1hdGNoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUgJiYgbWF0Y2gudGVzdCh0aGlzLnN0YXRlLmNsZWFuSHJlZik7XG4gIH1cblxuICBzZXRTdGF0ZShzdGF0ZSwgZm4pIHtcbiAgICBpZiAoc3RhdGUgJiYgdGhpcy5zdGF0ZS5ocmVmICE9PSBzdGF0ZS5ocmVmKSB7XG4gICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG5cbiAgICAgIGlmICghdGhpcy5wZW5kaW5nKSB7XG4gICAgICAgIHRoaXMucGVuZGluZyA9IHRydWU7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgdGhpcy5wZW5kaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG5hdmlnYXRlKGhyZWYpIHtcbiAgICB2YXIgc3RhdGUgPSBidWlsZFN0YXRlKGhyZWYpO1xuXG4gICAgaWYgKCFzdGF0ZS5pc0hhc2ggJiYgdGhpcy5oYXNNYXRjaGVzKGhyZWYpKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5ocmVmICE9PSBzdGF0ZS5ocmVmKSB7XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHN0YXRlLCBzdGF0ZS5ocmVmLCBzdGF0ZS5ocmVmKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbG9jYXRpb24uYXNzaWduKGhyZWYpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaGFzTWF0Y2hlcyhocmVmKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgICAgIC5fY29udGV4dHNcbiAgICAgIC5zb21lKChjdHgpID0+IGN0eC5tYXRjaC50ZXN0KGhyZWYpKTtcbiAgfVxuXG4gIGdldCBtYXRjaCgpIHtcbiAgICByZXR1cm4gbWF0Y2g7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNIYXNoKGhyZWYpIHtcbiAgcmV0dXJuIC9eW1xcc3xcXC9dKiMvLnRlc3QoaHJlZik7XG59XG5cbmZ1bmN0aW9uIGNsZWFuVXBIcmVmKGhyZWYpIHtcbiAgcmV0dXJuIGhyZWYucmVwbGFjZSgvXltcXHN8XFwvfCNdKi8sIFwiXCIpO1xufVxuXG5mdW5jdGlvbiBidWlsZFN0YXRlKGhyZWYpIHtcbiAgcmV0dXJuIHtcbiAgICBpc0hhc2g6IGlzSGFzaChocmVmKSxcbiAgICBocmVmOiBocmVmLFxuICAgIGNsZWFuSHJlZjogY2xlYW5VcEhyZWYoaHJlZilcbiAgfTtcbn1cblxuXG5jbGFzcyBNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKG1hdGNoKSB7XG4gICAgdGhpcy5fbWF0Y2ggPSBtYXRjaDtcbiAgfVxuXG4gIHRlc3QodCkge1xuICAgIHJldHVybiB0aGlzLl9tYXRjaC50ZXN0KHQpO1xuICB9XG5cbiAgZXhlYyh0KSB7XG4gICAgcmV0dXJuIHRoaXMuX21hdGNoLmV4ZWModCk7XG4gIH1cbn1cblxuY2xhc3MgTWF0Y2hBbGwgZXh0ZW5kcyBNYXRjaCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKC8uKi8pO1xuICB9XG59XG5cbmNsYXNzIE1hdGNoTm9uZSBleHRlbmRzIE1hdGNoIHtcbiAgdGVzdCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGV4ZWMoKSB7XG4gIH1cbn1cblxuY2xhc3MgTWF0Y2hFbXB0eSBleHRlbmRzIE1hdGNoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoL14kL2cpO1xuICB9XG59XG5cbnZhciBtYXRjaCA9IHtcbiAgYWxsOiBuZXcgTWF0Y2hBbGwoKSxcbiAgbm9uZTogbmV3IE1hdGNoTm9uZSgpLFxuICBlbXB0eTogbmV3IE1hdGNoRW1wdHkoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgUm91dGluZygpO1xuZXhwb3J0IHsgUm91dGluZywgbWF0Y2ggfTtcbiJdfQ==