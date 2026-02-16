<script setup lang="ts">
import { Html, useBVH, useGLTF } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'
import { Mesh } from 'three'

const { state: model } = useGLTF('/models/cyber_samurai/cyber_samurai.glb', {
  draco: true,
})

const uuid = 'bvh-demo'

const { enabled, debug, wireframe } = useControls({
  enabled: true,
  debug: false,
  wireframe: false,
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

watch(wireframe, (newVal) => {
  if (newVal) {
    // Ensure the THREE namespace and types are available
    // Also traverse the scene, not the raw GLTF
    model.value?.scene?.traverse((child: any) => {
      if ((child as Mesh).isMesh && child.material) {
        // Some meshes may have an array of materials
        if (Array.isArray(child.material)) {
          child.material.forEach((m: any) => {
            m.wireframe = true
          })
        } else {
          child.material.wireframe = true
        }
      }
    })
  }
})
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
        >Cyber Samurai</span>
      </div>
    </Html>
  </primitive>
</template>
