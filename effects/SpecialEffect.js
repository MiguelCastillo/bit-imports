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
//# sourceMappingURL=data:application/json;base64,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cG9ydCB7IEV2ZW50aW5nIH0gZnJvbSAnLi4vanMvZXJlJztcbmltcG9ydCBUSFJFRSBmcm9tICcuL3RocmVlLmJvb3RzdHJhcCc7XG5cblxuY2xhc3MgU3BlY2lhbEVmZmVjdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubW91c2VYID0gMDtcbiAgICB0aGlzLm1vdXNlWSA9IDA7XG5cbiAgICB0aGlzLndpbmRvd0hhbGZYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xuICAgIHRoaXMud2luZG93SGFsZlkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xuXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMSwgMTAwMDAgKTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gMTAwO1xuXG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5DYW52YXNSZW5kZXJlcih7IGFscGhhOiB0cnVlIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggd2luZG93LmRldmljZVBpeGVsUmF0aW8gKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoIDB4MDAwMDAwLCAwICk7IC8vIHRoZSBkZWZhdWx0ICAgLy8gY2FudmFzIGJhY2tncm91bmQgY29sb3JcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUoIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcblxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCApO1xuXG4gICAgdGhpcy5sb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JpdC1pbXBvcnRzJyk7XG4gICAgdGhpcy5sb2dvTWluaSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiaXQtaW1wb3J0cy1taW5pJyk7XG4gICAgdGhpcy5uYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2Jyk7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmFuaW1hdGUoKTtcbiAgfVxuXG5cbiAgaW5pdCgpIHtcbiAgICB2YXIgY29sb3IgPSAweGZmZmZmZjtcbiAgICB2YXIgcGFydGljbGU7XG5cbiAgICAvLyBwYXJ0aWNsZXNcblxuICAgIC8vIHZhciBQSTIgPSBNYXRoLlBJICogMjtcbiAgICB2YXIgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuU3ByaXRlQ2FudmFzTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgb3BhY2l0eTogMC40LFxuICAgICAgcHJvZ3JhbTogZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAvLyBjb250ZXh0LmFyYyggMCwgMCwgMiwgMCwgUEkyLCB0cnVlICk7XG4gICAgICAgIGNvbnRleHQucmVjdCgtMS41LC0xLjUsMywzKTtcbiAgICAgICAgY29udGV4dC5maWxsKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcblxuICAgIC8vIG51bWJlciBvZiBwYXJ0aWNsZXNcbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCAxNTA7IGkgKysgKSB7XG4gICAgICBwYXJ0aWNsZSA9IG5ldyBUSFJFRS5TcHJpdGUoIG1hdGVyaWFsICk7XG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi54ID0gTWF0aC5yYW5kb20oKSAqIDIgLSAxO1xuICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLnogPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi5ub3JtYWxpemUoKTtcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLm11bHRpcGx5U2NhbGFyKCBNYXRoLnJhbmRvbSgpICogMTAgKyA2MDAgKTtcbiAgICAgIHBhcnRpY2xlLnNjYWxlLnggPSBwYXJ0aWNsZS5zY2FsZS55ID0gNTtcblxuICAgICAgdGhpcy5zY2VuZS5hZGQocGFydGljbGUpO1xuXG4gICAgICBnZW9tZXRyeS52ZXJ0aWNlcy5wdXNoKHBhcnRpY2xlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBsaW5lc1xuXG4gICAgdmFyIGxpbmUgPSBuZXcgVEhSRUUuTGluZShnZW9tZXRyeSwgbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHsgY29sb3I6IGNvbG9yLCBvcGFjaXR5OiAwLjIgfSkpO1xuICAgIHRoaXMuc2NlbmUuYWRkKCBsaW5lICk7XG5cbiAgICAobmV3IEV2ZW50aW5nKGRvY3VtZW50KSlcbiAgICAgIC5vbignbW91c2Vtb3ZlJywgb25Eb2N1bWVudE1vdXNlTW92ZS5iaW5kKHRoaXMpKVxuICAgICAgLm9uKCd0b3VjaHN0YXJ0Jywgb25Eb2N1bWVudFRvdWNoU3RhcnQuYmluZCh0aGlzKSlcbiAgICAgIC5vbigndG91Y2htb3ZlJywgb25Eb2N1bWVudFRvdWNoTW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIChuZXcgRXZlbnRpbmcod2luZG93KSlcbiAgICAgIC5vbigncmVzaXplJywgb25XaW5kb3dSZXNpemUuYmluZCh0aGlzKSlcbiAgICAgIC5vbignc2Nyb2xsJywgZG9jU2Nyb2xsLmJpbmQodGhpcykpO1xuICB9XG5cbiAgYW5pbWF0ZSgpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoICgpID0+IHt0aGlzLmFuaW1hdGUoKTt9ICk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ICs9ICggdGhpcy5tb3VzZVggLSB0aGlzLmNhbWVyYS5wb3NpdGlvbi54ICkgKiAwLjAxO1xuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgKz0gKCAtIHRoaXMubW91c2VZICsgNTAwIC0gdGhpcy5jYW1lcmEucG9zaXRpb24ueSApICogMC4wNTtcbiAgICB0aGlzLmNhbWVyYS5sb29rQXQoIHRoaXMuc2NlbmUucG9zaXRpb24gKTtcblxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKCB0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSApO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFNwZWNpYWxFZmZlY3QoKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xuICB0aGlzLndpbmRvd0hhbGZYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xuICB0aGlzLndpbmRvd0hhbGZZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcblxuICAvLyBjYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIHRoaXMuY2FtZXJhLmFzcGVjdCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMzUwO1xuICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cbiAgLy8gcmVuZGVyZXIuc2V0U2l6ZSggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuICB0aGlzLnJlbmRlcmVyLnNldFNpemUoIHdpbmRvdy5pbm5lcldpZHRoLCAzNTAgKTtcbn1cblxuXG5mdW5jdGlvbiBvbkRvY3VtZW50TW91c2VNb3ZlKGV2ZW50KSB7XG4gIHRoaXMubW91c2VYID0gKGV2ZW50LmNsaWVudFggLSB0aGlzLndpbmRvd0hhbGZYKSAqIDAuMDU7XG4gIHRoaXMubW91c2VZID0gKGV2ZW50LmNsaWVudFkgLSB0aGlzLndpbmRvd0hhbGZZKSAqIDAuMTtcbn1cblxuXG5mdW5jdGlvbiBvbkRvY3VtZW50VG91Y2hTdGFydCggZXZlbnQgKSB7XG4gIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMubW91c2VYID0gKGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLndpbmRvd0hhbGZYKSAqIDAuNztcbiAgICB0aGlzLm1vdXNlWSA9IChldmVudC50b3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy53aW5kb3dIYWxmWSkgKiAwLjc7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBvbkRvY3VtZW50VG91Y2hNb3ZlKGV2ZW50KSB7XG4gIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLm1vdXNlWCA9IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLndpbmRvd0hhbGZYO1xuICAgIHRoaXMubW91c2VZID0gZXZlbnQudG91Y2hlc1swXS5wYWdlWSAtIHRoaXMud2luZG93SGFsZlk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBkb2NTY3JvbGwoKSB7XG4gIHZhciBsb2dvVG9wID0gdGhpcy5sb2dvLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgdmFyIGxvZ29IZWlnaHQgPSB0aGlzLmxvZ28uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICB2YXIgbG9nb01pbmlIZWlnaHQgPSB0aGlzLmxvZ29NaW5pLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgdmFyIG5hdkhlaWdodCA9IHRoaXMubmF2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblxuICBpZiAobG9nb1RvcCA8IG5hdkhlaWdodCkge1xuICAgIHZhciByYXRpbyA9IGxvZ29NaW5pSGVpZ2h0IC8gbG9nb0hlaWdodDtcbiAgICB0aGlzLmxvZ29NaW5pLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLCcrbG9nb1RvcCAvIHJhdGlvICsgJ3B4LDApJztcbiAgICB0aGlzLmxvZ29NaW5pLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLCcrbG9nb1RvcCAvIHJhdGlvICsgJ3B4LDApJztcbiAgfVxuXG4gIGlmIChsb2dvVG9wID4gbmF2SGVpZ2h0KSB7XG4gICAgdGhpcy5sb2dvTWluaS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoMCwxMDAlLDApJztcbiAgICB0aGlzLmxvZ29NaW5pLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLDEwMCUsMCknO1xuICB9XG5cbiAgaWYgKGxvZ29Ub3AgPCAwKSB7XG4gICAgdGhpcy5sb2dvTWluaS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoMCwwLDApJztcbiAgICB0aGlzLmxvZ29NaW5pLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgwLDAsMCknO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU3BlY2lhbEVmZmVjdDtcbiJdfQ==