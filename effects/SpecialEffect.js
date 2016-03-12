'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ere = require('../js/ere');

var _three = require('./three.bootstrap');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpecialEffect = function () {
  function SpecialEffect() {
    _classCallCheck(this, SpecialEffect);

    this.mouseX = 0;
    this.mouseY = 0;

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera = new _three2.default.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 100;

    this.scene = new _three2.default.Scene();

    this.renderer = new _three2.default.CanvasRenderer({ alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0); // the default   // canvas background color
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.container = document.getElementById("canvas");
    this.container.appendChild(this.renderer.domElement);

    this.logo = document.getElementById('bit-imports');
    this.logoMini = document.getElementById('bit-imports-mini');
    this.nav = document.getElementById('nav');

    this.init();
    this.animate();
  }

  _createClass(SpecialEffect, [{
    key: 'init',
    value: function init() {
      var color = 0xffffff;
      var particle;

      // particles

      // var PI2 = Math.PI * 2;
      var material = new _three2.default.SpriteCanvasMaterial({
        color: color,
        opacity: 0.4,
        program: function program(context) {
          context.beginPath();
          // context.arc( 0, 0, 2, 0, PI2, true );
          context.rect(-1.5, -1.5, 3, 3);
          context.fill();
        }
      });

      var geometry = new _three2.default.Geometry();

      // number of particles
      for (var i = 0; i < 150; i++) {
        particle = new _three2.default.Sprite(material);
        particle.position.x = Math.random() * 2 - 1;
        particle.position.y = Math.random() * 2 - 1;
        particle.position.z = Math.random() * 2 - 1;
        particle.position.normalize();
        particle.position.multiplyScalar(Math.random() * 10 + 600);
        particle.scale.x = particle.scale.y = 5;

        this.scene.add(particle);

        geometry.vertices.push(particle.position);
      }

      // lines

      var line = new _three2.default.Line(geometry, new _three2.default.LineBasicMaterial({ color: color, opacity: 0.2 }));
      this.scene.add(line);

      new _ere.Eventing(document).on('mousemove', onDocumentMouseMove.bind(this)).on('touchstart', onDocumentTouchStart.bind(this)).on('touchmove', onDocumentTouchMove.bind(this));

      new _ere.Eventing(window).on('resize', onWindowResize.bind(this)).on('scroll', docScroll.bind(this));
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this = this;

      requestAnimationFrame(function () {
        _this.animate();
      });
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.01;
      this.camera.position.y += (-this.mouseY + 500 - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.scene.position);

      this.renderer.render(this.scene, this.camera);
    }
  }], [{
    key: 'create',
    value: function create() {
      return new SpecialEffect();
    }
  }]);

  return SpecialEffect;
}();

function onWindowResize() {
  this.windowHalfX = window.innerWidth / 2;
  this.windowHalfY = window.innerHeight / 2;

  // camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.aspect = window.innerWidth / 350;
  this.camera.updateProjectionMatrix();

  // renderer.setSize( window.innerWidth, window.innerHeight );
  this.renderer.setSize(window.innerWidth, 350);
}

function onDocumentMouseMove(event) {
  this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
  this.mouseY = (event.clientY - this.windowHalfY) * 0.1;
}

function onDocumentTouchStart(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
    this.mouseX = (event.touches[0].pageX - this.windowHalfX) * 0.7;
    this.mouseY = (event.touches[0].pageY - this.windowHalfY) * 0.7;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    this.mouseX = event.touches[0].pageX - this.windowHalfX;
    this.mouseY = event.touches[0].pageY - this.windowHalfY;
  }
}

function docScroll() {
  var logoTop = this.logo.getBoundingClientRect().top;
  var logoHeight = this.logo.getBoundingClientRect().height;
  var logoMiniHeight = this.logoMini.getBoundingClientRect().height;
  var navHeight = this.nav.getBoundingClientRect().height;

  if (logoTop < navHeight) {
    var ratio = logoMiniHeight / logoHeight;
    this.logoMini.style.webkitTransform = 'translate3d(0,' + logoTop / ratio + 'px,0)';
    this.logoMini.style.transform = 'translate3d(0,' + logoTop / ratio + 'px,0)';
  }

  if (logoTop > navHeight) {
    this.logoMini.style.webkitTransform = 'translate3d(0,100%,0)';
    this.logoMini.style.transform = 'translate3d(0,100%,0)';
  }

  if (logoTop < 0) {
    this.logoMini.style.webkitTransform = 'translate3d(0,0,0)';
    this.logoMini.style.transform = 'translate3d(0,0,0)';
  }
}

