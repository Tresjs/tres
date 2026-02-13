<script setup lang="ts">
import { useGLTF, useBVH, Html } from '@tresjs/cientos'
import { TresObject3D } from '@tresjs/core'
import { useControls } from '@tresjs/leches'

const { state: model } = useGLTF('/models/Artificer.glb', {
  draco: true,
})

const uuid = 'bvh-demo'

const { enabled, debug } = useControls({
  enabled: true,
  debug: false,
}, { uuid })

const { applyBVHWhenReady } = useBVH({
  enabled,
  debug,
})

const modelScene = computed(() => model.value?.scene)
applyBVHWhenReady(modelScene as Ref<TresObject3D | null | undefined>)

const isHovering = ref(false)

const handleClick = (event: PointerEvent) => {
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
