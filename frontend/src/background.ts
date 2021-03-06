import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

const debug = false;
let free  = false;

// Buttons
const freecamBtn = <HTMLElement>document.getElementById('btn-freecam')
const bgonlyBtn =  <HTMLElement>document.getElementById('btn-bgonly')
const mainElement = <HTMLElement>document.getElementById('main')
const freeNoteElement = <HTMLElement>document.getElementById('freecam-note')
const freeBackElement = <HTMLElement>document.getElementById('freecam-back')
freecamBtn.addEventListener('click', () => {
  mainElement.remove()
  freeNoteElement.style.display = 'inline'
  freeBackElement.style.display = 'inline'
  free = true
})
bgonlyBtn.addEventListener('click', () => {
  freeBackElement.style.display = 'inline'
  mainElement.style.opacity = '0'
})
if(free) { // If free when script is loaded
  mainElement.style.display = 'none'
  mainElement.remove()
}

// Initialise scene and renderer
const canvasElemement = <HTMLCanvasElement>document.getElementById('bg')
const scene = new THREE.Scene()
const renderer = new THREE.WebGL1Renderer({ canvas: canvasElemement })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
const controls = new OrbitControls(camera, renderer.domElement)
let targetCoords: [number, number, number] = [10, 1, 10] // Used for interpolation
camera.position.set(...targetCoords)
scene.add(camera)

// Mark Cube
const markMaterials = [
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('static/assets/mark/square_portrait_2.jpg'),
    transparent: true,
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('static/assets/mark/square_portrait_1.jpg'),
    transparent: true,
  }),
]
const mark = new THREE.Mesh(new THREE.BoxBufferGeometry(0.4, 0.4, 0.4), markMaterials)
mark.geometry.clearGroups();
mark.geometry.addGroup( 0, Infinity, 0 );
mark.geometry.addGroup( 0, Infinity, 1 );
camera.add(mark)
mark.rotation.x = 0.2
mark.position.set(0.8, 0.5, -2)
setInterval(() => {
  // Fade between the list of materials
  mark.material = [...mark.material.slice(1), mark.material[0]]
  mark.material[mark.material.length-1].opacity = 0
  function fadeIter() {
    mark.material[mark.material.length-1].opacity += 0.01
    if (mark.material[mark.material.length-1].opacity < 1){
      setTimeout(fadeIter, 10)
    }
  }
  fadeIter()
}, 10000)

// Ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05)
scene.add(ambientLight)

// Background image
const background = new THREE.Mesh(
  new THREE.SphereGeometry(3000, 10, 10),
  new THREE.MeshBasicMaterial({
    map         : new THREE.TextureLoader().load('static/assets/space/2k_stars_milky_way.jpg'),
    side        : THREE.BackSide,
  })
)
scene.add(background)

// Sun (w/ point light)
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 12, 12),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('static/assets/sun/2k_sun.jpg'),
  })
)
const pointLight = new THREE.PointLight(0xffffff, 2)
sun.add(pointLight)
scene.add(sun)
sun.position.set(100, 0, 5)

// Earth
const earth = new THREE.Mesh(
  new THREE.SphereBufferGeometry(3, 34, 32),
  [
    new THREE.MeshBasicMaterial({
      map         : new THREE.TextureLoader().load('static/assets/earth/2k_earth_nightmap.jpg'),
      specularMap : new THREE.TextureLoader().load('static/assets/earth/2k_earth_specular_map.jpg'),
      transparent : true
    }),
    new THREE.MeshPhongMaterial({
      map         : new THREE.TextureLoader().load('static/assets/earth/2k_earth_daymap.jpg'),
      normalMap   : new THREE.TextureLoader().load('static/assets/earth/2k_earth_normal_map.jpg'),
      normalScale : new THREE.Vector2(9, 9),
      specularMap : new THREE.TextureLoader().load('static/assets/earth/2k_earth_specular_map.jpg'),
      shininess   : 50,
    }),
  ]
)
earth.geometry.clearGroups();
earth.geometry.addGroup( 0, Infinity, 0 );
earth.geometry.addGroup( 0, Infinity, 1 );

