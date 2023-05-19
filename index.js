import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Height
const height = 300;

// Setting up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / height, 0.1, 1000 );
camera.position.z = 3;
camera.position.y = 1;

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
scene.add(controls.object);
controls.update();

// Planet function
const planet = (mat, size, x, y, z) => {
    const geometry = new THREE.IcosahedronGeometry( size, 1 );
    const material = new THREE.MeshBasicMaterial( mat );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    return mesh;
}

// Sun
const sun = planet({ map: loader.load('/sun.png') }, 0.5, 0, 0, 0);
scene.add(sun);

// Earth
const satelitte = planet({ map: loader.load('/planet.png') }, 0.1, 0, 0, 0);
scene.add(satelitte);

// Trajectory
const circle = new THREE.LineSegments(  new THREE.EdgesGeometry( new THREE.CircleGeometry( 2, 48 ) ), new THREE.LineBasicMaterial( { color: 0xcdd6f4 } ) );
circle.rotation.x = Math.PI/2;
scene.add( circle );

function animate() {
	requestAnimationFrame( animate );

    controls.update();

    var delta = clock.getDelta();
    var elapsed = clock.getElapsedTime();

    sun.rotation.x += speed;
    sun.rotation.y += speed;
    
    satelitte.position.x =  sun.position.x + Math.sin(elapsed*1) * 2;
    satelitte.position.z = sun.position.z + Math.cos(elapsed*1) * 2;
    satelitte.rotation.x += 1 * delta;
    satelitte.rotation.y += 1 * delta;

	renderer.render( scene, camera );
}

animate();