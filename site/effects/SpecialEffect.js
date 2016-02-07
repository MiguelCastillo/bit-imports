import { Eventing } from '../js/ere';
import THREE from './three.bootstrap';


class SpecialEffect {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 100;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.CanvasRenderer({ alpha: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor( 0x000000, 0 ); // the default   // canvas background color
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.container = document.getElementById("canvas");
    this.container.appendChild( this.renderer.domElement );

    this.logo = document.getElementById('bit-imports');
    this.logoMini = document.getElementById('bit-imports-mini');
    this.nav = document.getElementById('nav');

    this.init();
    this.animate();
  }


  init() {
    var color = 0xffffff;
    var particle;

    // particles

    // var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial({
      color: color,
      opacity: 0.4,
      program: function(context) {
        context.beginPath();
        // context.arc( 0, 0, 2, 0, PI2, true );
        context.rect(-1.5,-1.5,3,3);
        context.fill();
      }
    });

    var geometry = new THREE.Geometry();

    // number of particles
    for ( var i = 0; i < 150; i ++ ) {
      particle = new THREE.Sprite( material );
      particle.position.x = Math.random() * 2 - 1;
      particle.position.y = Math.random() * 2 - 1;
      particle.position.z = Math.random() * 2 - 1;
      particle.position.normalize();
      particle.position.multiplyScalar( Math.random() * 10 + 600 );
      particle.scale.x = particle.scale.y = 5;

      this.scene.add(particle);

      geometry.vertices.push(particle.position);
    }

    // lines

    var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: color, opacity: 0.2 }));
    this.scene.add( line );

    (new Eventing(document))
      .on('mousemove', onDocumentMouseMove.bind(this))
      .on('touchstart', onDocumentTouchStart.bind(this))
      .on('touchmove', onDocumentTouchMove.bind(this));

    (new Eventing(window))
      .on('resize', onWindowResize.bind(this))
      .on('scroll', docScroll.bind(this));
  }

  animate() {
    requestAnimationFrame( () => {this.animate();} );
    this.render();
  }

  render() {
    this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.01;
    this.camera.position.y += ( - this.mouseY + 500 - this.camera.position.y ) * 0.05;
    this.camera.lookAt( this.scene.position );

    this.renderer.render( this.scene, this.camera );
  }

  static create() {
    return new SpecialEffect();
  }
}


function onWindowResize() {
  this.windowHalfX = window.innerWidth / 2;
  this.windowHalfY = window.innerHeight / 2;

  // camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.aspect = window.innerWidth / 350;
  this.camera.updateProjectionMatrix();

  // renderer.setSize( window.innerWidth, window.innerHeight );
  this.renderer.setSize( window.innerWidth, 350 );
}


function onDocumentMouseMove(event) {
  this.mouseX = (event.clientX - this.windowHalfX) * 0.05;
  this.mouseY = (event.clientY - this.windowHalfY) * 0.1;
}


function onDocumentTouchStart( event ) {
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
    this.logoMini.style.webkitTransform = 'translate3d(0,'+logoTop / ratio + 'px,0)';
    this.logoMini.style.transform = 'translate3d(0,'+logoTop / ratio + 'px,0)';
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


export default SpecialEffect;
