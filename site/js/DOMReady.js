import "./DOMEvents"; // Load this to make sure our event polyfills are installed

var deferred = new Promise(function(resolve) {
  if (document.readyState === "complete") {
    resolve();
  }
  else {
    document.addEventListener("DOMContentLoaded", (/*evt*/) => resolve());
  }
});

function addHandler(fn) {
  deferred.then(fn);
}

export default addHandler;
