<script setup lang="ts">
const environmentFiles = ['/px.jpg', '/nx.jpg', '/py.jpg', '/ny.jpg', '/pz.jpg', '/nz.jpg']
const { hasFinishLoading, progress } = await useProgress()

</script>

<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="!hasFinishLoading"
      class="absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-white font-mono"
    >
      <div class="w-200px">
        Loading... {{ progress }} %
        <i class="i-ic-twotone-catching-pokemon animate-rotate-in" />
      </div>
    </div>
  </Transition>
  <TresCanvas preset="realistic">
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <Environment
        background
        :files="environmentFiles"
        path="https://raw.githubusercontent.com/Tresjs/assets/main/textures/environmentMap"
      />
    </Suspense>
    <Suspense>
      <Pokeball />
    </Suspense>

    <TresDirectionalLight
      :position="[5, 5, 5]"
      :intensity="1"
    />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
