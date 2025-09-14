<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'

const toast = useToast()

const handleClick = (event: PointerEvent) => {
  toast.add({
    title: 'BoxClicked',
    description: `X: ${event.clientX}, Y: ${event.clientY}`,
  })
}

const handlePointerEnter = (event: PointerEvent) => {
  toast.add({
    title: 'Pointer entered the box!',
    description: `X: ${event.clientX}, Y: ${event.clientY}`,
  })
}

const handlePointerLeave = (event: PointerEvent) => {
  toast.add({
    title: 'Pointer left the box!',
    description: `X: ${event.clientX}, Y: ${event.clientY}`,
  })
}
</script>

<template>
  <SceneWrapper>
    <TresCanvas
      clear-color="#82DBC5"
    >
      <TresPerspectiveCamera
        :position="[2, 2, 2]"
        :look-at="[0, 0, 0]"
      />
      <TresMesh
        @click="handleClick"
        @pointerenter="handlePointerEnter"
        @pointerleave="handlePointerLeave"
      >
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresCanvas>
  </SceneWrapper>
</template>
