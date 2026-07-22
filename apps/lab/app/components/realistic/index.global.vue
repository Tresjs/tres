<script setup lang="ts">
const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']
</script>

<template>
  <TheLoadingScreen />
  <TresCanvas preset="realistic">
    <TresPerspectiveCamera :position="[3, 3, 5]" />
    <OrbitControls />
    <Suspense>
      <Environment background :files="environmentFiles"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap" />
    </Suspense>
    <Suspense>
      <RealisticDamagedHelmet />
    </Suspense>

    <TresDirectionalLight :position="[5, 5, 5]" :intensity="1" />
    <TresAmbientLight :intensity="1" />
    <TheScreenshot />
  </TresCanvas>
</template>
