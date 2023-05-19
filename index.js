import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Height
const height = 500;

// Setting up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / height, 0.1, 1000 );
camera.position.z = 3.5;
camera.position.y = 1.5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, height );

const container = document.getElementById( 'container' );
container.appendChild( renderer.domElement );

const clock = new THREE.Clock();

// Speed of the rotation
const speed = 0.008;

// Texture loader
const loader = new THREE.TextureLoader();

// Adding the orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.enableZoom = false;
scene.add(controls.object);
controls.update();

// Planet creation function
const planet = (mat, size, x, y, z) => {
    const geometry = new THREE.IcosahedronGeometry( size, 1 );
    const material = new THREE.MeshBasicMaterial( mat );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    return mesh;
}

// Planet movement
const movement = (planet, origin, speed, radius, delta, elapsed) => {
    planet.position.x =  origin.position.x + Math.sin(elapsed*speed) * radius;
    planet.position.z = origin.position.z + Math.cos(elapsed*speed) * radius;
    planet.rotation.x += 1 * delta;
    planet.rotation.y += 1 * delta;
}

// Sun
const sun = planet({ map: loader.load('/sun.png') }, 0.5, 0, 0, 0);
scene.add(sun);

// planet_1
const planet_1 = planet({ map: loader.load('/planet.png') }, 0.1, 0, 0, 0);
scene.add(planet_1);

// planet_2
const planet_2 = planet({ map: loader.load('/planet_2.png') }, 0.2, 0, 0, 0);
scene.add(planet_2);

// Trajectory
const circle = new THREE.LineSegments(  new THREE.EdgesGeometry( new THREE.CircleGeometry( 2, 48 ) ), new THREE.LineBasicMaterial( { color: 0xcdd6f4 } ) );
circle.rotation.x = Math.PI/2;
scene.add( circle );

const circle2 = new THREE.LineSegments(  new THREE.EdgesGeometry( new THREE.CircleGeometry( 1.2, 48 ) ), new THREE.LineBasicMaterial( { color: 0xcdd6f4 } ) );
circle2.rotation.x = Math.PI/2;
scene.add( circle2 );

function animate() {
	requestAnimationFrame( animate );

    controls.update();

    var delta = clock.getDelta();
    var elapsed = clock.getElapsedTime();

    sun.rotation.x += speed;
    sun.rotation.y += speed;
    
    movement(planet_1, sun, 1, 2, delta, elapsed);
    movement(planet_2, sun, 0.5, 1.2, delta, elapsed);

	renderer.render( scene, camera );
}

animate();