<template>
  <div>
    <TresCanvas window-size clear-color="#6e44ff">
      <TresPerspectiveCamera :position="[0, 0, 1.75]" />
      <Precipitation :count="1000" :size="0.1" :radius="1.5" color="black" />

      <OrbitControls />
      <ParticlePumpkinThePumpkin />

      <TresPolarGridHelper :radius="1" :radials="16" :circles="8" :position="[0, -1, 0]" />
      <Stars :size="0.75" :radius="150" />
      <TheScreenshot />
    </TresCanvas>
    <ParticlePumpkinCredits />
  </div>
</template>
