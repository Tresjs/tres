<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import SlotSimple from './SlotSimple.vue'

const totalItems = ref(1)

const addItem = () => {
  totalItems.value++
}

const removeItem = () => {
  if (totalItems.value > 0) {
    totalItems.value--
  }
}

const visible = ref(true)
</script>

<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />

    <template v-if="visible">
      <TresGroup>
        <TresMesh
          v-for="(i, index) in totalItems"
          :key="i"
          :position="[i + index * 0.5 - totalItems / 1.5, 1, 0]"
        >
          <TresSphereGeometry :args="[0.5]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresGroup>
    </template>

    <!-- <template v-if="visible">
      <TresMesh
        v-for="(i, index) in totalItems"
        :key="i"
        :position="[i + index * 0.5 - totalItems / 1.5, 1, 0]"
      >
        <TresSphereGeometry :args="[0.5]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </template> -->

    <!-- <template v-if="visible">
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
      <SlotSimple v-if="totalItems > 0">
        <TresMesh
          v-for="(i, index) in totalItems"
          :key="i"
          :position="[i + index * 0.5 - totalItems / 1.5, 1, 3]"
        >
          <TresBoxGeometry :args="[1, 1, 1]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </SlotSimple>
    </template> -->

    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>

  <div style="position: absolute; inset: 0; color: white">
    <button @click="addItem">Add Item</button>
    <button @click="removeItem">Remove Item</button>
    <p>Items total: {{ totalItems }}</p>
    <input v-model="visible" type="checkbox" /> visible
  </div>
</template>
