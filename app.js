let scene,camera,renderer,controls,model,light;
init();loadModel();animate();
function init(){
 scene=new THREE.Scene();
 camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,100);
 camera.position.set(1,1,3);
 renderer=new THREE.WebGLRenderer({antialias:true});
 renderer.setSize(window.innerWidth,window.innerHeight);
 document.getElementById('three-canvas').appendChild(renderer.domElement);
 controls=new THREE.OrbitControls(camera,renderer.domElement);
 controls.enableDamping=true;
 light=new THREE.DirectionalLight(0xffffff,1);
 light.position.set(2,2,2);
 scene.add(light,new THREE.AmbientLight(0xffffff,0.6));
 window.addEventListener('resize',()=>{
   camera.aspect=window.innerWidth/window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth,window.innerHeight);
 });
}
function loadModel(){
 const loader=new THREE.GLTFLoader();
 loader.load('model/emdd-4unit3.glb',(gltf)=>{
   model=gltf.scene;scene.add(model);
 });
}
function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);}
// UI bindings
document.getElementById('light-range').addEventListener('input',(e)=>{light.intensity=parseFloat(e.target.value);});
document.getElementById('reset').addEventListener('click',()=>{camera.position.set(1,1,3);controls.reset();});
