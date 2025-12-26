<script setup lang="ts">
import type { TresObject } from '@tresjs/core'
import { useLoop } from '@tresjs/core'
import { shallowRef, watch } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const { onBeforeRender } = useLoop()

const boxRef = shallowRef<TresObject | null>(null)

onBeforeRender(({ elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y = elapsed
    boxRef.value.rotation.z = elapsed
  }
})

const uuid = 'leches-basic-parent-child'

const { wireframe, number, booleanDropdown } = useControls({
  wireframe: false,
  number: 1,
  booleanDropdown: {
    value: true,
    options: [{
      text: 'Option 1',
      value: true,
    }, {
      text: 'Option 2',
      value: false,
    }, {
      text: 'Option 3',
      value: true,
    }],
  },
}, { uuid })

watch(booleanDropdown, (value) => {
  // eslint-disable-next-line no-console
  console.log('booleanDropdown', value)
})

watch(number, (value) => {
  // eslint-disable-next-line no-console
  console.log('number', value)
})
</script>

<template>
  <TresPerspectiveCamera :position="[5, 5, 5]" />
  <OrbitControls />
  <TresAmbientLight
    :intensity="0.5"
    color="red"
  />
  <TresMesh
    ref="boxRef"
    :position="[0, 2, 0]"
  >
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshNormalMaterial :wireframe="wireframe" />
  </TresMesh>
  <TresDirectionalLight
    :position="[0, 2, 4]"
    :intensity="1"
    cast-shadow
  />
  <TresAxesHelper />
  <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
</template>
