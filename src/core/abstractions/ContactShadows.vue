<script setup lang="ts">
// The author of the original code is @mrdoob https://twitter.com/mrdoob
// https://threejs.org/examples/?q=con#webgl_shadow_contact

// As well, basically the same implementation as in pmndrs drei but with Vue Composition API
// https://github.com/pmndrs/drei/blob/master/src/core/ContactShadows.tsx#L113

import { TresColor, useRenderLoop } from '@tresjs/core'
import {
  Color,
  ColorRepresentation,
  Material,
  Mesh,
  MeshDepthMaterial,
  OrthographicCamera,
  PlaneGeometry,
  ShaderMaterial,
  Texture,
  WebGLRenderTarget,
} from 'three'
import { computed, shallowRef, watchEffect } from 'vue'
import { HorizontalBlurShader, VerticalBlurShader } from 'three-stdlib'
import { useCientos } from '../../core/useCientos'

export interface ContactShadowsProps {
  /**
   *
   * The opacity of the shadows.
   *
   * @default 1
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  opacity?: number
  /**
   * The width of the shadows.
   *
   * @default 1
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  width?: number
  /**
   * The height of the shadows.
   *
   * @default 1
   * @type {number}
   * @memberof ContactShadowsProps
   *
   */
  height?: number
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
   * The scale of the shadows.
   *
   * @default 10
   * @type {(number | [x: number, y: number])}
   * @memberof ContactShadowsProps
   *
   */
  scale?: number | [x: number, y: number]
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
   * Whether the shadows should write to the depth buffer or not.
   *
   * @default false
   * @type {boolean}
   * @memberof ContactShadowsProps
   *
   */
  depthWrite?: boolean
  /**
   * Whether the OrthographicCamera helper should be visible or not.
   *
   * @default false
   * @type {boolean}
   * @memberof ContactShadowsProps
   *
   */
  helper?: boolean
}

const props = withDefaults(defineProps<ContactShadowsProps>(), {
  scale: 10,
  frames: Infinity,
  opacity: 1,
  width: 1,
  height: 1,
  blur: 1,
  far: 10,
  resolution: 512,
  smooth: true,
  color: '#000000',
  depthWrite: false,
  helper: false,
})

const groupRef = shallowRef()
const shadowCamera = shallowRef<OrthographicCamera>()

defineExpose(groupRef)

let renderTarget: WebGLRenderTarget, renderTargetBlur: WebGLRenderTarget
let planeGeometry: PlaneGeometry, blurPlane: Mesh
let depthMaterial: MeshDepthMaterial

const { state } = useCientos()

const cameraW = computed(() => props.width * (Array.isArray(props.scale) ? props.scale[0] : props.scale || 1))
const cameraH = computed(() => props.height * (Array.isArray(props.scale) ? props.scale[1] : props.scale || 1))

watchEffect(() => {
  // the render target that will show the shadows in the plane texture and
  // the target that we will use to blur the first render target
  if (renderTarget) renderTarget.dispose()
  if (renderTargetBlur) renderTargetBlur.dispose()
  if (planeGeometry) planeGeometry.dispose()
  if (blurPlane) blurPlane.geometry.dispose()
  renderTarget = new WebGLRenderTarget(props.resolution, props.resolution)
  renderTargetBlur = new WebGLRenderTarget(props.resolution, props.resolution)
  renderTargetBlur.texture.generateMipmaps = renderTarget.texture.generateMipmaps = false

  planeGeometry = new PlaneGeometry(cameraW.value, cameraH.value).rotateX(Math.PI / 2)
  blurPlane = new Mesh(planeGeometry)
  blurPlane.visible = false
})

watchEffect(() => {
  if (props.color) {
    if (depthMaterial) depthMaterial.dispose()
    depthMaterial = new MeshDepthMaterial()
    depthMaterial.depthTest = depthMaterial.depthWrite = false

    // Overwrite depthMaterial sahders
    depthMaterial.onBeforeCompile = shader => {
      shader.uniforms = {
        ...shader.uniforms,
        ucolor: { value: props.color ? new Color(props.color as ColorRepresentation) : new Color() },
      }
      shader.fragmentShader = shader.fragmentShader.replace(
        `void main() {`, //
        `uniform vec3 ucolor;
             void main() {
            `,
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        'vec4( vec3( 1.0 - fragCoordZ ), opacity );',
        // Colorize the shadow, multiply by the falloff so that the center can remain darker
        'vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );',
      )
    }
  }
})

// make a plane and make it face up

// Initialize the blur shaders
const horizontalBlurMaterial = new ShaderMaterial(HorizontalBlurShader)
const verticalBlurMaterial = new ShaderMaterial(VerticalBlurShader)
verticalBlurMaterial.depthTest = horizontalBlurMaterial.depthTest = false

// Blur the shadow

function blurShadows(blur: number) {
  if (!state.renderer || !shadowCamera.value) return

  blurPlane.visible = true
  blurPlane.material = horizontalBlurMaterial
  horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture
  horizontalBlurMaterial.uniforms.h.value = blur / 256

  state.renderer.setRenderTarget(renderTargetBlur)
  state.renderer.render(blurPlane, shadowCamera.value)

  blurPlane.material = verticalBlurMaterial
  verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture
  verticalBlurMaterial.uniforms.v.value = blur / 256

  state.renderer.setRenderTarget(renderTarget)
  state.renderer.render(blurPlane, shadowCamera.value)

  blurPlane.visible = false
}

const { onLoop } = useRenderLoop()

let count = 0
let initialBackground: Color | Texture | null
let initialOverrideMaterial: Material | null

onLoop(() => {
  if (!shadowCamera.value || state.scene === undefined || state.renderer === undefined) return

  if (props.frames === Infinity || count < props.frames) {
    count++

    // Save the initial background and override material
    initialBackground = state.scene.background
    initialOverrideMaterial = state.scene.overrideMaterial

    // Render the shadows
    groupRef.value.visible = false
    state.scene.background = null
    state.scene.overrideMaterial = depthMaterial

    state.renderer.setRenderTarget(renderTarget)
    state.renderer.render(state.scene, shadowCamera.value)

    // Blur the shadows
    blurShadows(props.blur)

    if (props.smooth) {
      blurShadows(props.blur * 0.4)
    }

    // Restore the initial background and override material
    state.renderer.setRenderTarget(null)

    groupRef.value.visible = true
    state.scene.background = initialBackground
    state.scene.overrideMaterial = initialOverrideMaterial
  }
})
</script>
<template>
  <TresGroup ref="groupRef" v-bind="$attrs">
    <TresMesh :scale="[1, -1, 1]" :geometry="planeGeometry">
      <TresMeshBasicMaterial
        :map="renderTarget.texture"
        :opacity="opacity"
        :depth-write="depthWrite"
        :transparent="true"
      />
    </TresMesh>
    <primitive :object="blurPlane" />

    <TresCameraHelper v-if="shadowCamera && helper" :args="[shadowCamera]" />
    <TresOrthographicCamera
      ref="shadowCamera"
      :rotation-x="Math.PI / 2"
      :args="[-cameraW / 2, cameraW / 2, cameraH / 2, -cameraH / 2, 0, far]"
    />
  </TresGroup>
</template>
