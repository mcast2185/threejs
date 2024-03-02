import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


// Texture
const loader = new THREE.TextureLoader();
const cross = loader.load('./cross.svg');

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
// let geometry;
let geometry = window.screenX < window.screenX / 2 ? new THREE.SphereGeometry(.35, 2, 2) : window.screenX > window.screenX / 2 ? new THREE.SphereGeometry(.75, 32, 22) : new THREE.SphereGeometry(.65, 22, 22);
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

document.querySelector('.dg').remove()

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 8500;

const posArray = new Float32Array(particlesCnt * 3);

for(let i = 0; i < particlesCnt * 3; i++ ) {
    let y = (Math.random() - 0.5) * 18.1;
    let x = (Math.random() - 0.5) * 18.3;
    let z = (Math.random() - 0.5) * 18.1;
    posArray[i]= x, y, z;
};


particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Materials
const material = new THREE.PointsMaterial({
    size: .0020,
    transparent: true,
    blending: THREE.AdditiveBlending,
    
})

const particleMaterial = new THREE.PointsMaterial({
    size: .016,
    map: cross,
    transparent: true,
    blending: THREE.AdditiveBlending,
    
    // depthFunc: 1
});


// Mesh
const sphere = new THREE.Points(geometry,material)
sphere.translateX(1.85)
const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
scene.add( sphere, particlesMesh)
// scene.add( particlesMesh);


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 6;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;

camera.position.set(0,0,3);
camera.lookAt(scene.position);


scene.add(camera);





function animationLoop(t) {
    for (var i = 0; i < n; i++) {
        var time = t / 500 + i / 80,
            sin = THREE.MathUtils.clamp(1.1 * Math.sin(time), -1, 1);
        stars[i].position.z = -200 + 150 * sin;
    }

    renderer.render(scene, camera);
};

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setAnimationLoop(animationLoop);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color('#161b1c'), 1);


/**
 * Animate
 */

const clock = new THREE.Clock();


const tick = () =>
{

    const elapsedTime = clock.getElapsedTime();

    // Update objects
//  bg-rotate
    particlesMesh.rotation.z = .005 * elapsedTime;
    camera.scale.setZ((-elapsedTime * .005) + 1)

    // particlesMesh.
    sphere.rotation.y = .085 * elapsedTime

    // Update Orbital Controls
    // controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();