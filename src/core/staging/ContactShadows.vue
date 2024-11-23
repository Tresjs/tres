<script setup lang="ts">
// NOTE: The author of the original code is @mrdoob https://twitter.com/mrdoob
// https://threejs.org/examples/?q=con#webgl_shadow_contact

// NOTE: Shader inspiration taken from R3F/Drei:
// https://github.com/pmndrs/drei/blob/b50a2d4b1a1278ae36058b9b53b85a00ef195762/src/core/ContactShadows.tsx#L10

import { useLoop } from '@tresjs/core'
import {
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  OrthographicCamera,
  PlaneGeometry,
  ShaderMaterial,
  WebGLRenderTarget,
} from 'three'
import { HorizontalBlurShader, VerticalBlurShader } from 'three-stdlib'
import { onUnmounted, watch } from 'vue'
import type { TresColor } from '@tresjs/core'
import type {
  ColorRepresentation,
  Scene,
  WebGLRenderer,
} from 'three'

export interface ContactShadowsProps {
  /**
   * The opacity of the shadows.
   *
   * @default 1
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  opacity?: number
  /**
   * The blur of the shadows.
   *
   * @default 1
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  blur?: number
  /**
   * The color of the shadows.
   *
   * @default '#000000'
   * @type {TresColor}
   * @memberof ContactShadowsProps
   *
   */
  color?: TresColor
  /**
   * The tint at the "core" of the shadows.
   *
   * @default undefined
   * @type {TresColor}
   * @memberof ContactShadowsProps
   *
   */
  tint?: TresColor
  /**
   * The scale of the shadows.
   */
  scale?: number | [x: number, y: number]
  /**
   * The width of the shadow plane.
   *
   * @default 1
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  width?: number
  /**
   * The height of the shadow plane.
   *
   * @default 1
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  height?: number
  /**
   * How far the OrthographicCamera should be to capture the shadows.
   *
   * @default 10
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  far?: number
  /**
   * Whether the shadows should be smooth or not.
   *
   * @default true
   * @type {boolean}
   * @memberof ContactShadowsProps
   *
   */
  smooth?: boolean
  /**
   * The resolution of the shadows.
   *
   * @default 512
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  resolution?: number
  /**
   * The number of frames to render the shadows.
   *
   * @default Infinity
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  frames?: number
  /**
   * Whether the shadows should write to the depth buffer or not.
   *
   * @default false
   * @type {boolean}
   * @memberof ContactShadowsProps
   *
   */
  depthWrite?: boolean
  /**
   * Whether the shadows should write to the depth buffer or not.
   *
   * @default false
   * @type {boolean}
   * @memberof ContactShadowsProps
   *
   */
}

const props = withDefaults(defineProps<ContactShadowsProps>(), {
  opacity: 1,
  blur: 1,
  color: '#000000',
  tint: undefined,
  scale: 10,
  width: 1,
  height: 1,
  far: 10,
  smooth: true,
  resolution: 512,
  frames: Number.POSITIVE_INFINITY,
  depthWrite: false,
})

function blurShadow(
  blur: number,
  renderer: WebGLRenderer,
  pool: ReturnType<typeof init>,
) {
  pool.blurPlane.visible = true
  pool.blurPlane.material = pool.horizontalBlurMaterial
  pool.horizontalBlurMaterial.uniforms.tDiffuse.value = pool.renderTarget.texture
  pool.horizontalBlurMaterial.uniforms.h.value = blur / 256

  renderer.setRenderTarget(pool.renderTargetBlur)
  renderer.render(pool.blurPlane, pool.shadowCamera)

  pool.blurPlane.material = pool.verticalBlurMaterial
  pool.verticalBlurMaterial.uniforms.tDiffuse.value = pool.renderTargetBlur.texture
  pool.verticalBlurMaterial.uniforms.v.value = blur / 256

  renderer.setRenderTarget(pool.renderTarget)
  renderer.render(pool.blurPlane, pool.shadowCamera)

  pool.blurPlane.visible = false
}

function update(
  ps: typeof props,
  scene: Scene,
  renderer: WebGLRenderer,
  pool: ReturnType<typeof init>,
) {
  const {
    renderTarget,
    shadowCamera,
    depthMaterial,
  } = pool
  const initialBackground = scene.background
  scene.background = null

  // NOTE: Force the depthMaterial to everything
  scene.overrideMaterial = depthMaterial

  // NOTE: Set renderer clear alpha
  const initialClearAlpha = renderer.getClearAlpha()
  renderer.setClearAlpha(0)

  // NOTE: Render to the render target to get the depths
  renderer.setRenderTarget(renderTarget)
  renderer.render(scene, shadowCamera)

  // NOTE: Reset the override material
  scene.overrideMaterial = null

  blurShadow(ps.blur, renderer, pool)

  // NOTE: A second pass to reduce the artifacts
  // (0.4 is the minimum blur amount so that the artifacts are gone)
  if (ps.smooth) {
    blurShadow(ps.blur * 0.4, renderer, pool)
  }

  // NOTE: Reset and render the normal scene
  renderer.setRenderTarget(null)
  renderer.setClearAlpha(initialClearAlpha)
  scene.background = initialBackground
}

