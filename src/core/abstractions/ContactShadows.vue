<script setup lang="ts">
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
import { computed, shallowRef } from 'vue'
import { useCientos } from '../useCientos'
import { HorizontalBlurShader, VerticalBlurShader } from 'three-stdlib'
import { watchEffect } from 'vue'
import { useTweakPane } from '../misc'

export interface ContactShadowsProps {
  opacity?: number
  width?: number
  height?: number
  blur?: number
  far?: number
  smooth?: boolean
  resolution?: number
  frames?: number
  scale?: number | [x: number, y: number]
  color?: TresColor
  depthWrite?: boolean
}

const props = withDefaults(defineProps<ContactShadowsProps>(), {
  scale: 10,
  frames: Infinity,
  opacity: 1,
  width: 1,
  height: 1,
  blur: 1,
  far: 0.3,
  resolution: 512,
  smooth: true,
  color: '#000000',
  depthWrite: false,
})

const groupRef = shallowRef()
const shadowCamera = shallowRef<OrthographicCamera>()

defineExpose({
  value: groupRef,
})

const { state } = useCientos()

const cameraW = computed(() => props.width * (Array.isArray(props.scale) ? props.scale[0] : props.scale || 1))
const cameraH = computed(() => props.height * (Array.isArray(props.scale) ? props.scale[1] : props.scale || 1))

// the render target that will show the shadows in the plane texture and
// the target that we will use to blur the first render target
let renderTarget = new WebGLRenderTarget(props.resolution, props.resolution)
let renderTargetBlur = new WebGLRenderTarget(props.resolution, props.resolution)
renderTargetBlur.texture.generateMipmaps = renderTarget.texture.generateMipmaps = false

// make a plane and make it face up
const planeGeometry = new PlaneGeometry(props.width, props.height).rotateX(Math.PI / 2)
const blurPlane = new Mesh(planeGeometry)
blurPlane.visible = false
const depthMaterial = new MeshDepthMaterial()
depthMaterial.depthTest = depthMaterial.depthWrite = false

// Overwrite depthMaterial sahders
console.log({ color: new Color(props.color as ColorRepresentation) })
depthMaterial.onBeforeCompile = shader => {
  shader.uniforms = {
    ...shader.uniforms,
    ucolor: { value: new Color(props.color as ColorRepresentation) },
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
/* depthMaterial.userData.darkness = { value: 1 }
depthMaterial.onBeforeCompile = function (shader) {
  shader.uniforms.darkness = depthMaterial.userData.darkness
  shader.fragmentShader = /* glsl `
    uniform float darkness;
    ${shader.fragmentShader.replace(
      'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
      'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );',
    )}
  `
} */

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

    /*     console.log({ renderer: state.renderer, scene: state.scene, map: renderTarget.texture })
     */
    console.log(renderTarget)
    state.renderer.setRenderTarget(renderTarget)
    state.renderer.render(state.scene, shadowCamera.value)
    console.log('renderer before', state.renderer.getRenderTarget())

    // Blur the shadows
    blurShadows(props.blur)

    if (props.smooth) {
      blurShadows(props.blur * 0.4)
    }

    // Restore the initial background and override material
    state.renderer.setRenderTarget(null)

    console.log('renderer after', state.renderer.getRenderTarget())

    groupRef.value.visible = true
    state.scene.background = initialBackground
    state.scene.overrideMaterial = initialOverrideMaterial
  }
})

const { pane } = useTweakPane()
</script>
<template>
  <TresGroup ref="groupRef" v-bind="$attrs">
    <TresMesh :render-order="1" :geometry="planeGeometry" :scale="[1, -1, 1]">
      <TresMeshBasicMaterial transparent :map="renderTarget.texture" :opacity="opacity" :depth-write="depthWrite" />
    </TresMesh>
    <primitive :object="blurPlane" />

    <TresCameraHelper v-if="shadowCamera" :args="[shadowCamera]" />
    <TresOrthographicCamera
      ref="shadowCamera"
      :rotation-x="Math.PI / 2"
      :args="[-cameraW / 2, cameraW / 2, cameraH / 2, -cameraH / 2, 0, far]"
    />
  </TresGroup>
</template>
