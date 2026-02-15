<script setup lang="ts">
import { Html, useBVH, useGLTF } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const { state: model } = useGLTF('/models/Artificer.glb', {
  draco: true,
})

const uuid = 'bvh-demo'

const { enabled, debug } = useControls({
  enabled: true,
  debug: false,
}, { uuid })

useBVH(
  () => model.value?.scene,
  {
    enabled,
    debug,
  },
)
const isHovering = ref(false)

const handleClick = (event: PointerEvent) => {
  // eslint-disable-next-line no-console
  console.log('clicked', event)
}
</script>

<template>
  <primitive
    v-if="model?.scene"
    :object="model.scene"
    @click="handleClick"
    @pointerenter="isHovering = true"
    @pointerleave="isHovering = false"
  >
    <Html
      center
      :distance-factor="8"
      :position="[0, 2, 0]"
    >
      <div class="flex flex-col items-center gap-1">
        <span
          v-if="isHovering"
          class="text-white font-sans text-sm font-bold bg-black px-2 py-1 rounded-md"
        >Artificer</span>
      </div>
    </Html>
  </primitive>
</template>
