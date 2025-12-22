<script setup lang="ts">
const { nodes } = useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

const floatingCandle = computed(() => Object.values(nodes.value).filter(node => node.name.includes('FloatingCandle')))
</script>

<template>
  <Levioso v-for="candle of floatingCandle" :key="candle.uuid">
    <primitive v-if="candle" :object="candle" />
  </Levioso>
  <Levioso>
    <TresPointLight :position="[0, 8, 0]" color="#FF6619" :intensity="2" :distance="10" :decay="2" />
  </Levioso>
</template>