exports.default = SpecialEffect;
//# sourceMappingURL=data:application/json;base64,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QUFVLEtBQVYsR0FBa0IsT0FBbkMsQ0FGZjtBQUd2QixTQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFNBQXBCLEdBQWdDLG1CQUFpQixVQUFVLEtBQVYsR0FBa0IsT0FBbkMsQ0FIVDtHQUF6Qjs7QUFNQSxNQUFJLFVBQVUsU0FBVixFQUFxQjtBQUN2QixTQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLGVBQXBCLEdBQXNDLHVCQUF0QyxDQUR1QjtBQUV2QixTQUFLLFFBQUwsQ0FBYyxLQUFkLENBQW9CLFNBQXBCLEdBQWdDLHVCQUFoQyxDQUZ1QjtHQUF6Qjs7QUFLQSxNQUFJLFVBQVUsQ0FBVixFQUFhO0FBQ2YsU0FBSyxRQUFMLENBQWMsS0FBZCxDQUFvQixlQUFwQixHQUFzQyxvQkFBdEMsQ0FEZTtBQUVmLFNBQUssUUFBTCxDQUFjLEtBQWQsQ0FBb0IsU0FBcEIsR0FBZ0Msb0JBQWhDLENBRmU7R0FBakI7Q0FqQkY7O2tCQXdCZSIsImZpbGUiOiJTcGVjaWFsRWZmZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRpbmcgfSBmcm9tICcuLi9qcy9lcmUnO1xuaW1wb3J0IFRIUkVFIGZyb20gJy4vdGhyZWUuYm9vdHN0cmFwJztcblxuXG5jbGFzcyBTcGVjaWFsRWZmZWN0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tb3VzZVggPSAwO1xuICAgIHRoaXMubW91c2VZID0gMDtcblxuICAgIHRoaXMud2luZG93SGFsZlggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG4gICAgdGhpcy53aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG5cbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSggNzUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAxLCAxMDAwMCApO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAxMDA7XG5cbiAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLkNhbnZhc1JlbmRlcmVyKHsgYWxwaGE6IHRydWUgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHgwMDAwMDAsIDAgKTsgLy8gdGhlIGRlZmF1bHQgICAvLyBjYW52YXMgYmFja2dyb3VuZCBjb2xvclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCggdGhpcy5yZW5kZXJlci5kb21FbGVtZW50ICk7XG5cbiAgICB0aGlzLmxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYml0LWltcG9ydHMnKTtcbiAgICB0aGlzLmxvZ29NaW5pID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JpdC1pbXBvcnRzLW1pbmknKTtcbiAgICB0aGlzLm5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXYnKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuYW5pbWF0ZSgpO1xuICB9XG5cblxuICBpbml0KCkge1xuICAgIHZhciBjb2xvciA9IDB4ZmZmZmZmO1xuICAgIHZhciBwYXJ0aWNsZTtcblxuICAgIC8vIHBhcnRpY2xlc1xuXG4gICAgLy8gdmFyIFBJMiA9IE1hdGguUEkgKiAyO1xuICAgIHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TcHJpdGVDYW52YXNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICBvcGFjaXR5OiAwLjQsXG4gICAgICBwcm9ncmFtOiBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIC8vIGNvbnRleHQuYXJjKCAwLCAwLCAyLCAwLCBQSTIsIHRydWUgKTtcbiAgICAgICAgY29udGV4dC5yZWN0KC0xLjUsLTEuNSwzLDMpO1xuICAgICAgICBjb250ZXh0LmZpbGwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xuXG4gICAgLy8gbnVtYmVyIG9mIHBhcnRpY2xlc1xuICAgIGZvciAoIHZhciBpID0gMDsgaSA8IDE1MDsgaSArKyApIHtcbiAgICAgIHBhcnRpY2xlID0gbmV3IFRIUkVFLlNwcml0ZSggbWF0ZXJpYWwgKTtcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnggPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gTWF0aC5yYW5kb20oKSAqIDIgLSAxO1xuICAgICAgcGFydGljbGUucG9zaXRpb24ueiA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLm5vcm1hbGl6ZSgpO1xuICAgICAgcGFydGljbGUucG9zaXRpb24ubXVsdGlwbHlTY2FsYXIoIE1hdGgucmFuZG9tKCkgKiAxMCArIDYwMCApO1xuICAgICAgcGFydGljbGUuc2NhbGUueCA9IHBhcnRpY2xlLnNjYWxlLnkgPSA1O1xuXG4gICAgICB0aGlzLnNjZW5lLmFkZChwYXJ0aWNsZSk7XG5cbiAgICAgIGdlb21ldHJ5LnZlcnRpY2VzLnB1c2gocGFydGljbGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIC8vIGxpbmVzXG5cbiAgICB2YXIgbGluZSA9IG5ldyBUSFJFRS5MaW5lKGdlb21ldHJ5LCBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogY29sb3IsIG9wYWNpdHk6IDAuMiB9KSk7XG4gICAgdGhpcy5zY2VuZS5hZGQoIGxpbmUgKTtcblxuICAgIChuZXcgRXZlbnRpbmcoZG9jdW1lbnQpKVxuICAgICAgLm9uKCdtb3VzZW1vdmUnLCBvbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcykpXG4gICAgICAub24oJ3RvdWNoc3RhcnQnLCBvbkRvY3VtZW50VG91Y2hTdGFydC5iaW5kKHRoaXMpKVxuICAgICAgLm9uKCd0b3VjaG1vdmUnLCBvbkRvY3VtZW50VG91Y2hNb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgKG5ldyBFdmVudGluZyh3aW5kb3cpKVxuICAgICAgLm9uKCdyZXNpemUnLCBvbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpKVxuICAgICAgLm9uKCdzY3JvbGwnLCBkb2NTY3JvbGwuYmluZCh0aGlzKSk7XG4gIH1cblxuICBhbmltYXRlKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge3RoaXMuYW5pbWF0ZSgpO30gKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggKz0gKCB0aGlzLm1vdXNlWCAtIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggKSAqIDAuMDE7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSArPSAoIC0gdGhpcy5tb3VzZVkgKyA1MDAgLSB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ICkgKiAwLjA1O1xuICAgIHRoaXMuY2FtZXJhLmxvb2tBdCggdGhpcy5zY2VuZS5wb3NpdGlvbiApO1xuXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiBuZXcgU3BlY2lhbEVmZmVjdCgpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gb25XaW5kb3dSZXNpemUoKSB7XG4gIHRoaXMud2luZG93SGFsZlggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XG4gIHRoaXMud2luZG93SGFsZlkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xuXG4gIC8vIGNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyAzNTA7XG4gIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuICAvLyByZW5kZXJlci5zZXRTaXplKCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG4gIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggd2luZG93LmlubmVyV2lkdGgsIDM1MCApO1xufVxuXG5cbmZ1bmN0aW9uIG9uRG9jdW1lbnRNb3VzZU1vdmUoZXZlbnQpIHtcbiAgdGhpcy5tb3VzZVggPSAoZXZlbnQuY2xpZW50WCAtIHRoaXMud2luZG93SGFsZlgpICogMC4wNTtcbiAgdGhpcy5tb3VzZVkgPSAoZXZlbnQuY2xpZW50WSAtIHRoaXMud2luZG93SGFsZlkpICogMC4xO1xufVxuXG5cbmZ1bmN0aW9uIG9uRG9jdW1lbnRUb3VjaFN0YXJ0KCBldmVudCApIHtcbiAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5tb3VzZVggPSAoZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMud2luZG93SGFsZlgpICogMC43O1xuICAgIHRoaXMubW91c2VZID0gKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLndpbmRvd0hhbGZZKSAqIDAuNztcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIG9uRG9jdW1lbnRUb3VjaE1vdmUoZXZlbnQpIHtcbiAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09IDEpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMubW91c2VYID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMud2luZG93SGFsZlg7XG4gICAgdGhpcy5tb3VzZVkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy53aW5kb3dIYWxmWTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGRvY1Njcm9sbCgpIHtcbiAgdmFyIGxvZ29Ub3AgPSB0aGlzLmxvZ28uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICB2YXIgbG9nb0hlaWdodCA9IHRoaXMubG9nby5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIHZhciBsb2dvTWluaUhlaWdodCA9IHRoaXMubG9nb01pbmkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICB2YXIgbmF2SGVpZ2h0ID0gdGhpcy5uYXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXG4gIGlmIChsb2dvVG9wIDwgbmF2SGVpZ2h0KSB7XG4gICAgdmFyIHJhdGlvID0gbG9nb01pbmlIZWlnaHQgLyBsb2dvSGVpZ2h0O1xuICAgIHRoaXMubG9nb01pbmkuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDAsJytsb2dvVG9wIC8gcmF0aW8gKyAncHgsMCknO1xuICAgIHRoaXMubG9nb01pbmkuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDAsJytsb2dvVG9wIC8gcmF0aW8gKyAncHgsMCknO1xuICB9XG5cbiAgaWYgKGxvZ29Ub3AgPiBuYXZIZWlnaHQpIHtcbiAgICB0aGlzLmxvZ29NaW5pLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLDEwMCUsMCknO1xuICAgIHRoaXMubG9nb01pbmkuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDAsMTAwJSwwKSc7XG4gIH1cblxuICBpZiAobG9nb1RvcCA8IDApIHtcbiAgICB0aGlzLmxvZ29NaW5pLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLDAsMCknO1xuICAgIHRoaXMubG9nb01pbmkuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKDAsMCwwKSc7XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBTcGVjaWFsRWZmZWN0O1xuIl19