<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { ScreenQuad } from '@tresjs/cientos'
import type { WebGLRenderer } from 'three'
import { RawShaderMaterial, RGBFormat, Vector2, WebGLRenderTarget } from 'three'
import OverlayInfo from '../../components/OverlayInfo.vue'

const vertexShader = `precision highp float;
attribute vec2 position;
void main() {
  // Look ma! no projection matrix multiplication,
  // because we pass the values directly in clip space coordinates.
  gl_Position = vec4(position, 1.0, 1.0);
}`

const fragmentShader = `precision highp float;
uniform sampler2D uScene;
uniform vec2 uResolution;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  // Do your cool postprocessing here
  gl_FragColor = vec4(step(0.5, uv.x), step(0.5, uv.y), 0.0, 1.0);
}`

const resolution = new Vector2(100, 100)

const target = new WebGLRenderTarget(resolution.x, resolution.y, {
  format: RGBFormat,
  stencilBuffer: false,
  depthBuffer: true,
})

const mat = new RawShaderMaterial({
  fragmentShader,
  vertexShader,
  uniforms: {
    uScene: { value: target.texture },
    uResolution: { value: resolution },
  },
})

let r: WebGLRenderer
function onReady({ renderer }) {
  r = renderer.instance
  renderer.instance.getDrawingBufferSize(resolution)
  target.setSize(resolution.x, resolution.y)
  mat.uniforms.uResolution.value = resolution
}

const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAABN0lEQVR4Xu3buw2EMAAFQbsNQvpvijYu4JcTzkkOlgJW9vBSz+0c11j4O+bCh/s42gzU/rBArecINFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtVIM+vaXfKf12fOM/595nVYFC5EAh5psKNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtNFAsgHMtFIPeNY3T4VOOUisAAAAASUVORK5CYII='

let intervalId: ReturnType<typeof setInterval>
onMounted(() => {
  intervalId = setInterval(() => {
    if (r) {
      // NOTE: Update material resolution to make it
      // follow screen size changes.
      r.getDrawingBufferSize(mat.uniforms.uResolution.value)
    }
  }, 1000 / 30)
})

onUnmounted(() => {
  clearInterval(intervalId)
  mat.dispose()
  target.dispose()
})
</script>

<template>
  <OverlayInfo>
    <h1>ScreenQuad</h1>
    <p>This component is intended for creating (slightly faster) custom, full-screen post-processing.</p>
    <h2>Setup</h2>
    <p>In this scene, there is a <code>ScreenQuad</code>. The <code>ScreenQuad</code> has a custom material. The material's vertex shader places it "in front of the camera".</p>
    <h2>Preview</h2>
    <img :src="imgData" />
  </OverlayInfo>
  <TresCanvas
    window-size
    clear-color="#111"
    @ready="onReady"
  >
    <ScreenQuad>
      <primitive :object="mat" />
    </ScreenQuad>
  </TresCanvas>
</template>
