<script setup lang="ts">

</script>

<template>
  <div class="repulsion-effect__content">
    <h2>PERRIN</h2>
    <h3>chocolaterie</h3>
  </div>

  <NuxtLink class="repulsion-effect__logo" to="/">
    <img src="/logos/tres_logo_white.svg" alt="TresJS Logo">
  </NuxtLink>

  <div class="repulsion-effect__infos">
    <NuxtLink to="/">
      See more experiments and examples
    </NuxtLink>
    <p>
      Repulsion Effect inspired by the
      <a target="_blank" href="https://tympanus.net/codrops/2018/12/06/interactive-repulsion-effect-with-three-js/">
        Codrops tutorial Interactive Repulsion Effect
      </a>
    </p>
  </div>

  <div class="repulsion-effect__bg" />

  <TresCanvas window-size alpha shadows powerPreference="high-performance" :clear-alpha="0">
    <TresPerspectiveCamera :position="[0, 65, 0]" :rotation-x="-1.57" :fov="20" />
    <!-- <OrbitControls /> -->

    <TresAmbientLight color="#ffffff" />

    <TresPointLight color="#fff000" :intensity="5" :decay="0" :position="[0, 5, -20]" />
    <TresPointLight color="#79573e" :intensity="5" :decay="0" :position="[35, 5, 0]" />
    <TresPointLight color="#c27439" :intensity="5" :decay="0" :position="[-35, 5, 0]" />
    <TresPointLight color="#fff000" :intensity="5" :decay="0" :position="[0, 5, 20]" />

    <TresSpotLight color="#7bccd7" :decay="0" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048"
      :position="[0, 25, 0]" />

    <TresRectAreaLight color="#341212" :decay="0" :width="1000" :height="1000" :position="[5, 20, 50]"
      :look-at="[0, 0, 0]" />
    <RepulsionEffectScene />
    <TheScreenshot />
  </TresCanvas>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');

.repulsion-effect__bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-color: #d8bcac;
  pointer-events: none;
}

.repulsion-effect__logo {
  align-self: flex-start;
  position: absolute;
  top: 40px;
  left: 60px;
  width: 6.5%;
  z-index: 3;
}

.repulsion-effect__infos {
  margin-top: auto;
  position: absolute;
  bottom: 40px;
  left: 60px;
  z-index: 3;
}

.repulsion-effect__infos p {
  font-family: 'Montserrat', sans-serif;
  color: #FFF;
}

.repulsion-effect__infos a {
  pointer-events: auto;
  color: #ad836d;
  transition: color 0.25s;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.repulsion-effect__infos a:hover {
  color: #79573e;
}

.repulsion-effect__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

h3 {
  color: #c13535;
  font-size: 7vw;
  font-family: 'Sacramento', cursive;
  font-weight: 400;
  margin: 0;
  line-height: 1;
}

h2 {
  font-size: 13vw;
  color: #48271b;
  text-transform: uppercase;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  line-height: 1;
}

canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>