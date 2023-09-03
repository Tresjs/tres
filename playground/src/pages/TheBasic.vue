<script setup lang="ts">
import { SRGBColorSpace, BasicShadowMap, NoToneMapping } from 'three'
import { reactive, ref } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const state = reactive({
  clearColor: '#201919',
  shadows: true,
  alpha: false,

  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
})

const sphereRef = ref()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (!sphereRef.value) return
  sphereRef.value.position.y += Math.sin(elapsed) * 0.01
})

function onPointerEnter(ev) {
  if (ev) {
    ev.object.material.color.set('#DFFF45')
  }
}
</script>

<template>
  <TresCanvas v-bind="state">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresAmbientLight :intensity="0.5" />

    <TresMesh
      ref="sphereRef"
      :position="[0, 4, 0]"
      cast-shadow
      @pointer-enter="onPointerEnter"
    >
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresMeshToonMaterial color="teal" />
    </TresMesh>

    <TresDirectionalLight
      :position="[0, 8, 4]"
      :intensity="0.7"
      cast-shadow
    />
    <TresMesh
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshToonMaterial />
    </TresMesh>

    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>
