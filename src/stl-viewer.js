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

  adjustCameraToBoundingBox() {
    if (this.boundingBox) {
      const center = this.boundingBox.getCenter(new THREE.Vector3());
      const size = new THREE.Vector3();
      this.boundingBox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = this.camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2)));
      
      // Set the orbit controls target to the center of the bounding box
      this.controls.target.copy(center);
      
      // Position the camera at a 45-degree angle relative to the center
      this.camera.position.set(center.x - cameraZ * 0.75, center.y + cameraZ * 0.75, center.z + cameraZ * 1.5);
      this.camera.lookAt(center);
      this.camera.updateProjectionMatrix();
      
      this.controls.update();
    }
  }

  setupRenderer() {
    const width = this.offsetWidth;
    const height = (width * 3) / 4;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.shadowRoot.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.renderer.domElement.addEventListener('wheel', (event) => {
      if (!this.isPointerOverCanvas(event)) {
        event.stopPropagation();
      }
    });
    this.controls.minDistance = 200;
    this.controls.maxDistance = 2000;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
  }

  addLighting() {
    if (this.boundingBox) {
      const size = new THREE.Vector3();
      this.boundingBox.getSize(size);
      const distance = Math.max(size.x, size.y, size.z) * 1.5;
      
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
      hemiLight.position.set(0, distance, 0);
      this.scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight.position.set(distance, distance, distance);
      dirLight.castShadow = false;
      this.scene.add(dirLight);

      const pointLight = new THREE.PointLight(this.lightColor, 1.5, distance * 2);
      pointLight.position.set(-distance, distance, -distance);
      this.scene.add(pointLight);
    }
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
    this.adjustCameraToBoundingBox();
    this.addLighting(); // Ensure lights are positioned after geometry is loaded
  }prepareGeometry(geometry) {
    geometry.computeBoundingBox();
    this.boundingBox = geometry.boundingBox.clone();
    const center = new THREE.Vector3();
    this.boundingBox.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.rotateX(-Math.PI / 2);
    
    // Add a point marker to visualize the center of rotation
    const markerGeometry = new THREE.SphereGeometry(5, 32, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.copy(center);
    this.scene.add(marker);
    
    // Update the controls to orbit around the new center
    this.controls.target.set(center.x, center.y, center.z);
    this.controls.update();
    
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
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  isPointerOverCanvas(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    return (
      event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom
    );
  }render() {
    return html`<style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    </style>`;
  }
}

customElements.define('stl-viewer', STLViewer);

