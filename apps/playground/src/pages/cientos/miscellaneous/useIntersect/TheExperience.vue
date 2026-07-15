<script setup lang="ts">
import { Torus, useIntersect } from '@tresjs/cientos'

const emit = defineEmits(['intersect'])

const { ref, intersect, off } = useIntersect()

watch(intersect, () => emit('intersect', intersect.value))
defineExpose({ off })
</script>

<template>
  <Torus ref="ref">
    <TresMeshNormalMaterial />
  </Torus>
</template>
