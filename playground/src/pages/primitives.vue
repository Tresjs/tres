<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Mesh, TorusGeometry, MeshToonMaterial, TorusKnotGeometry, PlaneGeometry } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const wireframe = ref(true)

const canvas = ref()
const meshRef = ref()

const { knot } = useControls({
  knot: true,
})

watchEffect(() => {
  if (meshRef.value) {
    console.log(meshRef.value)
  }
})

const torusMesh = new Mesh(
  new TorusGeometry(1, 0.5, 16, 100),
  new MeshToonMaterial({
    color: '#82DBC5',
  }),
)

const torusKnot = new Mesh(
  new TorusKnotGeometry(1, 0.5, 100, 16),
  new MeshToonMaterial({
    color: '#ff00ff',
  }),
)

const plane = new Mesh(
  new PlaneGeometry(10, 10, 10, 10),
  new MeshToonMaterial({
    color: '#82DBC5',
  }),
)
</script>

<template>
  <TresLeches />
  <TresCanvas
    v-bind="gl"
    ref="canvas"
    window-size
    class="awiwi"
    :style="{ background: '#008080' }"
  >
    <TresPerspectiveCamera
      :position="[7, 7, 7]"
      :look-at="[0, 4, 0]"
    />
    <OrbitControls />
    <primitive
      :position="[0, 2, 0]"
      :object="knot ? torusKnot : torusMesh"
    />
    <primitive :object="plane" />
    <TresAxesHelper :args="[1]" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
      cast-shadow
    />
  </TresCanvas>
</template>
