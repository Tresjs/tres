<script setup lang="ts">
const { nodes } = await useGLTF('/models/potions-classroom/wizard-potions-classroom.glb', {
  draco: true,
})

const floatingCandle = Object.values(nodes).filter(node => node.name.includes('FloatingCandle'))
</script>

<template>
  <Levioso
    v-for="candle of floatingCandle"
    :key="candle.uuid"
  >
    <primitive :object="candle" />
  </Levioso>
  <Levioso>
    <TresPointLight
      :position="[0, 8, 0]"
      color="#FF6619"
      :intensity="2"
      :distance="10"
      :decay="2"
    />
  </Levioso>
</template>
