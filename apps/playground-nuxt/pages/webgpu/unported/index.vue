<script setup lang="ts">
// Run the playground with `TRES_RENDERER=webgpu` to try this page.
// `Grid` has no WebGPU version yet, so mounting it must throw a clear error.
const showGrid = ref(false)
</script>

<template>
  <WebGPUOnly>
    <div class="w-full h-screen relative">
      <UButton class="absolute top-4 left-4 z-10" @click="showGrid = true">
        Mount Grid
      </UButton>
      <TresCanvas clear-color="#82DBC5">
        <TresPerspectiveCamera :position="[3, 3, 3]" />
        <OrbitControls />
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
        <Grid v-if="showGrid" />
      </TresCanvas>
    </div>
  </WebGPUOnly>
</template>
