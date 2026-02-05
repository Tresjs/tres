<script setup lang="ts">
import {  useGLTF, useBVH, Html } from '@tresjs/cientos'

const { state: model } = useGLTF('/models/cyber_samurai/cyber_samurai.glb', {
  draco: true,
})

const { applyBVH } = useBVH({
  enabled: true,
  verbose: false, // Enable logging for debugging
});

watch(
  model,
  (newModel) => {
    console.log('newModel', newModel)
    if (newModel?.scene) {
      applyBVH(newModel.scene);
    }
  },
  { immediate: true }
);


const isHovering = ref(false)

const handleClick = (event: PointerEvent) => {
  console.log('clicked', event)
}
</script>
<template>
  <primitive v-if="model?.scene" :object="model.scene"
    @click="handleClick"
    @pointerenter="isHovering = true"
    @pointerleave="isHovering = false">
    <Html
      center
      :distance-factor="8"
      :position="[0, 2, 0]"
    >
      <div class="flex flex-col items-center gap-1">
        <span v-if="isHovering" class="text-white font-sans text-sm font-bold bg-black px-2 py-1 rounded-md">Samurai</span>
      </div>
    </Html>
  </primitive>
</template>