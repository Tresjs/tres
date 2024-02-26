<script setup lang="ts">
import { TresCanvas, useTresContext } from '@tresjs/core'
import { PCFSoftShadowMap, BasicShadowMap, PCFShadowMap, NoColorSpace, LinearSRGBColorSpace, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, Box, vAlwaysLookAt, vLightHelper } from '@tresjs/cientos';

const rectAreaLightRef = ref(null)

const gl = {
  alpha: true,
  shadows: true,
  shadowMapType: PCFSoftShadowMap,
  powerPreference: "high-performance",
}


watchEffect(() => {
  if (rectAreaLightRef.value) {
    rectAreaLightRef.value.lookAt(0, 0, 0);
  }
})

</script>

<template>
  <h1>PERRIN</h1>

  <NuxtLink class="repulsion-effect__logo" to="/">
    <img src="/lab.svg" alt="TresJS Logo" />
  </NuxtLink>

  <div class="repulsion-effect__infos">
    <NuxtLink to="/">See more experiments and examples</NuxtLink>
    <p>Repulsion Effect inspired by the
      <a target="_blank" href="https://tympanus.net/codrops/2018/12/06/interactive-repulsion-effect-with-three-js/">
        Codrops tutorial Interactive Repulsion Effect
      </a>
    </p>
  </div>

  <div class="repulsion-effect__bg" />

  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[0, 65, 0]" :rotation-x="-1.57" :fov="20" />
    <!-- <OrbitControls /> -->

    <TresAmbientLight color="#ffffff" />

    <TresPointLight color="#fff000" :intensity="5" :decay="0" :position="[0, 5, -20]" />
    <TresPointLight color="#79573e" :intensity="5" :decay="0" :position="[35, 5, 0]" />
    <TresPointLight color="#c27439" :intensity="5" :decay="0" :position="[-35, 5, 0]" />
    <TresPointLight color="#fff000" :intensity="5" :decay="0" :position="[0, 5, 20]" />

    <TresSpotLight color="#7bccd7" :decay="0" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048"
      :position="[0, 25, 0]" />

    <TresRectAreaLight ref="rectAreaLightRef" color="#341212" :decay="0" :width="1000" :height="1000"
      :position="[5, 20, 50]" />
    <Scene />
  </TresCanvas>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

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
  width: 7.5%;
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
  color: #FFF;
}

.repulsion-effect__infos a {
  pointer-events: auto;
  color: #ad836d;
  transition: color 0.25s;
}

.repulsion-effect__infos a:hover {
  color: #79573e;
}

h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13vw;
  color: #48271b;
  text-transform: uppercase;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
  z-index: 1;
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