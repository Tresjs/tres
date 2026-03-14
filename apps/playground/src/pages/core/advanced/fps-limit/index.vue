<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import type { Mesh } from 'three'

// fps graph is intentionally not used as it uses it's own raf fn
const fpsLimit = ref<number | undefined>(undefined)
const boxRef = ref<Mesh | null>(null)

const onLoop = ({ delta }: { delta: number }) => {
  if (!boxRef.value) { return }

  boxRef.value.rotation.x += delta * 0.8
  boxRef.value.rotation.y += delta * 1.2
}

const onUnlimitedFpsChange = ({ target }: Event) => {
  const { checked } = target as HTMLInputElement
  fpsLimit.value = checked ? undefined : 2
}
</script>

<template>
  <div class="relative h-full w-full">
    <div class="absolute right-3 top-3 z-10 rounded bg-black/65 px-3 py-2 text-sm text-white">
      <p>FPS limit: {{ fpsLimit ?? 'Unlimited' }}</p>
      <label class="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          :checked="fpsLimit === undefined"
          @change="onUnlimitedFpsChange"
        />
        Unlimited FPS
      </label>
      <input v-show="fpsLimit !== undefined" v-model.number="fpsLimit" type="range" min="1" max="120" step="1" />
    </div>

    <TresCanvas
      clear-color="#82DBC5"
      :fps-limit="fpsLimit"
      @loop="onLoop"
    >
      <TresPerspectiveCamera :position="[5, 5, 5]" />
      <OrbitControls />

      <TresMesh ref="boxRef">
        <TresBoxGeometry :args="[2, 2, 2]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresCanvas>
  </div>
</template>
