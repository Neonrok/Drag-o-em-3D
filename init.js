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
const axesHelper = new THREE.AxesHelper( 3 );
scene.add( axesHelper );

//construção personagem
//vTemp
let drag = {
    x: 0, y: -1, z:0, ry: 0, angle: 0, body: null, pescoço:null, head:null,
    boca: null, head_x: [], bodyP2: null, menbers: [], asas: new THREE.Object3D(),
    sub_asas1: new THREE.Object3D(), sub_asas2: new THREE.Object3D(),
    caud_ang: new THREE.Object3D(),
    material: new THREE.MeshLambertMaterial({ color: 0x4b4b4b, wireframe: false, side:THREE.DoubleSide}), 
    materialb: new THREE.MeshLambertMaterial({ color: 0xaa00aa, wireframe: false, side:THREE.DoubleSide}),

    init(){
        //corpo
        const body_Geometry = new THREE.BoxGeometry(1.7, 1.5, ZFBody)
        this.body = new THREE.Mesh(body_Geometry, this.material)
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
        const eys_Geometry = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.2, 0.2),
            this.material
        )
        eys_Geometry.position.y = 0.5
        eys_Geometry.position.z = -0.6
        this.head.add(eys_Geometry);
        
        //Parte da boca*********************************
        this.boca= new THREE.Object3D();
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
        this.boca.rotation.x = 0.3

        //adicionar pescoço+++++++++++++++++++++++++++++++++++++++++++++++++++++
        let zpesc = 0.5
        let ypesc = headY 
        let xpesc = headX -0.1

        this.pescoço = new THREE.Object3D()
        const pesc_angle1 = new THREE.Object3D()
        this.pescoço.add(pesc_angle1);
        this.pescoço.rotation.x=0.1

        const pesc1 = new THREE.Mesh(
            new THREE.BoxGeometry(xpesc, ypesc, zpesc),
            this.material,
        )
        pesc_angle1.add(pesc1)
        pesc1.position.z = zpesc/2

        
        const pesc_angle2 = new THREE.Object3D()
        pesc1.add(pesc_angle2)
        pesc_angle2.position.z = zpesc/2;
        pesc_angle2.rotation.x=0.1
        
        const pesc2 = new THREE.Mesh(
            new THREE.BoxGeometry(xpesc, ypesc, zpesc),
            this.material,
        );
        pesc_angle2.add(pesc2);
        pesc2.position.z = zpesc/2;
        
        const pesc_angle3 = new THREE.Object3D()
        pesc2.add(pesc_angle3)
        pesc_angle3.position.z = zpesc/2
        pesc_angle3.rotation.x=0.1
        
        const pesc3 = new THREE.Mesh(
            new THREE.BoxGeometry(xpesc, ypesc, zpesc),
            this.material,
        );
        pesc_angle3.add(pesc3);
        pesc3.position.z = zpesc/2

        const pesc_angle4 = new THREE.Object3D()
        pesc3.add(pesc_angle4)
        pesc_angle4.position.z = zpesc/2
        pesc_angle4.rotation.x=0.1
        
        //chifres cabeças+++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++
        const armGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.2)
        for (let i = 0; i < 2; i++) {
            const xipAng = new THREE.Object3D()
            pesc_angle4.add(xipAng)
            const xip = new THREE.Mesh(armGeometry, this.material)
            xipAng.add(xip)
            
            this.head_x.push(xip)
            xip.position.x=0.7
            xip.rotation.y = 0.4
            xipAng.rotation.z = i*1.5 +0.8
            
        }

        //body part 2 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let zbody2 = 5
        let ybody2 = 2
        let xbody2 = 2.5
        const bodydivi = new THREE.Object3D();
        this.body.add(bodydivi);
        bodydivi.position.z = -ZFBody/2;

        const bodyP2 = new THREE.Mesh(
            new THREE.BoxGeometry(xbody2, ybody2, zbody2),
            this.material,
        );
        bodydivi.add(bodyP2);
        bodyP2.position.z=-zbody2/2;
        bodyP2.position.y=-0.24;

        //body menbers+++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ ++
        //assim evito de repetir muito codigo
        for(let i = 0; i<4; i++){
            let place_loc = {x: xbody2/2, y: -ybody2*0.4, z: zbody2/2};
            let x_y;
            switch(i){
                case 0: x_y = {x:1, z:1};break;
                case 1: x_y = {x:-1, z:1};break;
                case 2: x_y = {x:1, z:-1};break;
                case 3: x_y = {x:-1, z:-1};break;
            }
            let patAng = new THREE.Object3D()
            bodyP2.add(patAng);
            patAng.position.x= (place_loc.x - 0.5) * x_y.x
            patAng.position.y= place_loc.y
            patAng.position.z= (place_loc.z - 0.5) * x_y.z
            //blocos fisicos
            //antebraço
            let a1g = {x:0.5, y:1.5, z:0.5};
            let arm_1 = new THREE.Mesh(
                new THREE.BoxGeometry(a1g.x, a1g.y, a1g.z),
                this.material,
            );
            patAng.add(arm_1)
            arm_1.position.y=-a1g.y/2

            //articulação
            let subAng = new THREE.Object3D();
            arm_1.add(subAng);
            subAng.position.y= -a1g.y/2.1;

            //2ªparte
            let a2g = {x:0.3, y:1, z:0.3};
            let arm_2 = new THREE.Mesh(
                new THREE.BoxGeometry(a2g.x, a2g.y, a2g.z),
                this.material,
            );
            subAng.add(arm_2)
            arm_2.position.y=-a2g.y/2 

            //articulação tornizelo
            let subAngArt = new THREE.Object3D();
            arm_2.add(subAngArt);
            subAngArt.position.y= -a2g.y/2.5;

            //pé +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++
            let a3g = {x:0.8, y:0.3, z:1.5};
            let arm_3 = new THREE.Mesh(
                new THREE.BoxGeometry(a3g.x, a3g.y, a3g.z),
                this.material,
            );
            subAngArt.add(arm_3)
            arm_3.position.y=-a3g.y/2 
            arm_3.position.z=a3g.z/2 -0.2

            //anglos +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++
            patAng.rotation.x = -0.5
            subAng.rotation.x = 1.9
            subAngArt.rotation.x = -0.2
            this.menbers.push(patAng)
        };
        //Asas++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++
        bodyP2.add(this.asas);
        
        for(let i=0; i<2; i++){
            let place_loc = {x: xbody2/2, y: ybody2*0.4, z: zbody2/2};
            let gen_As_axesHelper = new THREE.AxesHelper( 0 );
            let x_y;
            switch(i){
                case 0: x_y = 1;break;
                case 1: x_y = -1;break;
            };
            let AsAng = new THREE.Object3D()
            this.asas.add(AsAng)
            AsAng.add(gen_As_axesHelper)
            AsAng.position.x= (place_loc.x - 0.1) * x_y
            AsAng.position.y= place_loc.y
            AsAng.position.z= (place_loc.z - 0.1)
            AsAng.rotation.z = -0.9 *x_y
            let a1g = {x:0.3, y:2.5, z:0.3};
            let arm_1 = new THREE.Mesh(
                new THREE.BoxGeometry(a1g.x, a1g.y, a1g.z),
                this.material,
            );
            AsAng.add(arm_1)
            arm_1.position.y=a1g.y/2

            let angleB = new THREE.Object3D()

            arm_1.add(angleB);
            angleB.add(this.sub_asas1);
            angleB.position.y= a1g.y/2.1;

            let geometry1 = new THREE.BufferGeometry();
            const points = [] // define array of vertices
            points.push(new THREE.Vector3(0.3, -2.2, 0.3))
            points.push(new THREE.Vector3(0.3, 0.5, -1.5))
            points.push(new THREE.Vector3(0, 0.5, 0.3))
            geometry1.setFromPoints(points);
            
            let As_C1 = new THREE.Mesh(geometry1, this.materialb);
            AsAng.add(As_C1)
            As_C1.position.y =2
            As_C1.position.z =-0.4
            As_C1.rotation.y= 0.2
            As_C1.rotation.z= -0.1
            let a2g = {x:0.3, y:0.3, z:1.8};
            let As_2 = new THREE.Mesh(
                new THREE.BoxGeometry(a2g.x, a2g.y, a2g.z),
                this.material,
            );
            angleB.add(As_2)
            As_2.position.z=-a2g.z/2 
        }
        const AH = new THREE.AxesHelper( 0 );
        this.asas.children[0].children[1].children[0].add(this.sub_asas1)
        this.sub_asas1.add(AH)
        let subAng = new THREE.Object3D();
        this.sub_asas1.add(subAng);
        subAng.rotation.x = -0.2
        let a3g = {x:0.3, y:2.5, z:0.3};
        let arm_3 = new THREE.Mesh(
            new THREE.BoxGeometry(a3g.x, a3g.y, a3g.z),
            this.material,
        );
        subAng.add(arm_3)

        let geometry2 = new THREE.BufferGeometry();
        const points2 = [] // define array of vertices
        points2.push(new THREE.Vector3(0.3, -2.2, 0.3))
        points2.push(new THREE.Vector3(0.3, 0.5, -1.5))
        points2.push(new THREE.Vector3(0, 0.5, 0.3))
        geometry2.setFromPoints(points2);
            
        let As_C2 = new THREE.Mesh(geometry2, this.materialb);
        arm_3.add(As_C2)
        As_C2.position.y =0.7
        As_C2.position.z =-0.4
        As_C2.rotation.y= 0.2
        As_C2.rotation.z= -0.1

        arm_3.position.y=a3g.y/2 
        arm_3.position.z=a3g.z/2 -0.2

        const AH2 = new THREE.AxesHelper( 0 );
        this.asas.children[1].children[1].children[0].add(this.sub_asas2)
        this.sub_asas2.add(AH2)
        let subAng1 = new THREE.Object3D();
        this.sub_asas2.add(subAng1);
        subAng1.rotation.x = -0.2
        let arm_32 = new THREE.Mesh(
            new THREE.BoxGeometry(a3g.x, a3g.y, a3g.z),
            this.material,
        );
        subAng1.add(arm_32)

        let geometry22 = new THREE.BufferGeometry();
        const points22 = [] // define array of vertices
        points22.push(new THREE.Vector3(0.3, -2.2, 0.3))
        points22.push(new THREE.Vector3(0.3, 0.5, -1.5))
        points22.push(new THREE.Vector3(0, 0.5, 0.3))
        geometry22.setFromPoints(points2);
            
        let As_C22 = new THREE.Mesh(geometry22, this.materialb);
        arm_32.add(As_C22)
        As_C22.position.y =0.7
        As_C22.position.z =-0.4
        As_C22.rotation.y= 0.2
        As_C22.rotation.z= -0.1

        arm_32.position.y=a3g.y/2 
        arm_32.position.z=a3g.z/2 -0.2

        //Cauda +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++
        let zbody3 = 1.7
        let ybody3 = 1.5
        let xbody3 = 1.5
        let incli = 0.03

        const bodyP3 = new THREE.Mesh(
            new THREE.BoxGeometry(xbody3, ybody3, zbody3),
            this.material,
        );
        bodyP2.add(bodyP3);
        bodyP3.position.z=(-zbody2/2) -(zbody3/2);
        bodyP3.position.y= 0.25
        bodyP3.add(this.caud_ang);
        //--- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --
        let zcb = 0.8
        let ycb = 0.8
        let xcb = 0.8
        const CB = new THREE.Object3D();
        this.caud_ang.add(CB);
        CB.position.z=-zcb
        CB.position.y=0.35
        CB.rotation.x=-incli
        const BCB = new THREE.Mesh(
            new THREE.BoxGeometry(xcb, ycb, zcb),
            this.material,
        );
        CB.add(BCB);
        BCB.position.z=-zcb/2;
        //-
        const CB1 = new THREE.Object3D();
        BCB.add(CB1);
        CB1.position.z=-zcb/2
        CB1.rotation.x=-incli
        const BCB2 = new THREE.Mesh(
            new THREE.BoxGeometry(xcb, ycb, zcb),
            this.material,
        );
        CB1.add(BCB2);
        BCB2.position.z=-zcb/2;
        //-
        const CB2 = new THREE.Object3D();
        BCB2.add(CB2);
        CB2.position.z=-zcb/2
        CB2.rotation.x=-incli
        const BCB3 = new THREE.Mesh(
            new THREE.BoxGeometry(xcb, ycb, zcb),
            this.material,
        );
        CB2.add(BCB3);
        BCB3.position.z=-zcb/2;
        //-
        const CB3 = new THREE.Object3D();
        BCB3.add(CB3);
        CB3.position.z=-zcb/2
        CB3.rotation.x=-incli
        const BCB4 = new THREE.Mesh(
            new THREE.BoxGeometry(xcb, ycb, zcb),
            this.material,
        );
        CB3.add(BCB4);
        BCB4.position.z=-zcb/2;
        //-
        const CB4 = new THREE.Object3D();
        BCB4.add(CB4);
        CB4.position.z=-zcb/2
        CB4.rotation.x=-incli
        const BCB5 = new THREE.Mesh(
            new THREE.BoxGeometry(xcb, ycb, zcb),
            this.material,
        );
        CB4.add(BCB5);
        BCB5.position.z=-zcb/2;
        //-
        const CB5 = new THREE.Object3D();
        BCB5.add(CB5);
        CB5.position.z=-zcb/2
        CB5.rotation.x=-incli
        const BCB6 = new THREE.Mesh(
            new THREE.BoxGeometry(xcb, ycb, zcb),
            this.material,
        );
        CB5.add(BCB6);
        BCB6.position.z=-zcb/2;
        //-
        const CB6 = new THREE.Object3D();
        BCB6.add(CB6);
        CB6.position.z=-zcb/2
        CB6.rotation.x=-incli
        const BCB7 = new THREE.Mesh(
            new THREE.BoxGeometry(xcb, ycb, zcb),
            this.material,
        );
        CB6.add(BCB7);
        BCB7.position.z=-zcb/2;
        

        //adicionar tudo++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        this.body.add(this.pescoço);
        this.pescoço.position.z = ZFBody/2;
        this.pescoço.position.y = 0.24
        pesc_angle4.add(this.head)
        this.head.position.z = headZ/2;
        this.head.position.y = 0.05
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

