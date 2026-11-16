<script setup lang="ts">
import { TresCanvas, useLoop } from '@tresjs/core'
import type { Mesh } from 'three'

const target = shallowRef<Mesh>()
const follower = shallowRef<Mesh>()
const order = ref<string[]>([])
const gap = ref(0)

const logOrder = (name: string) => {
  if (order.value.length < 2) { order.value = [...order.value, name] }
}

// Mounted before Mover, so only the priority can make it run after the target moved.
const Follower = defineComponent({
  setup() {
    useLoop().onBeforeRender(() => {
      logOrder('follower (priority 100)')
      if (target.value && follower.value) { follower.value.position.copy(target.value.position) }
    }, 100)
    return () => null
  },
})

const Mover = defineComponent({
  setup() {
    useLoop().onBeforeRender(({ elapsed }) => {
      logOrder('mover (priority 0)')
      target.value?.position.set(Math.cos(elapsed * 6) * 2, Math.sin(elapsed * 6) * 2, 0)
    })
    return () => null
  },
})

const Probe = defineComponent({
  setup() {
    useLoop().onRender(() => {
      if (target.value && follower.value) { gap.value = follower.value.position.distanceTo(target.value.position) }
    })
    return () => null
  },
})
</script>

<template>
  <div class="absolute top-4 left-4 z-10 flex flex-col gap-1 p-3 bg-white/90 rounded text-sm font-mono">
    <span>Order: <span data-test="order">{{ order.join(' → ') }}</span></span>
    <span>Gap after render: <span data-test="gap">{{ gap.toFixed(3) }}</span></span>
  </div>

  <TresCanvas clear-color="#111111">
    <TresPerspectiveCamera :position="[0, 0, 7]" :look-at="[0, 0, 0]" />
    <Follower />
    <Mover />
    <Probe />
    <TresMesh ref="target">
      <TresBoxGeometry :args="[0.6, 0.6, 0.6]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresMesh ref="follower">
      <TresSphereGeometry :args="[0.6, 16, 8]" />
      <TresMeshBasicMaterial color="#ffcc00" wireframe />
    </TresMesh>
  </TresCanvas>
</template>
