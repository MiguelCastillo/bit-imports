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

      if ((!router.state || router.state.href !== state.href) && !state.isHash) {
        if (router.refresh(state.href)) {
          evt.preventDefault();
          router.setState(state);
        }
      }
      else if (!router.state.isHash) {
        evt.preventDefault();
      }
    });

  Eventing
    .create(window)
    .on("popstate", () => router.refresh());
}


class Routing {
  constructor() {
    this.state = null;
    this._contexts = [];
    this._all = [];
    this._none = [];
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

  refresh(href) {
    var state = buildState(href || window.location.pathname);

    var executed = this
      ._contexts
      .filter((ctx) => ctx.match.test(state.location))
      .map((ctx) => ctx.fn(ctx.match.exec(state.location), ctx.data));

    if (!executed.length) {
      this
        ._none
        .forEach((ctx) => ctx.fn(ctx.match.exec(state.location), ctx.data));
    }

    this
      ._all
      .forEach((ctx) => ctx.fn(ctx.match.exec(state.location), ctx.data));

    return executed.length;
  }

  test(match) {
    return this.state && match.test(this.state.location);
  }

  setState(state) {
    if (!this.state || this.state.href !== state.href) {
      this.state = state;
      history.pushState(state, state.href, state.href);
    }

    return this;
  }

  navigate(href) {
    this.setState(buildState(href));
    return this;
  }

  get match() {
    return match;
  }
}

function isHash(href) {
  return /^[\s|\/]*#/.test(href);
}

function cleanHref(href) {
  return href.replace(/^[\s|\/|#]*/, "");
}

function buildState(href) {
  return {
    isHash: isHash(href),
    href: href,
    location: cleanHref(href)
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

var match = {
  all: new MatchAll(),
  none: new MatchNone()
}

export default new Routing();
export { Routing, match };
