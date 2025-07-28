<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const { stopPropagation } = useControls({
  stopPropagation: false,
}, {
  uuid: 'pointer-events-propagation',
})

const toast = useToast()

function onChildClick(event: PointerEvent) {
  if (stopPropagation?.value) {
    event.stopPropagation() // Prevents parent from receiving the event
  }
  toast.add({
    title: 'Child clicked!',
    description: `X: ${event.clientX}, Y: ${event.clientY}`,
  })
}

function onParentClick(event: PointerEvent) {
  toast.add({
    title: 'Parent clicked!',
    description: `X: ${event.clientX}, Y: ${event.clientY}`,
  })
}
</script>

<template>
  <SceneWrapper>
    <TresLeches uuid="pointer-events-propagation" />
    <TresCanvas clear-color="#82DBC5">
      <TresPerspectiveCamera
        :position="[2, 2, 2]"
        :look-at="[0, 0, 0]"
      />
      <TresGroup @click="onParentClick">
        <TresMesh @click="onChildClick">
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresGroup>
    </TresCanvas>
  </SceneWrapper>
</template>
