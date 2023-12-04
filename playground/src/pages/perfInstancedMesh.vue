<script setup lang="ts">
import { TresCanvas, useLoader, useRenderLoop } from '@tresjs/core'
import {
  BasicShadowMap,
  SRGBColorSpace,
  NoToneMapping,
  MeshNormalMaterial,
  BufferGeometryLoader,
  DynamicDrawUsage,
  Matrix4,
} from 'three'

import { OrbitControls } from '@tresjs/cientos'

import { TresLeches, Perf, useControls } from '@tresjs/leches'
import { ref, shallowRef, watch } from 'vue'

const gl = {
  clearColor: '#fff',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')

const susane = await useLoader(
  BufferGeometryLoader,
  'https://threejs.org/examples/models/json/suzanne_buffergeometry.json',
)
  
susane.computeVertexNormals()
susane.scale(0.5, 0.5, 0.5)
  
const instancedMesh = shallowRef()
  
watch(instancedMesh, (mesh) => {
  mesh.instanceMatrix.setUsage(DynamicDrawUsage)
})
  
const material = new MeshNormalMaterial()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (instancedMesh.value) {
    for (let i = 0; i < 80; i++) {
      const x = Math.sin(elapsed + i * 0.3) * 3.5
      const y = Math.cos(elapsed + i * 0.5) * 4
      const z = Math.cos(elapsed + i * 0.3) * 3.5

      instancedMesh.value.setMatrixAt(
        i,
        new Matrix4().makeTranslation(x, y, z),
      )
    }
    instancedMesh.value.instanceMatrix.needsUpdate = true
  }
})
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
  >
    <Perf />
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresInstancedMesh
      ref="instancedMesh"
      :args="[susane, material, 500]"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>