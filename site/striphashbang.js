(function() {
  var rewrite = window.location.href.replace(/#!?/, "");
  if (typeof(window.history.replaceState) == 'function') {
    window.history.replaceState(null, "Initial entry", rewrite);
  }
  else if (typeof(window.history.pushState) == 'function') {
    window.history.pushState(null, "Initial entry", rewrite);
  }
  else {
    window.location.hash = rewrite;
  }
})();
