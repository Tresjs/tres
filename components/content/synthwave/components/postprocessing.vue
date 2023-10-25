<script lang="ts" setup>
import { WebGLRenderer, Camera, Scene } from 'three'
import { BloomEffect, ScanlineEffect, EffectComposer, RenderPass, EffectPass } from 'postprocessing'
import { useWindowSize } from '@vueuse/core'
let effectComposer: EffectComposer

function setup(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
  const onUpdateWindowSize = () => {
    const { width, height } = useWindowSize()
    renderer.setSize(width.value, height.value)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }
  onUpdateWindowSize()

  effectComposer = new EffectComposer(renderer)
  const bloomEffect = new BloomEffect({
    intensity: 0.9,
    luminanceThreshold: 0,
    radius: 4,
  })
  const scanline = new ScanlineEffect({ density: 642 })
  const renderPass = new RenderPass(scene, camera)
  const effectPass = new EffectPass(camera, bloomEffect, scanline)

  effectComposer = new EffectComposer(renderer)
  effectComposer.addPass(renderPass)
  effectComposer.addPass(effectPass)

  watch(useWindowSize, onUpdateWindowSize)
}

useRenderLoop().onLoop(() => {
  effectComposer?.render()
})

const { renderer, scene, camera } = useTresContext()

setTimeout(() => setup(renderer.value, scene.value, camera.value ?? new Camera()), 10)
</script>

<template></template>
