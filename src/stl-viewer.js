import { LitElement, html, css } from 'lit';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

export class STLViewer extends LitElement {
  static properties = {
    src: { type: String },
    stlColor: { type: String, attribute: 'stl-color' },
    lightColor: { type: String, attribute: 'light-color' }
  };

  constructor() {
    super();
    this.src = '';
    this.stlColor = '#236422'; // Neutral green
    this.lightColor = '#ffffff';
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.boundingBox = null;
  }

  firstUpdated() {
    this.initThree();
    if (this.src) {
      this.loadSTL(this.src);
    }
    this.setupResizeObserver();
  }

  initThree() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.addLighting();
    this.animate();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null; // Fully transparent background
  }

  setupCamera() {
    const width = this.offsetWidth;
    const height = (width * 3) / 4;
    this.camera = new THREE.PerspectiveCamera(40, width / height, 1, 2500);
  }

  setupRenderer() {
    const width = this.offsetWidth;
    const height = (width * 3) / 4;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.shadowRoot.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 200;
    this.controls.maxDistance = 2000;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
  }

  addLighting() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    hemiLight.position.set(0, 1000, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(1000, 1000, 1000);
    this.scene.add(dirLight);
  }

  setupResizeObserver() {
    new ResizeObserver(() => {
      const width = this.offsetWidth;
      const height = (width * 3) / 4;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }).observe(this);
  }

  loadSTL(url) {
    const loader = new STLLoader();
    loader.load(
      url,
      (geometry) => {
        this.handleSTLLoadSuccess(geometry);
      },
      undefined,
      (error) => {
        console.error('Error loading STL:', error);
      }
    );
  }

  handleSTLLoadSuccess(geometry) {
    this.prepareGeometry(geometry);
    this.updateSTLColor();

    // Calculate the bounding box and adjust camera position
    this.boundingBox = geometry.boundingBox.clone();
    const center = new THREE.Vector3();
    this.boundingBox.getCenter(center);
    const size = new THREE.Vector3();
    this.boundingBox.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this.camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.5; // Adjust multiplier for distance

    // Set the camera position to 45 degrees up and to the left
    this.camera.position.set(center.x - cameraZ * 0.75, center.y + cameraZ * 0.75, center.z + cameraZ);
    this.camera.lookAt(center);
    this.controls.target.copy(center);
    this.controls.update();

    this.addLighting(); // Add lighting after adjusting the camera
    this.animate(); // Start the animation loop
  }

  prepareGeometry(geometry) {
    geometry.computeBoundingBox();
    this.boundingBox = geometry.boundingBox.clone();
    const center = new THREE.Vector3();
    this.boundingBox.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z); // Center the geometry at origin
    geometry.rotateX(-Math.PI / 2); // Rotate to match typical STL orientation

    this.geometry = geometry;
  }

  updateSTLColor() {
    if (this.geometry) {
      const material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(this.stlColor)
      });

      const mesh = new THREE.Mesh(this.geometry, material);
      this.scene.clear();
      this.scene.add(mesh);

      // Update the border color to match the STL color
      this.style.borderColor = this.stlColor;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return html`<style>
      :host {
        display: block;
        width: 95%;
        height: 95%;
        border: 5px solid var(--stl-color, #236422);
        border-radius: 12px;
        box-sizing: border-box;
        margin: auto;
      }
    </style>`;
  }
}

customElements.define('stl-viewer', STLViewer);

