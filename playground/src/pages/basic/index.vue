<script setup lang="ts">
import { BasicShadowMap, MeshToonMaterial, NoToneMapping, SRGBColorSpace } from 'three'
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

const canvasRef = ref()
const sphereRef = ref()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (!sphereRef.value) { return }
  sphereRef.value.position.y += Math.sin(elapsed) * 0.01

  // Update events without needing the mouse to move
  canvasRef.value?.context?.eventManager.forceUpdate()
})

function onPointerEnter(ev) {
  if (ev) {
    ev.object.material.color.set('#DFFF45')
  }
}

function onPointerOut(ev) {
  ev.object.material.color.set('teal')
}

const sphereExists = ref(true)

const toonTealMaterial = new MeshToonMaterial({
  color: 'teal',
})
</script>

<template>
  <input
    v-model="sphereExists"
    type="checkbox"
  />
  <TresCanvas
    ref="canvasRef"
    v-bind="state"
    @render="onRender"
  >
    <TresPerspectiveCamera
      :position="[11, 11, 11]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <TresAmbientLight :intensity="0.5" />

    <TresGroup>
      <TresMesh
        ref="sphereRef"
        :visible="sphereExists"
        :user-data="{ debug: true }"
        :position="[0, 4, 0]"
        cast-shadow
        :material="toonTealMaterial"
        @pointer-enter="onPointerEnter"
        @pointer-out="onPointerOut"
      >
        <TresSphereGeometry :args="[2, 32, 32]" />
        <TresMeshStandardMaterial attach="attachedMaterial" />
      </TresMesh>
    </TresGroup>

    <TresMesh
      ref="sphereRef"
      :position="[-4, 4, 0]"
      cast-shadow
      :material="toonTealMaterial"
      @pointer-enter="onPointerEnter"
      @pointer-out="onPointerOut"
    >
      <TresSphereGeometry :args="[2, 32, 32]" />
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
      <TresMeshBasicMaterial />
    </TresMesh>
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="1"
      cast-shadow
    />
  </TresCanvas>
</template>
