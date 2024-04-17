<script setup lang="ts">
import { type Mesh, Color, MathUtils } from 'three'
import type { BoxSceneNode } from './types'

const props = defineProps({
  properties: { 
    type: Object as PropType<BoxSceneNode['properties']>, 
    default: () => ({ width: 10, height: 10, length: 10 }), 
  },
  first: { type: Boolean, default: false },
})

// weird bug happening if we don't explicitly emit click instead of letting it flow through
const emit = defineEmits(['click'])

const { properties } = toRefs(props)

const randomColor = new Color(MathUtils.randInt(0, 0xffffff))
const color = computed(() => props.first ? new Color('#535353') : randomColor)

const meshRef = ref<Mesh | null>()

defineExpose({ mesh: meshRef })
</script>

<template>
  <TresMesh
    ref="meshRef"
    @click="emit('click')"
  >
    <TresBoxGeometry
      :args="[properties.width, properties.height, properties.length]"
    />
    <TresMeshBasicMaterial :color="color" />
  </TresMesh>
</template>