const clouds = new THREE.Mesh(
  new THREE.SphereGeometry(3.02, 34, 32),
  new THREE.MeshPhongMaterial({
    map         : new THREE.TextureLoader().load('static/assets/earth/2k_earth_clouds.jpg'),
    side        : THREE.DoubleSide,
    opacity     : 0.3,
    transparent : true,
    depthWrite  : false,
  })
)
earth.position.set(0, 0, 0)
scene.add(earth)
earth.add(clouds)

// Moon
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 34, 32),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('static/assets/moon/2k_moon.jpg')
  })
)
scene.add(moon)

// Stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.1, 6, 6)
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)
  let [x, y, z] = [0, 0, 0]
  while (Math.sqrt(x**2 + y**2 + z**2) < 10) {
    // Repeat until we find coordates are >= 20 from origin
    [x, y, z] = Array(3).fill(null).map(() => THREE.MathUtils.randFloatSpread(250)) // [-250, 250]
  }
  star.position.set(x, y, z)
  scene.add(star)
}
Array(300).fill(null).forEach(addStar)

// Mars
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2, 34, 32),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('static/assets/mars/2k_mars.jpg')
  })
)
mars.position.set(-190, 6, 4)
scene.add(mars)

// Swordsman
const swordsman = new THREE.Mesh(
  undefined,
  new THREE.MeshStandardMaterial({
    color: 'red'
  })
)
swordsman.scale.set(1, 1, 1)
swordsman.position.set(-60, -4, 25)
swordsman.rotation.set(-Math.PI*0.5, 0, 0)
scene.add(swordsman)
const swordsmanLight = new THREE.PointLight(0xffffff, 1, 20)
scene.add(swordsmanLight)
swordsmanLight.position.setX(swordsman.position.x - 4)
swordsmanLight.position.setY(swordsman.position.y + 5)
swordsmanLight.position.setZ(swordsman.position.z - 6)
new STLLoader().load(
  'static/assets/swordsman/MarksSelfMadeHumanMale2pose1.stl',
  (geometry) => swordsman.geometry = geometry
)

// Debug Helpers (spacial grid & light indicators)
if (debug) {
  const pointLightHelper = new THREE.PointLightHelper(pointLight)
  const swordsmanLightHelper = new THREE.PointLightHelper(swordsmanLight)
  const gridHelper = new THREE.GridHelper(200, 50)
  scene.add(pointLightHelper)
  scene.add(swordsmanLightHelper)
  scene.add(gridHelper)
}

// On resize window (update FOV & mark cube position)
window.addEventListener("resize", () => {
  //
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight )
  mark.position.x = window.innerWidth * 0.001
});

// On scroll (animation & camera movement)
function handleScroll() {
  const scrollPos = -document.body.getBoundingClientRect().top // Scroll position
  const scrollMax =  Math.max(
    document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,
    document.documentElement.scrollHeight, document.documentElement.offsetHeight
  ) - window.innerHeight;
  const t = (2 * scrollPos / scrollMax)**3 // [0, 1]

  // Zoom-out effect (in conjunction with OrbitControls)
  targetCoords = [10 - 50*t, 1 + 2*t, 10]
}
document.body.onscroll = handleScroll

// Animation & Rendering
function animate(){
  requestAnimationFrame(animate)
  const time = new Date().getTime() / 1000

  // Mark cube animation
  mark.rotation.y += 0.003

  // Earth animation (rotation)
  earth.rotation.y += 0.008
  clouds.rotation.y += 0.002

  // Earth day/night transition
  const mapRange = (
    value: number,
    fromMin: number,
    fromMax: number,
    toMin: number,
    toMax: number
  ) => (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
  const opacity = mapRange(camera.position.x, 10, -12, 0, 1)
  earth.material[0].opacity = opacity
  //console.log({x: camera.position.x, opacity})

  // Moon (rotation & orbit)
  const rps = 0.3
  moon.rotation.y = time * rps * Math.PI + 0.5*Math.PI
  moon.position.x = Math.sin(time * rps * Math.PI) * 10
  moon.position.z = Math.cos(time * rps * Math.PI) * 10

  // Swordsman (rotation)
  swordsman.rotation.z += 0.015

  // Camera (interpolated movement)
  if(!free){
    camera.position.lerp(new THREE.Vector3(...targetCoords), 0.05)
  }

  controls.update()
  renderer.render(scene, camera)
}
animate()