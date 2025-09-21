<script setup lang="ts">

</script>

<template>
  <OverlayBackground />
  <div class="overlay">
    <div class="overlay-center">
      <h1>Hola</h1>
    </div>
    <div class="top-left">
      <a href="https://tresjs.org" class="logo">
        <img src="/logos/tres_logo_white.svg" alt="TresJS Logo" width="140">
      </a>
    </div>
    <div class="bottom-left">
      <div style="display:flex">
        <div style="padding-right:20px; padding-top:5px">
          <img src="/logos/tres_shapes_stack_white.svg" width="25" alt="">
        </div>
        <div>
          <a href="https://tresjs.org">TresJS is Vue.js + Three.js</a><br>
          <a href="/">See more experiments and examples</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  color: white
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.overlay a {
  pointer-events: auto;
  color: #FFF;
  transition: color 0.25s;
}

.overlay a:hover {
  color: #444;
}

.top-left {
  position: absolute;
  top: 40px;
  left: 60px;
}

.bottom-left {
  position: absolute;
  bottom: 40px;
  left: 60px;
}

.bottom-right {
  position: absolute;
  bottom: 40px;
  right: 60px;
}

.overlay-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
}

h1 {
  margin: 0;
  padding: 0;
  font-size: 15em;
  letter-spacing: -0.05em;
  text-align: center;
}

/* phone */
@media (max-width: 599px) {
  h1 {
    font-size: 6em;
  }
}

/* tablet portrait up */
@media (min-width: 600px) {
  h1 {
    font-size: 10em;
  }
}

/* tablet landscape */
@media (min-width: 900px) {
  h1 {
    font-size: 14em;
  }
}

/* tablet desktop up */
@media (min-width: 1200px) {
  h1 {
    font-size: 18em;
  }
}

/* tablet big desktop up */
@media (min-width: 1800px) {
  h1 {
    font-size: 24em;
  }
}
</style>