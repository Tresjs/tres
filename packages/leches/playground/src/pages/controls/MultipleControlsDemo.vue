<script setup lang="ts">
import { Vector3 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

import { TresLeches, useControls } from '@tresjs/leches'

/* import '@tresjs/leches/style.css' */
import { computed, ref, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const cameraRef = ref()
const boxRef = ref()
useControls('fpsgraph')

const label = ref('Range')

const isDark = useDark()
const toggleDark = useToggle(isDark)
const { clearColor, wireframe, position, rotation, select } = useControls({
  clearColor: '#82DBC5',
  wireframe: false,
  extremelyLongBoolean: false,
  position: new Vector3(0, 1, 2),
  rotation: {
    value: new Vector3(5, 5, 5),
  },
  select: {
    value: 'option1',
    options: ['option1', 'option2', 'option3'],
    icon: 'i-carbon-checkmark',
  },
  range: {
    label,
    value: 1,
    min: 0,
    max: 10,
    step: 0.1,
  },
  number: 1,
  text: 'Hello',
  accept: {
    label: computed(() => isDark.value ? 'Light' : 'Dark'),
    type: 'button',
    variant: 'secondary',
    onClick: () => {
      toggleDark()
    },
    icon: computed(() => isDark.value ? 'i-carbon-sun' : 'i-carbon-moon'),
    size: 'block',
  },
})

watch(wireframe, (value) => {
  label.value = value ? 'Wireframe' : 'Solid'
})

watch(select, (value) => {
  // eslint-disable-next-line no-console
  console.log('select', value)
})
</script>

<template>
  <TresLeches />
  <TresCanvas :clear-color="clearColor">
    <TresPerspectiveCamera
      ref="cameraRef"
      :position="[7, 7, 7]"
      :look-at="[1, 2, 0]"
    />
    <TresMesh
      ref="boxRef"
      :position="[position.x, position.y, position.z]"
      :rotation="[rotation.x, rotation.y, rotation.z]"
      :scale="[2, 2, 2]"
    >
      <TresBoxGeometry />
      <TresMeshNormalMaterial
        color="teal"
        :wireframe="wireframe"
      />
    </TresMesh>
    <TresGridHelper />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[3, 3, 3]"
      :intensity="1"
    />
    <OrbitControls />
  </TresCanvas>
</template>
