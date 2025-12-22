<script setup lang="ts">
const { hasFinishLoading, progress } = await useProgress()
</script>

<template>
  <Transition name="fade-overlay" enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200">
    <div v-show="!hasFinishLoading"
      class="absolute bg-grey-600 t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono">
      <div class="w-200px text-white">
        Loading... {{ progress }} %
        <i class="i-game-icons-snitch-quidditch-ball animate-tada text-yellow" />
      </div>
    </div>
  </Transition>
  <TresCanvas :clear-color="'#242424'" shadows>
    <TresPerspectiveCamera :position="[11, 15, 11]" :look-at="[0, 4, 0]" />
    <Suspense>
      <PotionsClassroomExperience />
    </Suspense>
    <TresFog :color="'#242424'" :near="1" :far="100" />
    <TresAmbientLight :intensity="2" />
    <TheScreenshot />
  </TresCanvas>
</template>
