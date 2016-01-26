// NOTE:
// using require statements because babel will group all import statements
// at the top of the transformed file. Which means that `window.THREE = THREE`
// is pushed to the bottom after the importing CanvasRenderer and Projector,
// which depend on THREE being in the window object.

var THREE = require('threejs');

// Unfortunately, the dependencies below expect THREE to be in the global object. :-/
window.THREE = THREE;
require('CanvasRenderer');
require('Projector');
module.exports = THREE;
