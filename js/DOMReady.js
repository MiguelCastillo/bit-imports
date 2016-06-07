"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./Eventing");

// Load this to make sure our event polyfills are installed

var deferred = new Promise(function (resolve) {
  if (document.readyState === "complete") {
    resolve();
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      return (/*evt*/resolve()
      );
    });
  }
});

exports.default = function (fn) {
  return deferred.then(fn);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRPTVJlYWR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBRUEsSUFBSSxXQUFXLElBQUksT0FBSixDQUFZLFVBQVMsT0FBVCxFQUFrQjtBQUMzQyxNQUFJLFNBQVMsVUFBVCxLQUF3QixVQUE1QixFQUF3QztBQUN0QztBQUNELEdBRkQsTUFHSztBQUNILGFBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDO0FBQUEsYSxRQUFhO0FBQWI7QUFBQSxLQUE5QztBQUNEO0FBQ0YsQ0FQYyxDQUFmOztrQkFTZSxVQUFDLEVBQUQ7QUFBQSxTQUFRLFNBQVMsSUFBVCxDQUFjLEVBQWQsQ0FBUjtBQUFBLEMiLCJmaWxlIjoiRE9NUmVhZHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL0V2ZW50aW5nXCI7IC8vIExvYWQgdGhpcyB0byBtYWtlIHN1cmUgb3VyIGV2ZW50IHBvbHlmaWxscyBhcmUgaW5zdGFsbGVkXG5cbnZhciBkZWZlcnJlZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgIHJlc29sdmUoKTtcbiAgfVxuICBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoLypldnQqLykgPT4gcmVzb2x2ZSgpKTtcbiAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IChmbikgPT4gZGVmZXJyZWQudGhlbihmbik7XG4iXX0=