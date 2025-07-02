// === Initialisation de la scène ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game') });
renderer.setSize(window.innerWidth, window.innerHeight);

// === Lumière ===
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// === Sol en blocs ===
const blockSize = 1;
const groundSize = 16;

const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load('https://i.imgur.com/8jHqFSe.png'); // texture herbe
grassTexture.magFilter = THREE.NearestFilter;

const blockMaterial = new THREE.MeshLambertMaterial({ map: grassTexture });

for (let x = 0; x < groundSize; x++) {
  for (let z = 0; z < groundSize; z++) {
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(blockSize, blockSize, blockSize),
      blockMaterial
    );
    block.position.set(x, 0, z);
    scene.add(block);
  }
}

// === Contrôles FPS ===
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => controls.lock());

camera.position.y = 2;
scene.add(controls.getObject());

const velocity = new THREE.Vector3();
const keys = {};

document.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

// === Boucle de jeu ===
function animate() {
  requestAnimationFrame(animate);

  // Mouvement
  const speed = 0.05;
  if (keys['w']) velocity.z = -speed;
  if (keys['s']) velocity.z = speed;
  if (keys['a']) velocity.x = -speed;
  if (keys['d']) velocity.x = speed;

  controls.moveRight(velocity.x);
  controls.moveForward(velocity.z);

  velocity.x *= 0.8;
  velocity.z *= 0.8;

  renderer.render(scene, camera);
}
animate();
