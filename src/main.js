import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


//create a scene
const scene = new THREE.Scene()

//textrues
 const textureLoader = new THREE.TextureLoader()
 const particleTexture = textureLoader.load('/')

//Particles


//Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 200

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i=0; i< count*3; i++)
  {
  positions[i] = (Math.random() - 0.5)* 10
  }

for (let i=0; i< count*3; i++)
  {
  colors[i] = Math.random() 
  }

  particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors , 3)
  )

  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions , 3)
  )

//Material
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.05
particlesMaterial.sizeAttenuation = true;
// particlesMaterial.Color = new THREE.Color('#ff88cc')
particlesMaterial.transparent = true
// particlesMaterial.alphaMap = particleTexture()
// particlesMaterial.alphaTest = 0.001 
// particlesMaterial.depthTest = false 
particlesMaterial.blending = THREE.AdditiveBlending
particlesMaterial.depthWrite = false 
particlesMaterial.vertexColors = true

//Points 

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles);



//create aspect
const aspect = {
  width : window.innerWidth,
  height : window.innerHeight
}

//create the camera 
const camera = new THREE.PerspectiveCamera(75, aspect.width/ aspect.height)
camera.position.z = 3
scene.add(camera);



//create the canvas

const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize( aspect.width, aspect.height )

//Controls
const controls = new OrbitControls(camera, canvas);

const clock = new THREE.Clock()


function animate() {

  const elapsedTime = clock.getElapsedTime()

  //Update Particles
  // particles.position.y = - elapsedTime *0.02 // For Moving it like slow 
  
  for(let i=0; i<count; i++){
    const i3 = i*3
    
    const x = particlesGeometry.attributes.position.array[i3]
    particlesGeometry.attributes.position.array[ i3 + 1 ] = Math.sin(elapsedTime + x)
  }

  particlesGeometry.attributes.position.needsUpdate = true


  renderer.render(scene,camera); 

  window.requestAnimationFrame(animate)
}

animate();