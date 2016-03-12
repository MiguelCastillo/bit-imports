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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRPTVJlYWR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFdBQVcsSUFBSSxPQUFKLENBQVksVUFBUyxPQUFULEVBQWtCO0FBQzNDLE1BQUksU0FBUyxVQUFULEtBQXdCLFVBQXhCLEVBQW9DO0FBQ3RDLGNBRHNDO0dBQXhDLE1BR0s7QUFDSCxhQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QztxQkFBYTs7S0FBYixDQUE5QyxDQURHO0dBSEw7Q0FEeUIsQ0FBdkI7O2tCQVNXLFVBQUMsRUFBRDtTQUFRLFNBQVMsSUFBVCxDQUFjLEVBQWQ7Q0FBUiIsImZpbGUiOiJET01SZWFkeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vRXZlbnRpbmdcIjsgLy8gTG9hZCB0aGlzIHRvIG1ha2Ugc3VyZSBvdXIgZXZlbnQgcG9seWZpbGxzIGFyZSBpbnN0YWxsZWRcblxudmFyIGRlZmVycmVkID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgcmVzb2x2ZSgpO1xuICB9XG4gIGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgvKmV2dCovKSA9PiByZXNvbHZlKCkpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgKGZuKSA9PiBkZWZlcnJlZC50aGVuKGZuKTtcbiJdfQ==