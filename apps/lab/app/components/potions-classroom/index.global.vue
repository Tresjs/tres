<template>
  <TheLoadingScreen background="#242424">
    <template #default="{ progress }">
      <div class="flex items-center gap-2 font-mono">
        Loading... {{ progress }} %
        <UIcon name="i-game-icons-snitch-quidditch-ball" class="text-yellow-300 animate-bounce" />
      </div>
    </template>
  </TheLoadingScreen>
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
