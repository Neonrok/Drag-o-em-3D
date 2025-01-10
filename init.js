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
renderer.setClearColor(0x8a8a8a);
document.body.appendChild(renderer.domElement);

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);

//construção personagem
let drag = {
    x: 0, y: -1, z:0, ry: 0, angle: 0, body: null, head: null, arms: [],
    material: new THREE.MeshLambertMaterial({ color: 0x4b4b4b, wireframe: false}), 

    init(){
        //corpo
        const body_Geometry = new THREE.BoxGeometry(1, 1, 1)
        this.body = new THREE.Mesh(body_Geometry, this.material)
        scene.add(this.body)

        //cabeça
        const head_Geometry = new THREE.BoxGeometry(1.2, 0.8, 2)
        this.head = new THREE.Mesh(head_Geometry, this.material)
        this.body.add(this.head)
        this.head.position.z = 3;
    },
}

drag.init()
drag.body.rotation.y = THREE.MathUtils.degToRad(-15)



let light = new THREE.AmbientLight(0xffffff, Math.PI * 0.5);
scene.add(light);

let light2 = new THREE.PointLight(0xffffff, Math.PI * 20);
light2.position.set(2, 4, 2);
scene.add(light2);
// light helper
let pointLightHelper = new THREE.PointLightHelper(light2, 0.4);
pointLightHelper.name = "helper";
scene.add(pointLightHelper);

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