<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import SlotSimple from './SlotSimple.vue'

const totalItems = ref(0)

const addItem = () => {
  totalItems.value++
}

const removeItem = () => {
  if (totalItems.value > 0) {
    totalItems.value--
  }
}
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />

    <TresMesh
      v-for="(i, index) in totalItems"
      :key="i"
      :position="[i + index * 0.5 - totalItems / 1.5, 1, 0]"
    >
      <TresSphereGeometry :args="[0.5]" />
      <TresMeshNormalMaterial />
    </TresMesh>

    <SlotSimple v-if="totalItems > 0">
      <TresMesh
        v-for="(i, index) in totalItems"
        :key="i"
        :position="[i + index * 0.5 - totalItems / 1.5, 1, -1]"
      >
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </SlotSimple>

    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>

  <div style="position: absolute; inset: 0">
    <button @click="addItem">Add Item</button>
    <button @click="removeItem">Remove Item</button>
    <p style="color: white">Items total: {{ totalItems }}</p>
  </div>
</template>
