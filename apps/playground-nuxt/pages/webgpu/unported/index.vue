<script setup lang="ts">
// `Sparkles` has no WebGPU version yet, so mounting it must throw a clear error.
const showSparkles = ref(false)
</script>

<template>
  <WebGPUOnly>
    <div class="w-full h-screen relative">
      <UButton class="absolute top-4 left-4 z-10" @click="showSparkles = true">
        Mount Sparkles
      </UButton>
      <TresCanvas clear-color="#82DBC5">
        <TresPerspectiveCamera :position="[3, 3, 3]" />
        <OrbitControls />
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
        <Sparkles v-if="showSparkles" />
      </TresCanvas>
    </div>
  </WebGPUOnly>
</template>
