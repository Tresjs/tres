<script setup lang="ts">
const { clearColor } = useControls({
  clearColor: '#000',
}, {
  uuid: 'lights',
})
</script>

<template>
  <div class="w-full h-screen relative">
    <ClientOnly>
      <TresLeches uuid="lights" />
    </ClientOnly>
    <TresCanvas
      :clear-color="clearColor"
      shadows
    >
      <TresPerspectiveCamera />
      <TresMesh
        name="Im a pretty Box"
        :position="[0, 1, 0]"
        cast-shadow
      >
        <TresBoxGeometry />
        <TresMeshToonMaterial color="teal" />
      </TresMesh>
      <TresMesh
        ref="planeRef"
        v-log:material
        :rotation="[-Math.PI / 2, 0, 0]"
        receive-shadow
      >
        <TresPlaneGeometry :args="[10, 10, 10, 10]" />
        <TresMeshToonMaterial />
      </TresMesh>
      <TresDirectionalLight
        color="white"
        :intensity="1"
        :position="[5, 5, -5]"
        cast-shadow
      />
      <OrbitControls />
    </TresCanvas>
  </div>
</template>
