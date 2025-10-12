<script setup lang="ts">
import { type Object3D, Color, MathUtils } from 'three'
import type { SphereSceneNode } from './types'

const props = defineProps({
  properties: { 
    type: Object as PropType<SphereSceneNode['properties']>,
    default: () => ({ radius: 5 }), 
  },
  first: { type: Boolean, default: false },
})

// weird bug happening if we don't explicitly emit click instead of letting it flow through
const emit = defineEmits(['click'])

const { properties } = toRefs(props)

const randomColor = new Color(MathUtils.randInt(0, 0xffffff))
const color = computed(() => props.first ? new Color('#efac35') : randomColor)

const meshRef = ref<Object3D | null>()

defineExpose({ mesh: meshRef })
</script>

<template>
  <TresMesh
    ref="meshRef"
    @click="emit('click')"
  >
    <TresSphereGeometry
      :args="[properties.radius, 32, 16]"
    />
    <TresMeshBasicMaterial :color="color" />
  </TresMesh>
</template>
