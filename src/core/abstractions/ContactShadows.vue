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
  far: 10,
  resolution: 512,
  smooth: true,
  color: '#000000',
  depthWrite: false,
})

const groupRef = shallowRef()
const shadowRef = shallowRef<OrthographicCamera>()

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
const depthMaterial = new MeshDepthMaterial()
depthMaterial.depthTest = depthMaterial.depthWrite = false

// Overwrite depthMaterial sahders

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

// Initialize the blur shaders
const horizontalBlurMaterial = new ShaderMaterial(HorizontalBlurShader)
const verticalBlurMaterial = new ShaderMaterial(VerticalBlurShader)
verticalBlurMaterial.depthTest = horizontalBlurMaterial.depthTest = false

// Blur the shadow

function blurShadows(blur: number) {
  if (!state.renderer || !shadowRef.value) return

  blurPlane.visible = true
  blurPlane.material = horizontalBlurMaterial
  horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture
  horizontalBlurMaterial.uniforms.h.value = blur / props.resolution

  state.renderer.setRenderTarget(renderTargetBlur)
  state.renderer.render(blurPlane, shadowRef.value)

  blurPlane.material = verticalBlurMaterial
  verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture
  verticalBlurMaterial.uniforms.v.value = blur / props.resolution

  state.renderer.setRenderTarget(renderTarget)
  state.renderer.render(blurPlane, shadowRef.value)

  blurPlane.visible = false
}

const { onLoop } = useRenderLoop()

let count = 0
let initialBackground: Color | Texture | null
let initialOverrideMaterial: Material | null

onLoop(() => {
  if (!shadowRef.value || state.scene === undefined || state.renderer === undefined) return

  if (frames === Infinity || count < props.frames) {
    count++

    // Save the initial background and override material
    initialBackground = state.scene.background
    initialOverrideMaterial = state.scene.overrideMaterial

    // Render the shadows
    groupRef.value.visible = false
    state.scene.background = null
    state.scene.overrideMaterial = depthMaterial
    state.renderer.setRenderTarget(renderTarget)
    state.renderer.render(state.scene, shadowRef.value)

    // Blur the shadows
    blurShadows(props.blur)
    if (props.smooth) {
      blurShadows(props.blur * 0.6)
    }

    // Restore the initial background and override material
    state.scene.background = initialBackground
    state.scene.overrideMaterial = initialOverrideMaterial
    groupRef.value.visible = true
  }
})
</script>
<template>
  <TresGroup ref="groupRef" :rotation-x="Math.PI / 2">
    <TresMesh :geometry="planeGeometry" :scale="[1, -1, 1]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresMeshBasicMaterial transparent :map="renderTarget.texture" :opacity="opacity" :depth-write="depthWrite" />
    </TresMesh>
    <TresOrthographicCamera ref="shadowRef" :args="[-cameraW / 2, cameraW / 2, cameraH / 2, -cameraH / 2, 0, far]" />
  </TresGroup>
</template>
