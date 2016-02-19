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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRPTVJlYWR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFTLE9BQU8sRUFBRTtBQUMzQyxNQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO0FBQ3RDLFdBQU8sRUFBRSxDQUFDO0dBQ1gsTUFDSTtBQUNILFlBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtxQkFBYSxPQUFPLEVBQUU7O0tBQUEsQ0FBQyxDQUFDO0dBQ3ZFO0NBQ0YsQ0FBQyxDQUFDOztrQkFFWSxVQUFDLEVBQUU7U0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztDQUFBIiwiZmlsZSI6IkRPTVJlYWR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9FdmVudGluZ1wiOyAvLyBMb2FkIHRoaXMgdG8gbWFrZSBzdXJlIG91ciBldmVudCBwb2x5ZmlsbHMgYXJlIGluc3RhbGxlZFxuXG52YXIgZGVmZXJyZWQgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICByZXNvbHZlKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKC8qZXZ0Ki8pID0+IHJlc29sdmUoKSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCAoZm4pID0+IGRlZmVycmVkLnRoZW4oZm4pO1xuIl19