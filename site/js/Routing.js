import Eventing from './Eventing';

var enabled = true;

function registerEvents(router) {
  Eventing
    .create(document)
    .on("click", (evt) => {
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

  Eventing
    .create(window)
    .on("popstate", (evt) => router.setState(evt.state));
}


class Routing {
  constructor() {
    this._contexts = [];
    this._all = [];
    this._none = [];
    this.state = buildState(location.pathname);
    registerEvents(this);
  }

  on(match, fn, data) {
    if (match instanceof MatchAll) {
      this._all.push({ match, fn, data });
    }
    else if (match instanceof MatchNone) {
      this._none.push({ match, fn, data });
    }
    else {
      this._contexts.push({ match, fn, data });
    }

    return this;
  }

  off(fn) {
    var index;
    var hasItem = this._contexts.some((ctx, i) => {
      index = i;
      return ctx.fn === fn;
    });

    if (hasItem) {
      this._contexts.splice(index, 1);
    }

    return this;
  }

  enable() {
    enabled = true;
    return this;
  }

  disable() {
    enabled = false;
    return this;
  }

  refresh() {
    var state = this.state;

    var executed = this
      ._contexts
      .filter((ctx) => ctx.match.test(state.cleanHref))
      .map((ctx) => ctx.fn(ctx.match.exec(state.cleanHref), ctx.data));

    if (!executed.length) {
      this
        ._none
        .forEach((ctx) => ctx.fn(ctx.match.exec(state.cleanHref), ctx.data));
    }

    this
      ._all
      .forEach((ctx) => ctx.fn(ctx.match.exec(state.cleanHref), ctx.data));

    return executed.length;
  }

  test(match) {
    return this.state && match.test(this.state.cleanHref);
  }

  setState(state, fn) {
    if (state && this.state.href !== state.href) {
      this.state = state;

      if (!this.pending) {
        this.pending = true;

        setTimeout(() => {
          this.refresh();
          this.pending = false;

          if (fn) {
            fn();
          }
        });
      }
    }

    return this;
  }

  navigate(href) {
    var state = buildState(href);

    if (!state.isHash && this.hasMatches(href)) {
      if (this.state.href !== state.href) {
        history.pushState(state, state.href, state.href);
        this.setState(state);
      }
    }
    else {
      location.assign(href);
    }

    return this;
  }

  hasMatches(href) {
    return this
      ._contexts
      .some((ctx) => ctx.match.test(href));
  }

  get match() {
    return match;
  }
}

function isHash(href) {
  return /^[\s|\/]*#/.test(href);
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


class Match {
  constructor(match) {
    this._match = match;
  }

  test(t) {
    return this._match.test(t);
  }

  exec(t) {
    return this._match.exec(t);
  }
}

class MatchAll extends Match {
  constructor() {
    super(/.*/);
  }
}

class MatchNone extends Match {
  test() {
    return true;
  }

  exec() {
  }
}

class MatchEmpty extends Match {
  constructor() {
    super(/^$/g);
  }
}

var match = {
  all: new MatchAll(),
  none: new MatchNone(),
  empty: new MatchEmpty()
}

export default new Routing();
export { Routing, match };
