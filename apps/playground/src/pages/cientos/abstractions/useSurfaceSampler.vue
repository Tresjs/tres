<script setup lang="ts">
import { OrbitControls, useSurfaceSampler } from '@tresjs/cientos'
import type { SurfaceSamplerOptions } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const torusRef = ref()
const instancesRef = ref()

const samplerOptions = shallowReactive<SurfaceSamplerOptions>({ count: 50, weight: 'color' })

watchEffect(() => {
  samplerOptions.mesh = torusRef.value
  samplerOptions.instanceMesh = instancesRef.value
})

useSurfaceSampler(samplerOptions)
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresMesh
      ref="torusRef"
    >
      <TresTorusGeometry />
    </TresMesh>

    <TresInstancedMesh
      ref="instancesRef"
      :args="[null!, null!, 1_000]"
    >
      <TresSphereGeometry
        :args="[0.1, 32, 32]"
      />
      <TresMeshNormalMaterial />
    </TresInstancedMesh>

    <TresGridHelper
      :args="[10, 10]"
    />
  </TresCanvas>
</template>
