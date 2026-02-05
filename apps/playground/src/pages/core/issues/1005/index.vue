<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import SlotSimple from './SlotSimple.vue'

const uuid = 'core-issues-1005'

const totalItems = ref(1)

const { visible } = useControls({
  visible: true,
  addItem: {
    type: 'button',
    label: 'Add Item',
    size: 'block',
    onClick: () => totalItems.value++,
  },
  removeItem: {
    type: 'button',
    label: 'Remove Item',
    size: 'block',
    onClick: () => { if (totalItems.value > 0) totalItems.value-- },
  },
}, { uuid })

</script>

<template>
  <TresLeches :uuid="uuid">
    <p>Total Items: {{ totalItems }}</p>
  </TresLeches>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[5, 5, 5]" :look-at="[0, 0, 0]" />

    <template v-if="visible">
      <TresMesh
        v-for="(i, index) in totalItems"
        :key="i"
        :position="[i + index * 0.5 - totalItems / 1.5, 1, 0]"
      >
        <TresSphereGeometry :args="[0.5]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </template>

    <template v-if="visible">
      <TresMesh
        v-for="(i, index) in totalItems"
        :key="i"
        :position="[i + index * 0.5 - totalItems / 1.5, 1, 0]"
      >
        <TresSphereGeometry :args="[0.5]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </template>

    <template v-if="visible">
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
    </template>

    <TresAxesHelper />
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
</template>
