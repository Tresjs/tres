import type { Camera, Group, Light, Material, Mesh, Scene, ShaderMaterial, Texture, WebGLRenderer } from 'three'
import { Color, HalfFloatType, MeshLambertMaterial, NearestFilter, WebGLRenderTarget } from 'three'
import { MeshDiscardMaterial as DiscardMaterial } from '../../materials/meshDiscardMaterial/material'

function isLight(object: any): object is Light {
  return object.isLight
}

function isGeometry(object: any): object is Mesh {
  return !!object.geometry
}

// NOTE: Based on "Progressive Light Map Accumulator", by [zalo](https://github.com/zalo/)
export class ProgressiveLightMap {
  renderer: WebGLRenderer
  res: number
  scene: Scene
  object: Mesh | null
  lightsGroup: Group | null = null
  buffer1Active: boolean
  progressiveLightMap1: WebGLRenderTarget
  progressiveLightMap2: WebGLRenderTarget
  discardMat: ShaderMaterial
  targetMat: MeshLambertMaterial
  previousShadowMap: { value: Texture }
  averagingWindow: { value: number }
  clearColor: Color
  clearAlpha: number
  lights: { object: Light, intensity: number }[]
  meshes: { object: Mesh, material: Material | Material[] }[]

  constructor(renderer: WebGLRenderer, scene: Scene, res = 1024) {
    this.renderer = renderer
    this.res = res
    this.scene = scene
    this.buffer1Active = false
    this.lights = []
    this.meshes = []
    this.object = null
    this.clearColor = new Color()
    this.clearAlpha = 0

    // NOTE: Create the Progressive LightMap Texture
    const textureParams = {
      type: HalfFloatType,
      magFilter: NearestFilter,
      minFilter: NearestFilter,
    }
    this.progressiveLightMap1 = new WebGLRenderTarget(this.res, this.res, textureParams)
    this.progressiveLightMap2 = new WebGLRenderTarget(this.res, this.res, textureParams)

    // NOTE: Inject some spicy new logic into a standard phong material
    this.discardMat = new DiscardMaterial()
    this.targetMat = new MeshLambertMaterial({ fog: false })
    this.previousShadowMap = { value: this.progressiveLightMap1.texture }
    this.averagingWindow = { value: 100 }
    this.targetMat.onBeforeCompile = (shader) => {
      // NOTE: Vertex Shader: Set Vertex Positions to the Unwrapped UV Positions
      shader.vertexShader
        = `varying vec2 vUv;
        ${shader.vertexShader.slice(0, -1)}
        vUv = uv; 
        gl_Position = vec4((uv - 0.5) * 2.0, 1.0, 1.0); }`

      // NOTE: Fragment Shader: Set Pixels to average in the Previous frame's Shadows
      const bodyStart = shader.fragmentShader.indexOf('void main() {')
      shader.fragmentShader
        = `
        varying vec2 vUv;
        ${shader.fragmentShader.slice(0, bodyStart)}
        uniform sampler2D previousShadowMap;
        uniform float averagingWindow;
        ${shader.fragmentShader.slice(bodyStart - 1, -1)}
        vec3 texelOld = texture2D(previousShadowMap, vUv).rgb;
        gl_FragColor.rgb = mix(texelOld, gl_FragColor.rgb, 1.0 / averagingWindow);
      }`

      // NOTE: Set the Previous Frame's Texture Buffer and Averaging Window
      shader.uniforms.previousShadowMap = this.previousShadowMap
      shader.uniforms.averagingWindow = this.averagingWindow
    }
  }

  clear() {
    this.renderer.getClearColor(this.clearColor)
    this.clearAlpha = this.renderer.getClearAlpha()
    this.renderer.setClearColor('black', 1)
    this.renderer.setRenderTarget(this.progressiveLightMap1)
    this.renderer.clear()
    this.renderer.setRenderTarget(this.progressiveLightMap2)
    this.renderer.clear()
    this.renderer.setRenderTarget(null)
    this.renderer.setClearColor(this.clearColor, this.clearAlpha)

    this.lights = []
    this.meshes = []
    this.scene.traverse((object) => {
      if (object === this.lightsGroup) { return false }
      if (isGeometry(object)) {
        this.meshes.push({ object, material: object.material })
      }
      else if (isLight(object)) {
        this.lights.push({ object, intensity: object.intensity })
      }
    })
  }

  prepare() {
    this.lights.forEach(light => (light.object.intensity = 0))
    this.meshes.forEach(mesh => (mesh.object.material = this.discardMat))
  }

  finish() {
    this.lights.forEach(light => (light.object.intensity = light.intensity))
    this.meshes.forEach(mesh => (mesh.object.material = mesh.material))
  }

  configure(object: Mesh, lightsGroup: Group) {
    this.object = object
    this.lightsGroup = lightsGroup
  }

  update(camera: Camera, blendWindow = 100) {
    if (!this.object) { return }
    // NOTE: Set each object's material to the UV Unwrapped Surface Mapping Version
    this.averagingWindow.value = blendWindow
    this.object.material = this.targetMat
    // NOTE: Ping-pong two surface buffers for reading/writing
    const activeMap = this.buffer1Active ? this.progressiveLightMap1 : this.progressiveLightMap2
    const inactiveMap = this.buffer1Active ? this.progressiveLightMap2 : this.progressiveLightMap1
    // NOTE: Render the object's surface maps
    const oldBg = this.scene.background
    this.scene.background = null
    this.renderer.setRenderTarget(activeMap)
    this.previousShadowMap.value = inactiveMap.texture
    this.buffer1Active = !this.buffer1Active
    this.renderer.render(this.scene, camera)
    this.renderer.setRenderTarget(null)
    this.scene.background = oldBg
  }
}
