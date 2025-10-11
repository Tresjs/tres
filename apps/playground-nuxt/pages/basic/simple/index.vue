<script setup lang="ts">
const { clearColor } = useControls({
  clearColor: '#82DBC5',
}, {
  uuid: 'simple',
})
</script>

<template>
  <div class="w-full h-screen relative">
    <ClientOnly>
      <TresLeches uuid="simple" />
    </ClientOnly>
    <TresCanvas
      :clear-color="clearColor"
    >
      <TresPerspectiveCamera />
      <TresGroup>
        <TresMesh name="Im a pretty Box">
          <TresBoxGeometry />
          <TresMeshNormalMaterial />
        </TresMesh>
      </TresGroup>
      <!--  <OrbitControls /> -->
    </TresCanvas>
  </div>
</template>
