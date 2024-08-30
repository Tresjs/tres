<script setup lang="ts">
const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']

</script>
<template>
  <TresPerspectiveCamera
    :position="[-5.3, 8.3, 10.6]"
    :look-at="[0, 0, 0]"
  />
  <Suspense>
    <Environment
      background
      :files="environmentFiles"
      path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap"
    />
  </Suspense>
  <TresMesh :position="[0, 2, 0]">
    <TresBoxGeometry />
    <TresMeshNormalMaterial />
  </TresMesh>
  <TresGridHelper />
  <OrbitControls />
</template>