<script setup lang="ts">
import { INJECTION_KEY, logWarning, TresPortal, useLoop, useTres, useTresContext } from '@tresjs/core'
import {
  HalfFloatType,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three'
import { onBeforeUnmount, provide, shallowRef, watch } from 'vue'
import { PortalMaterialImpl } from './PortalMaterialImpl'

export interface MeshPortalMaterialProps {
  /** 0 = world only, 1 = portal only. Cross-fades between. Default 0. */
  blend?: number
  /** FBO resolution for the window pass. Default 512. */
  resolution?: number
  /** Keep portal contents in world units (identity) instead of host-relative. Default false. */
  worldUnits?: boolean
  /** Render-loop priority for the blend takeover. Default 0. */
  renderPriority?: number
}

const props = withDefaults(defineProps<MeshPortalMaterialProps>(), {
  blend: 0,
  resolution: 512,
  worldUnits: false,
  renderPriority: 0,
})

const { extend, invalidate } = useTres()
extend({ PortalMaterialImpl })

const materialRef = shallowRef()

// Private portal scene. Children are reparented here via <TresPortal>.
const portalScene = new Scene()
portalScene.matrixAutoUpdate = false

// Override the injected scene context for the portal children so that imperative
// helpers (e.g. cientos <Environment>) that read `useTres().scene` configure the
// PORTAL scene, not the main scene. provide() reaches slot content through the
// <TresPortal>/<Teleport> (it follows the mounted tree, not authorship); only the
// `scene` ref is swapped — renderer, camera, sizes, etc. are inherited unchanged.
const ctx = useTresContext()
provide(INJECTION_KEY, { ...ctx, scene: shallowRef(portalScene) })

// FBOs
const rtOptions = { minFilter: LinearFilter, magFilter: LinearFilter, type: HalfFloatType }
const fboMap = new WebGLRenderTarget(props.resolution, props.resolution, rtOptions)
const buffer1 = new WebGLRenderTarget(1, 1, rtOptions) // portal scene (blend)
const buffer2 = new WebGLRenderTarget(1, 1, rtOptions) // root scene (blend)

watch(() => props.resolution, res => fboMap.setSize(res, res))

// Inline fullscreen quad for the blend cross-fade: mix(root, portal, blend).
const quadScene = new Scene()
const quadCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
const quadMaterial = new ShaderMaterial({
  uniforms: {
    a: { value: buffer1.texture }, // portal
    b: { value: buffer2.texture }, // root
    blend: { value: 0 },
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D a;
    uniform sampler2D b;
    uniform float blend;
    varying vec2 vUv;
    void main() { gl_FragColor = mix(texture2D(b, vUv), texture2D(a, vUv), blend); }
  `,
})
const quadGeometry = new PlaneGeometry(2, 2)
quadScene.add(new Mesh(quadGeometry, quadMaterial))

const { onBeforeRender, onRender } = useLoop()
const drawSize = new Vector2()

let hasWarnedWebGPU = false

function isWebGL(r: unknown): r is WebGLRenderer {
  if ((r as { isWebGPURenderer?: boolean })?.isWebGPURenderer) {
    if (!hasWarnedWebGPU) {
      logWarning('MeshPortalMaterial: WebGPURenderer is not supported yet')
      hasWarnedWebGPU = true
    }
    return false
  }
  return r instanceof WebGLRenderer
}

// Window pass — runs before the main render so the mesh samples a fresh map.
onBeforeRender(({ renderer, camera }) => {
  const mat = materialRef.value
  if (!mat || !isWebGL(renderer)) { return }
  const host = mat.__tres?.parent
  const cam = camera.value
  if (!host || !cam) { return }

  mat.blend = props.blend

  // Position portal scene relative to the host surface (or world-absolute).
  if (props.worldUnits) {
    portalScene.matrixWorld.identity()
  }
  else {
    if (props.blend === 1) { host.updateWorldMatrix(true, false) }
    portalScene.matrixWorld.copy(host.matrixWorld)
  }

  // Keep rendering each frame: the window FBO must track animated portal contents,
  // and the blend>=1 takeover depends on the main pass clearing the framebuffer first.
  invalidate()

  renderer.getDrawingBufferSize(drawSize)
  mat.uniforms.resolution.value.copy(drawSize)

  // Render portal scene to the window FBO with a transparent clear.
  const prevAlpha = renderer.getClearAlpha()
  renderer.setClearAlpha(0)
  renderer.setRenderTarget(fboMap)
  renderer.clear()
  renderer.render(portalScene, cam)
  renderer.setRenderTarget(null)
  renderer.setClearAlpha(prevAlpha)

  mat.map = fboMap.texture
}, Number.POSITIVE_INFINITY)

// Blend takeover — runs after the main render, draws on top of the framebuffer.
onRender(({ renderer, scene, camera }) => {
  const mat = materialRef.value
  if (!mat || !isWebGL(renderer)) { return }
  const cam = camera.value
  if (!cam) { return }
  const blend = props.blend
  if (blend <= 0) { return }

  if (blend >= 1) {
    // Fully inside the portal.
    renderer.render(portalScene, cam)
    return
  }

  // 0 < blend < 1: cross-fade root <-> portal via fullscreen quad.
  renderer.getDrawingBufferSize(drawSize)
  if (buffer1.width !== drawSize.x || buffer1.height !== drawSize.y) {
    buffer1.setSize(drawSize.x, drawSize.y)
    buffer2.setSize(drawSize.x, drawSize.y)
  }
  quadMaterial.uniforms.blend.value = blend

  const prevAlpha = renderer.getClearAlpha()
  renderer.setClearAlpha(1)

  renderer.setRenderTarget(buffer1)
  renderer.clear()
  renderer.render(portalScene, cam)

  renderer.setRenderTarget(buffer2)
  renderer.clear()
  renderer.render(scene.value, cam)

  renderer.setRenderTarget(null)
  renderer.render(quadScene, quadCamera)

  renderer.setClearAlpha(prevAlpha)
}, props.renderPriority)

onBeforeUnmount(() => {
  fboMap.dispose()
  buffer1.dispose()
  buffer2.dispose()
  quadGeometry.dispose()
  quadMaterial.dispose()
})

defineExpose({ instance: materialRef })
</script>

<template>
  <TresPortalMaterialImpl ref="materialRef" />
  <TresPortal :to="portalScene">
    <slot></slot>
  </TresPortal>
</template>
