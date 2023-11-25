<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { CameraControls, useTweakPane, useGLTFExporter } from '@tresjs/cientos'
import { MeshStandardMaterial, TorusGeometry } from 'three'
import { shallowRef } from 'vue'

const donutMaterial = new MeshStandardMaterial({})
const donutGeometry = new TorusGeometry(1, 0.5, 16, 32)
const boxRef = shallowRef()

const { pane } = useTweakPane()

const btn1 = pane.addButton({
  title: 'Scene',
  label: 'Download',
})

btn1.on('click', () => useGLTFExporter(boxRef.value.parent))

const btn2 = pane.addButton({
  title: 'Cube',
  label: 'Download', // optional
})

btn2.on('click', () => useGLTFExporter(boxRef.value, { fileName: 'cube', binary: true }))

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.x = elapsed
    boxRef.value.rotation.y = elapsed
  }
})
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <TresMesh
      v-for="i in 20"
      :key="i"
      :geometry="donutGeometry"
      :material="donutMaterial"
      :position="[0.5 + (i * (Math.random() - 0.5) * 5),
                  0.5 + (i * (Math.random() - 0.5) * 5),
                  0.5 + (i * (Math.random() - 0.5) * 5)]"
      :scale="(i * 0.5) + 1"
    />
    <TresMesh
      ref="boxRef"
      :position-z="30"
      :scale="10"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardMaterial :color="0x00ff00" />
    </TresMesh>
    <CameraControls :distance="75" />
    <TresDirectionalLight :position="[0, 10, 10]" />
  </TresCanvas>
</template>
