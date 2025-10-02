<script setup lang="ts">
import { NoToneMapping } from 'three'
import { Mask, OrbitControls, useMask } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const c = useControls({
  id: { value: 1, min: 1, max: 2, step: 1 },
  invert: false,
  colorWrite: false,
  depthWrite: false,
  enabled: true,
})

// NOTE: Leches doesn't return a ref, which is what we
// want to test here. Create duplicate refs.
const id = shallowRef(1)
const invert = shallowRef(false)
const m = useMask(id, invert)

watch(c.id.value, () => id.value = c.id.value.value)
watch(c.invert.value, () => invert.value = c.invert.value.value)
</script>

<template>
  <TresLeches />
  <TresCanvas :tone-mapping="NoToneMapping" :stencil="true" clear-color="white">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />

    <TresGroup :position-y="1">
      <TresMesh>
        <TresRingGeometry :args="[0.9, 1, 64]" />
        <TresMeshPhongMaterial color="black" />
      </TresMesh>
      <Mask v-if="c.enabled.value.value" :id="2" :depth-write="c.depthWrite.value.value" :color-write="c.colorWrite.value.value">
        <TresCircleGeometry />
        <TresMeshBasicMaterial color="red" />
      </Mask>
    </TresGroup>

    <TresGroup :position-y="-1">
      <TresMesh>
        <TresRingGeometry :args="[0.9, 1, 64]" />
        <TresMeshPhongMaterial color="black" />
      </TresMesh>
      <Mask v-if="c.enabled.value.value" :id="1" :depth-write="c.depthWrite.value.value" :color-write="c.colorWrite.value.value">
        <TresCircleGeometry />
        <TresMeshBasicMaterial color="blue" />
      </Mask>
    </TresGroup>

    <TresMesh :scale="1.5">
      <TresBoxGeometry />
      <TresMeshNormalMaterial v-bind="m" />
    </TresMesh>

    <TresMesh :position="[0, 0, -3]">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
