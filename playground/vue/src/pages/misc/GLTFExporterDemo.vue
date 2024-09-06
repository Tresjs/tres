<script setup lang="ts">
import { CameraControls, useGLTFExporter } from '@tresjs/cientos'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { MeshStandardMaterial, TorusGeometry } from 'three'
import { shallowRef } from 'vue'

const donutMaterial = new MeshStandardMaterial({})
const donutGeometry = new TorusGeometry(1, 0.5, 16, 32)
const boxRef = shallowRef()

const downloadScene = () => useGLTFExporter(boxRef.value.parent)
const downloadCube = () => useGLTFExporter(boxRef.value, { fileName: 'cube', binary: true })

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.x = elapsed
    boxRef.value.rotation.y = elapsed
  }
})
</script>

<template>
  <div>
    <div class="downloads-buttons">
      <button @click="downloadScene">
        Download Scene
      </button>
      <button @click="downloadCube">
        Download Cube
      </button>
    </div>
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
        <TresMeshStandardMaterial :color="0x00FF00" />
      </TresMesh>
      <CameraControls :distance="75" />
      <TresDirectionalLight :position="[0, 10, 10]" />
    </TresCanvas>
  </div>
</template>

<style scoped>
.downloads-buttons {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
</style>
