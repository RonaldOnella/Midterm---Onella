const scene = new THREE.Scene();
const FOV = 75;
const NEAR = 0.1;
const FAR = 1000;
const MAXPARTICLES = 10000;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//CAMS
let camera = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  NEAR,
  FAR
);
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 300;


;
camera.lookAt(new THREE.Vector3(200,100, 0));

//ring
let ringParticles = new THREE.Geometry();


for (let i = 0; i < MAXPARTICLES; i++) {
  let vertex = new THREE.Vector3 (
    random(-700, 700) ,
    random(-5, 5),
    random(-700, 700)
  );
  ringParticles.vertices.push(vertex);
}
let rocks = new THREE.TextureLoader().load('images/rock.png');
let particleMaterial = new THREE.PointsMaterial({
  map: rocks,
  size: 2.86,
});

let ringMesh = new THREE.Points(ringParticles, particleMaterial);
ringMesh.sortParticles = true;
scene.add(ringMesh);

let saturnTexture = new THREE.TextureLoader().load('images/saturnTexture.jpg');
let saturnGeometry = new THREE.SphereGeometry( 150, 50, 50  );
let saturnMaterial = new THREE.MeshLambertMaterial( {map: saturnTexture} );
let saturn = new THREE.Mesh( saturnGeometry, saturnMaterial );
saturn.position.y = 10;
scene.add( saturn );

//light
let light = new THREE.AmbientLight( "#FFFFFF" );
scene.add( light );

//Rng
function random(min, max) {
  if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}

//render
function render() {
    requestAnimationFrame(render);
    ringMesh.rotation.y += -0.001100;
    saturn.rotation.y += -0.000700;
    renderer.render(scene, camera);
  }
  render();

//RESIZE
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);