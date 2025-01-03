import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// create an empty scene, that will hold all our elements such as objects, cameras and lights
const scene = new THREE.Scene();

// create a camera, which defines where we're looking at
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(scene.position); 

// create a render and set the size
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#000000");
document.body.appendChild(renderer.domElement);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);

//construção personagem
let drag = {
    x: 0, y: -1, z:0, ry: 0, angle: 0, body: null, head: null, arms: [],
    material: new THREE.MeshLambertMaterial({ color: 0xffffff }), 

    init(){
        //corpo
        const bodyGeometry = new THREE.BoxGeometry(1, 1, 1)
        this.body = new THREE.Mesh(bodyGeometry, this.material)
        scene.add(this.body)

        //cabeça
        const headGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2)
        this.head = new THREE.Mesh(headGeometry, this.material)
        this.body.add(this.head)
        this.head.position.y = 1.1;
    },
}

drag.init()
drag.body.rotation.y = THREE.MathUtils.degToRad(-15)

//função render
function render() {
    renderer.render(scene, camera);
};

// Update renderer (and camera) on window resize
window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Adjust the pixel ratio of the renderer based on the device's pixel density
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    render()
})