console.log(drag.sub_asas1)
renderer.setAnimationLoop(render)
//função render - responsabel pela animação EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
function render() {
    let spd = 0.03
    //animação da boca
    drag.boca.rotation.x += spd/2.5 * -exbox
    drag.body.position.y+=spd/3 * -exbox
    //animação do pescoço
    drag.pescoço.children[0].rotation.x+=spd/14 * -exbox
    drag.pescoço.children[0].children[0].children[0].rotation.x+=spd/14 * -exbox
    drag.pescoço.children[0].children[0].children[0].children[0].children[0].rotation.x+=spd/14 * -exbox
    drag.pescoço.children[0].children[0].children[0].children[0].children[0].children[0].children[0].rotation.x+=spd/14 * -exbox
    //menbros animation
    for(let i = 0; i<drag.menbers.length; i++){
        drag.menbers[i].rotation.x += spd/7 * -exbox
        drag.menbers[i].children[0].children[0].rotation.x += spd/2 * exbox
        drag.menbers[i].children[0].children[0].children[0].children[0].rotation.x += -spd * exbox
    }
    //animação das asas
    if (drag.asas.children[0].rotation.z>-0.4){exbox = -1}else
    if (drag.asas.children[0].rotation.z< -2){exbox = 1};
    drag.asas.children[0].rotation.z += spd * exbox 
    drag.asas.children[1].rotation.z += -spd * exbox 
    drag.sub_asas1.children[1].rotation.z += (spd/1.2) * exbox 
    drag.sub_asas2.children[1].rotation.z += -(spd/1.2) * exbox

    //animação da cauda
    drag.caud_ang.children[0].rotation.x+=spd/9 * exbox 
    drag.caud_ang.children[0].children[0].children[0].rotation.x+=spd/9 * exbox 
    drag.caud_ang.children[0].children[0].children[0].children[0].children[0].rotation.x+=spd/9 * exbox 
    drag.caud_ang.children[0].children[0].children[0].children[0].children[0].children[0].children[0].rotation.x+=spd/9 * exbox 
    drag.caud_ang.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].rotation.x+=spd/9 * exbox 
    drag.caud_ang.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].rotation.x+=spd/9 * exbox 
    drag.caud_ang.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].rotation.x+=spd/9 * exbox 


    renderer.render(scene, camera);
};
console.log(drag.asas)

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