function init(p: typeof props) {
  const shadowGroup = new Group()

  // NOTE: The render target that will show the shadows in the plane texture
  const renderTarget = new WebGLRenderTarget(p.resolution, p.resolution)
  renderTarget.texture.generateMipmaps = false

  // NOTE: The render target that we will use to blur the first render target
  const renderTargetBlur = new WebGLRenderTarget(p.resolution, p.resolution)
  renderTargetBlur.texture.generateMipmaps = false

  // NOTE: Make a plane and make it face up
  const planeGeometry = new PlaneGeometry(p.width, p.height).rotateX(Math.PI / 2)
  const planeMaterial = new MeshBasicMaterial({
    map: renderTarget.texture,
    opacity: p.opacity,
    transparent: true,
    depthWrite: p.depthWrite,
    color: new Color((p.color as ColorRepresentation) ?? 'black'),
  })
  const plane = new Mesh(planeGeometry, planeMaterial)
  shadowGroup.add(plane)

  // NOTE: The y from the texture is flipped!
  plane.scale.y = -1

  // NOTE: The plane onto which to blur the texture
  const blurPlane = new Mesh(planeGeometry)
  blurPlane.visible = false
  shadowGroup.add(blurPlane)

  // NOTE: The camera to render the depth material from
  const shadowCamera = new OrthographicCamera(-p.width / 2, p.width / 2, p.height / 2, -p.height / 2, 0, 0.3)
  shadowCamera.rotation.x = Math.PI / 2 // get the camera to look up
  shadowGroup.add(shadowCamera)

  const depthMaterial = new MeshDepthMaterial()
  const horizontalBlurMaterial = new ShaderMaterial(HorizontalBlurShader)
  horizontalBlurMaterial.depthTest = false

  const verticalBlurMaterial = new ShaderMaterial(VerticalBlurShader)
  verticalBlurMaterial.depthTest = false

  return {
    renderTarget,
    renderTargetBlur,
    shadowCamera,
    depthMaterial,
    horizontalBlurMaterial,
    verticalBlurMaterial,
    shadowGroup,
    plane,
    blurPlane,
  }
};

function setSize(ps: typeof props, pool: ReturnType<typeof init>) {
  const shadowCamera = pool.shadowCamera
  shadowCamera.left = -ps.width / 2
  shadowCamera.right = ps.width / 2
  shadowCamera.top = ps.height / 2
  shadowCamera.bottom = -ps.height / 2
  shadowCamera.far = ps.far

  const w = ps.width * (Array.isArray(ps.scale) ? ps.scale[0] : (ps.scale || 1))
  const h = ps.height * (Array.isArray(ps.scale) ? ps.scale[1] : (ps.scale || 1))
  pool.shadowGroup.scale.set(w, ps.far, h)
}

function setResolution(resolution: number, pool: ReturnType<typeof init>) {
  pool.renderTarget.dispose()
  pool.renderTargetBlur.dispose()

  pool.renderTarget = new WebGLRenderTarget(resolution, resolution)
  pool.renderTarget.texture.generateMipmaps = false

  pool.renderTargetBlur = new WebGLRenderTarget(resolution, resolution)
  pool.renderTargetBlur.texture.generateMipmaps = false

  pool.plane.material.map = pool.renderTarget.texture
}

function setColors(ps: typeof props, pool: ReturnType<typeof init>) {
  pool.plane.material.color = new Color(ps.color as ColorRepresentation ?? 'black')

  pool.depthMaterial.dispose()
  pool.depthMaterial = new MeshDepthMaterial()
  pool.depthMaterial.onBeforeCompile = function (shader) {
    const tint = ps.tint ? new Color(ps.tint as ColorRepresentation) : new Color('white')
    const { r, g, b } = tint
    const fragmentShader = shader.fragmentShader.replace(
      'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
      `gl_FragColor = vec4( ${r}, ${g}, ${b}, ( 1.0 - fragCoordZ ) * opacity);`,
    )
    shader.fragmentShader = fragmentShader
  }
}

const { onBeforeRender } = useLoop()
const pool = init(props)

let count = 0
const updateOnNextRender = () => count = count >= props.frames ? props.frames - 1 : count
onBeforeRender(
  ({ renderer, scene, invalidate }) => {
    if (count < props.frames) {
      count++
      update(props, scene, renderer, pool)
      invalidate()
    }
  },
)

watch(() => [props.opacity, props.depthWrite, props.blur, props.smooth], () => {
  pool.plane.material.opacity = props.opacity ?? 1
  pool.plane.material.depthWrite = props.depthWrite ?? false
  updateOnNextRender()
}, { immediate: true })

watch(() => [props.color, props.tint], () => {
  setColors(props, pool)
  updateOnNextRender()
}, { immediate: true })

watch(() => [props.resolution], () => { setResolution(props.resolution, pool); updateOnNextRender() })
watch(() => [props.width, props.height, props.scale, props.far], () => { setSize(props, pool); updateOnNextRender() }, { immediate: true })

onUnmounted(() => {
  for (const obj of Object.values(pool)) {
    if (obj && 'dispose' in obj && typeof obj.dispose === 'function') {
      obj.dispose()
    }
  }
})

defineExpose({ instance: pool.shadowGroup })
</script>

<template>
  <primitive :object="pool.shadowGroup" />
</template>
