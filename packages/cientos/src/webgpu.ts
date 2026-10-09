/**
 * `@tresjs/cientos/webgpu`: the components that work under `WebGPURenderer`.
 *
 * A component that writes GLSL (alone or with a render target) or calls WebGL-only renderer APIs
 * is left out until its TSL port lands here with the same name and props. Importing it from this
 * entry then fails at build time and names the component, instead of rendering wrong at runtime.
 * Render targets alone are fine: `WebGLRenderTarget` and `WebGLCubeRenderTarget` hold no WebGL
 * code, and WebGPURenderer renders into them.
 *
 * `scripts/check-entries.mjs` lists the left-out names and fails the build when a root export is
 * in neither place.
 */

export {
  Align,
  Billboard,
  CameraShake,
  Decal,
  DecalDebugUI,
  Edges,
  ensureTextureNames,
  Fit,
  getTextureAspect,
  getTextureName,
  invalidateDecalGeometry,
  Levioso,
  Mask,
  Sampler,
  ScreenSizer,
  ScreenSpace,
  useDecalEditor,
  useMask,
} from './core/abstractions'
export type {
  AlignCallbackOptions,
  AlignProps,
  DecalEditorSession,
  DecalEntry,
  DecalEntryActions,
  DecalImperativeApi,
  DecalJsonEntry,
  DecalLayout,
  EditMode,
} from './core/abstractions'
export * from './core/abstractions/Instances'
export * from './core/abstractions/useSurfaceSampler'
export * from './core/controls'
export * from './core/debug-performance'
export { CircleShadow, RandomizedLights } from './core/light-shadow'

export * from './core/loaders'
export { default as HolographicMaterial } from './core/materials/holographicMaterial/webgpu.vue'
export { default as MeshGlassMaterial } from './core/materials/meshGlassMaterial/webgpu.vue'
export { default as MeshWobbleMaterial } from './core/materials/meshWobbleMaterial/webgpu.vue'
export * from './core/miscellaneous'
export {
  AnimatedSprite,
  CubeCamera,
  Fbo,
  GradientTexture,
  MarchingCube,
  MarchingCubes,
  MarchingPlane,
  Text3D,
} from './core/objects'
export { default as Image } from './core/objects/Image/webgpu.vue'
export * from './core/objects/useFBO'

export {
  Box,
  Circle,
  Cone,
  Cylinder,
  Dodecahedron,
  Icosahedron,
  Octahedron,
  Plane,
  Ring,
  RoundedBox,
  RoundedPlane,
  ScreenQuad,
  Sphere,
  Superformula,
  Tetrahedron,
  Torus,
  TorusKnot,
  Tube,
} from './core/shapes'
export { default as Grid } from './core/shapes/Grid/webgpu.vue'

export { Backdrop, Environment, Lightformer, Smoke } from './core/staging'
export { default as Precipitation } from './core/staging/Precipitation/webgpu.vue'
export { default as Stars } from './core/staging/Stars/webgpu.vue'

export * from './core/staging/useEnvironment'

export * from './utils'
