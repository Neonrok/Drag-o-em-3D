import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let ZFBody = 1
let exbox = 1


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

//auciliar 3d
const axesHelper = new THREE.AxesHelper( 1 );
scene.add( axesHelper );
//construção personagem
let drag = {
    x: 0, y: -1, z:0, ry: 0, angle: 0, body: null, pescoço:null, head:null, boca: null, head_x: [],
    material: new THREE.MeshLambertMaterial({ color: 0x4b4b4b, wireframe: false}), 

    init(){
        //corpo
        const body_Geometry = new THREE.BoxGeometry(1.7, 1.5, ZFBody)
        this.body = new THREE.Mesh(body_Geometry, this.material)
        const axesHelper1 = new THREE.AxesHelper( 1 );
        this.body.add( axesHelper1 );
        scene.add(this.body)

        //cabeça
        //bloco principal+++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
        let headX = 1
        let headY = 0.8
        let headZ = 2

        this.head = new THREE.Object3D()
        const head_Geometry = new THREE.Mesh(
            new THREE.BoxGeometry(headX, headY, headZ),
            this.material,
        )
        this.head.add(head_Geometry);
        const axesHelper2 = new THREE.AxesHelper( 1 );
        this.head.add( axesHelper2 );
        const eys_Geometry = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.2, 0.2),
            this.material
        )
        eys_Geometry.position.y = 0.5
        eys_Geometry.position.z = -0.6
        this.head.add(eys_Geometry);
        eys_Geometry.add(axesHelper);
        
        //Parte da boca*********************************
        const axesHelper4 = new THREE.AxesHelper( 1 );
        this.boca= new THREE.Object3D()
        this.boca.add( axesHelper4 );
        this.boca.position.y = -0.4
        this.boca.position.z = -1
        this.head.add(this.boca)
        const boca_3D = new THREE.Mesh(
            new THREE.BoxGeometry(headX, 0.2, headZ),
            this.material,
        )
        boca_3D.position.y = -0.1
        boca_3D.position.z = 1
        this.boca.add(boca_3D)

        //adicionar pescoço+++++++++++++++++++++++++++++++++++++++++++++++++++++
        let zpesc = 0.5
        let ypesc = headY -0.1
        let xpesc = headX -0.1

        this.pescoço = new THREE.Object3D()
        const axesHelperPesc1 = new THREE.AxesHelper( 1 );

        const pesc_angle1 = new THREE.Object3D()
        pesc_angle1.add(axesHelperPesc1)
        this.pescoço.add(pesc_angle1);

        const pesc1 = new THREE.Mesh(
            new THREE.BoxGeometry(xpesc, ypesc, zpesc),
            this.material,
        )
        this.pescoço.add(pesc1);
        pesc_angle1.add(pesc1)
        pesc1.position.z = zpesc/2

        
        const axesHelperPesc2 = new THREE.AxesHelper( 1 );
        const pesc_angle2 = new THREE.Object3D()
        pesc_angle2.add(axesHelperPesc2)
        this.pescoço.add(pesc_angle2);
        pesc1.add(pesc_angle2)
        pesc_angle2.position.z = zpesc/2
        
        const pesc2 = new THREE.Mesh(
            new THREE.BoxGeometry(xpesc, ypesc, zpesc),
            this.material,
        )
        this.pescoço.add(pesc2);
        pesc_angle2.add(pesc2)
        pesc2.position.z = zpesc/2
        
        const axesHelperPesc3 = new THREE.AxesHelper( 1 );
        const pesc_angle3 = new THREE.Object3D()
        pesc_angle3.add(axesHelperPesc3)
        this.pescoço.add(pesc_angle3);
        pesc2.add(pesc_angle3)
        pesc_angle3.position.z = zpesc/2
        
        const pesc3 = new THREE.Mesh(
            new THREE.BoxGeometry(xpesc, ypesc, zpesc),
            this.material,
        )
        this.pescoço.add(pesc3);
        pesc_angle3.add(pesc3)
        pesc3.position.z = zpesc/2

        const axesHelperPesc4 = new THREE.AxesHelper( 1 );
        const pesc_angle4 = new THREE.Object3D()
        pesc_angle4.add(axesHelperPesc4)
        this.pescoço.add(pesc_angle4);
        pesc3.add(pesc_angle4)
        pesc_angle4.position.z = zpesc/2
        
        //chifres cabeças+++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++
        
        
        const armGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.2)
        for (let i = 0; i < 2; i++) {
            const axesHelperXip2 = new THREE.AxesHelper( 1 );
            const xipAng = new THREE.Object3D()
            pesc_angle4.add(xipAng)
            const xip = new THREE.Mesh(armGeometry, this.material)
            xip.add(axesHelperXip2)
            xipAng.add(xip)
            
            this.head_x.push(xip)
            xip.position.x=0.7
            xip.rotation.y = 0.4
            xipAng.rotation.z = i*1.5 +0.8
            
        }

        //body part 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        //adicionar tudo++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        this.body.add(this.pescoço);
        this.pescoço.position.z = ZFBody/2;
        this.pescoço.position.y = 0.3
        pesc_angle4.add(this.head)
        this.head.position.z = headZ/2;
    },
}

drag.init()

window.drag = drag
let light = new THREE.AmbientLight(0xffffff, Math.PI * 0.5);
scene.add(light);

let light2 = new THREE.PointLight(0xffffff, Math.PI * 20);
light2.position.set(2, 4, 2);
scene.add(light2);
// light helper
let pointLightHelper = new THREE.PointLightHelper(light2, 0.4);
pointLightHelper.name = "helper";
scene.add(pointLightHelper);


renderer.setAnimationLoop(render)
//função render
function render() {
    
    if (drag.boca.rotation.x<0){
        exbox = 1
    }else if (drag.boca.rotation.x>0.5){
        exbox = -1
    };
    drag.boca.rotation.x += 0.01 * exbox
    renderer.render(scene, camera);
};

// INPUT CONTROL: set the rotation of the arms
const input = document.querySelector('#armAngle')
input.addEventListener('input', (e) => {
    console.log(e.target.value)
    drag.moveBoca(e.target.value)
    render()
})

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