<!-- Github Luckystriike: https://github.com/luckystriike22/TresJsPlayground/ -->
<template>
  <button
    class="gitBtn bg-gray-600 hover:bg-gray-700 opacity-40 transition-color shadow-lg hover:shadow-xl infline-flex w-12 h-12 justify-center items-center rounded-full absolute bottom-2 right-2">
    <a href="https://github.com/Tresjs/lab/tree/main/components/content/dancing-blob" target="_blank">Code</a>
  </button>
  <TresCanvas :clear-color="'#0c1a30'">
    <TresPerspectiveCamera :position="[13, 0, 0]" />
    <OrbitControls />
    <MusicBlob />
    <TresDirectionalLight :position="[1, 1, 1]" />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<script lang="ts" setup></script>
<style scoped>
.gitBtn {
  margin-bottom: 10px;
  margin-right: 10px;
  z-index: 10;
  color: white;
}
</style>