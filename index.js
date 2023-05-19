import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
camera.position.y = 1;

const speed = 0.008;
const clock = new THREE.Clock();

const loader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const sun_geometry = new THREE.IcosahedronGeometry( 0.5, 2 ); 
const sun_mat = new THREE.MeshBasicMaterial( { map: loader.load('/sun.png') } );
const sun = new THREE.Mesh( sun_geometry, sun_mat );
const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.set( 0, 0, 0 );
sun.add( pointLight );

scene.add(sun);

const satelitte_geometry = new THREE.IcosahedronGeometry( 0.1,1 ); 
const satelitte_mat = new THREE.MeshBasicMaterial( { map: loader.load('/planet.png') } );
const satelitte = new THREE.Mesh( satelitte_geometry, satelitte_mat );

scene.add(satelitte);

const circle = new THREE.CircleGeometry( 2, 48 );
const circle_edges = new THREE.EdgesGeometry( circle );
const circle_mesh = new THREE.LineSegments( circle_edges, new THREE.LineBasicMaterial( { color: 0xcdd6f4 } ) );
circle_mesh.rotation.x = Math.PI/2;
scene.add( circle_mesh );

function animate() {
	requestAnimationFrame( animate );

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