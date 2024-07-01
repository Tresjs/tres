<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'

const boxRef = shallowRef()

const tests = [
  {
    getPass: () => {
      const show = boxRef.value?.show
      const parentName = boxRef.value?.instance?.parent?.name || null
      return !show || parentName === 'intended-parent'
    },
    msg: 'v-if is false or Box has intended parent',
  },
]

let intervalId: ReturnType<typeof setInterval> | null = null
let i = 0
const tOrF = shallowRef(false)
const tOrFSlow = shallowRef(false)

onMounted(() => {
  intervalId = setInterval(() => {
    i++
    tOrF.value = !!(i % 2)
    tOrFSlow.value = !!((i * 0.5) % 2 < 1)
  }, 1000)
})
onUnmounted(() => intervalId && clearInterval(intervalId))
</script>

<template>
  <TresCanvas clear-color="gray">
    <TresPerspectiveCamera />
    <TresPointLight :position="[2, 2, 0]" :intensity="10" />
    <TresMesh>
      <TresBoxGeometry v-if="tOrFSlow" />
      <TresSphereGeometry v-else />
      <TresMeshNormalMaterial v-if="tOrF" />
      <TresMeshBasicMaterial v-else color="red" />
    </TresMesh>
  </TresCanvas>
  <OverlayInfo>
    <h1>Issue #749: attach-detach</h1>
    <h2>Setup</h2>
    <p>
      In this scene, there is a Mesh.
      <ul>
        <li>It should switch between a box and a sphere.</li>
        <li>It should switch between red and "MeshNormalMaterial".</li>
      </ul>
    </p>
  </OverlayInfo>
</template>
