import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import typeFaceFont from "./fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/Addons.js";

// import GUI from "lil-gui";
// import gsap from "gsap";
// import doorColorImage from "./textures/door/color.jpg";
// import doorAlphaImage from "./textures/door/alpha.jpg";
// import doorHeightImage from "./textures/door/height.jpg";
// import doorNormalImage from "./textures/door/normal.jpg";
// import doorAmbientOcclusionImage from "./textures/door/ambientOcclusion.jpg";
// import doorMetalnessImage from "./textures/door/metalness.jpg";
// import doorRoughnessImage from "./textures/door/roughness.jpg";
// import minecraftImage from "./textures/minecraft.png";
// import matCapImage from "./textures/matcaps/5.png";
// import gradientImage from "./textures/gradients/5.jpg";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// canvas
const canvas = document.querySelector("canvas.webgl");

// debug
const gui = new GUI();

// cursor
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  console.log(cursor.x, cursor.y);
});

// scene
const scene = new THREE.Scene();

// fonts
const fontLoader = new THREE.FontLoader();

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// event listener resize
window.addEventListener("resize", () => {
  console.log("window has been resized");

  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

// event listener dblclick
window.addEventListener("dblclick", () => {
  console.log("double click");

  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.01,
  1000
);

camera.position.z = 3;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  // update controls
  controls.update();

  // render per frame
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
