<script setup lang="ts">
import { Bounds, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { Vector3 } from 'three'
import { shallowRef } from 'vue'

const { sin, cos, PI } = Math
const positions = Array.from(
  { length: 8 },
  (_, i) => new Vector3(cos(i * PI / 4) * 4, sin(i * PI / 4) * 4, 0),
)

const b = shallowRef()
</script>

<template>
  <TresCanvas clear-color="#4f4f4f">
    <TresPerspectiveCamera :position="[0, 0, -15]" />
    <OrbitControls make-default />
    <Bounds ref="b" clip use-mounted :offset="0.75">
      <TresMesh
        v-for="p, i of positions"
        :key="i"
        :position="p"
        @click="(e) => b.instance.lookAt(e.object)"
      >
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </Bounds>
  </TresCanvas>
</template>
