<script setup lang="ts">
import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  RandomizedLights,
} from '@tresjs/cientos'
import gsap from 'gsap'
import { nextTick, onUnmounted, ref } from 'vue'

const cameraRef = ref()
const controlsRef = ref()

let zoomTween: gsap.core.Tween | null = null

async function onModelReady() {
  // ready can emit during child setup (cached GLTF), refs populate on mount
  await nextTick()
  const camera = cameraRef.value
  const controls = controlsRef.value?.instance
  if (!camera) { return }

  if (controls) { controls.enabled = false }
  zoomTween = gsap.to(camera.position, {
    x: 11,
    y: 0,
    z: 11,
    duration: 2.5,
    ease: 'power2.out',
    onComplete: () => {
      if (controls) { controls.enabled = true }
    },
  })
}

onUnmounted(() => zoomTween?.kill())

const gl = {
  clearColor: '#839681',
  shadows: true,
  alpha: false,
  powerPreference: 'high-performance',
}

useControls('fpsgraph', {
  uuid: 'gelatinous-cube-experiment',
})
</script>

<template>
  <ClientOnly>
    <TresLeches uuid="gelatinous-cube-experiment" />
  </ClientOnly>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera ref="cameraRef" :position="[15, 0, 15]" :fov="25" />
    <OrbitControls ref="controlsRef" :min-polar-angle="0" :max-polar-angle="Math.PI / 2" auto-rotate
      :auto-rotate-speed="0.05" />

    <TresAmbientLight :intensity="Math.PI" />

    <TresGroup :position="[0, -2.5, 0]">
      <Suspense>
        <GelatinousCubeModelLowPoly @ready="onModelReady" />
      </Suspense>

      <AccumulativeShadows :position="[0, 1, 0]" :frames="100" :alpha-test="0.9" color="#3ead5d" :color-blend="1"
        :opacity="0.8" :scale="20">
        <RandomizedLights :radius="10" :ambient="0.5" :intensity="Math.PI" :position="[2.5, 8, -2.5]" :bias="0.001" />
      </AccumulativeShadows>
    </TresGroup>

    <Suspense>
      <Environment preset="sunset" background :blur="1" />
    </Suspense>

    <TheScreenshot />
  </TresCanvas>
</template>
